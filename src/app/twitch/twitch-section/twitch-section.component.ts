import {Component, OnDestroy, OnInit} from '@angular/core';
import {TwitchHttpService} from '../twitch-http-service';
import {User} from '../models/user';
import {mergeMap} from 'rxjs/operators';
import {updateStreamUrl, updateVideoUrl} from '../streamUtils';
import {Video} from '../models/video';
import {oc} from 'ts-optchain';
import {setExtensions, setLastRefreshTime, setLoggedUser, setSubscriptions} from '../twitch-store/twitch.actions';
import {StoreService} from '../../store.service';
import * as moment from 'moment';
import {interval, Observable, Subject} from 'rxjs/index';
import {map, takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-twitch-section',
  templateUrl: './twitch-section.component.html',
  styleUrls: ['./twitch-section.component.css']
})
export class TwitchSectionComponent implements OnInit, OnDestroy {

  public url = 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=048o30kiq54suyv43jio7boaknv8e2&redirect_uri=http://51.178.84.104&scope=user_subscriptions&state=c3ab8aa609ea11e793ae92361f002671';
  data: User[];
  token: string;
  user: User;
  displayedStreamer: User;
  displayedUser: User;
  previousVideos: Video[];
  lastRefresh: moment.Moment;
  minutesToNow$: Observable<number>;

  destroy$ = new Subject<any>();

  constructor(private twitchService: TwitchHttpService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.spyOnLastRefreshTime().pipe(
      takeUntil(this.destroy$)
    ).subscribe(lastRefresh => {
      this.lastRefresh = lastRefresh;

      this.minutesToNow$ = interval(1000 * 60).pipe(
        map(() => {
            const ms = moment(moment(), 'HH:mm:ss').diff(moment(this.lastRefresh, 'HH:mm:ss'));
            return +moment.utc(ms).format('m');
          }
        ));
    });

    this.token = sessionStorage.getItem('twitch');

    if (this.token) {
      this.twitchService.retrieveMyUser()
        .pipe(
          mergeMap((user: User) => {
            user.token = this.token;
            this.user = user;
            this.storeService.dispatch(setLoggedUser({user}));
            return this.twitchService.retrieveCompleteSubscriptions(this.user.userId);
          }),
          mergeMap(
            (subscriptions: User[]) => {
              this.data = updateStreamUrl(subscriptions).sort((userA, userB) => userA.live ? -1 : 1);
              this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
              this.storeService.dispatch(setLastRefreshTime()); // à passer en Effect
              return this.twitchService.getPanelExtensions(this.user.userId);
            }
          )
        )
        .subscribe(extensions => {
          this.storeService.dispatch(setExtensions({extensions}));
        });
    }
  }

  clickRow(user: User) {
    if (!!user.live) {
      this.displayPlayer(user);
    } else {
      this.getVideos(user);
    }
  }

  displayPlayer(user: User) {
    this.displayedUser = null;
    this.previousVideos = null;
    if (oc(this.displayedStreamer).userId() === user.userId) {
      this.displayedStreamer = null;
    } else {
      this.displayedStreamer = user;
    }
  }

  getVideos(user: User) {
    this.displayedStreamer = null;
    if (!this.displayedUser || this.displayedUser.userId !== user.userId) {
      this.displayedUser = user;
      this.twitchService.getVideos(user.userId).subscribe(r => this.previousVideos = updateVideoUrl(r));
    } else {
      this.displayedUser = null;
    }
  }

  isUserSelected(user: User) {
    return [oc(this.displayedUser).userId(), oc(this.displayedStreamer).userId()].includes(user.userId);
  }

  refreshSubscriptions() {
    this.twitchService.retrieveCompleteSubscriptions(this.user.userId).subscribe((subscriptions: User[]) => {
      this.data = updateStreamUrl(subscriptions).sort((userA, userB) => userA.live ? -1 : 1);
      this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
      this.storeService.dispatch(setLastRefreshTime()); // à passer en Effect
    });
  }

  logout() {
    this.storeService.dispatch(setLoggedUser({user: null}));
    sessionStorage.removeItem('twitch');
    window.location.reload();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
