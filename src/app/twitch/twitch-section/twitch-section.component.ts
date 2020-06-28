import {Component, OnDestroy, OnInit} from '@angular/core';
import {TwitchHttpService} from '../twitch-http-service';
import {User} from '../models/user';
import {mergeMap} from 'rxjs/operators';
import {updateStreamUrls, updateVideoUrl} from '../streamUtils';
import {Video} from '../models/video';
import {oc} from 'ts-optchain';
import {setExtensions, setLastRefreshTime, setLoggedUser, setSubscriptions} from '../twitch-store/twitch.actions';
import {StoreService} from '../../store.service';
import * as moment from 'moment';
import {interval, Observable, Subject} from 'rxjs/index';
import {map, takeUntil} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-twitch-section',
  templateUrl: './twitch-section.component.html',
  styleUrls: ['./twitch-section.component.css']
})
export class TwitchSectionComponent implements OnInit, OnDestroy {

  public url = environment.TWITCH_AUTH_URL;
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
            return this.twitchService.retrieveCompleteSubscriptions();
          }),
          mergeMap(
            (subscriptions: User[]) => {
              this.data = updateStreamUrls(subscriptions).sort((userA, userB) => userA.live ? -1 : 1);
              this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
              this.storeService.dispatch(setLastRefreshTime()); // à passer en Effect
              return this.twitchService.getPanelExtensions();
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

  getVideos(streamer: User) {
    this.displayedStreamer = null;
    if (!this.displayedUser || this.displayedUser.userId !== streamer.userId) {
      this.displayedUser = streamer;
      this.twitchService.getVideos(streamer.userId).subscribe(r => this.previousVideos = updateVideoUrl(r));
    } else {
      this.displayedUser = null;
    }
  }

  isUserSelected(user: User) {
    return [oc(this.displayedUser).userId(), oc(this.displayedStreamer).userId()].includes(user.userId);
  }

  refreshSubscriptions() {
    this.twitchService.retrieveCompleteSubscriptions().subscribe((subscriptions: User[]) => {
      this.data = updateStreamUrls(subscriptions).sort((userA, userB) => userA.live ? -1 : 1);
      this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
      this.storeService.dispatch(setLastRefreshTime()); // à passer en Effect
    });
  }

  logout() {
    this.twitchService.logout().subscribe(_ => {
      this.storeService.dispatch(setLoggedUser({user: null}));
      sessionStorage.removeItem('twitch');
      window.location.reload();
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  backgroundColor(user: User) {
    return !!user.live ?
      this.isUserSelected(user) ? '#b7d8b7' : '#d6ffd7'
      : this.isUserSelected(user) ? '#cfcd97' : '#fffae0';
  }
}
