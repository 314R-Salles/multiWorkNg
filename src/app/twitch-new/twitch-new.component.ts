import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../twitch/models/user';
import * as moment from 'moment';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {TwitchHttpService} from '../twitch/twitch-http-service';
import {TwitchStoreService} from '../twitch/twitch-store/twitch-store.service';
import {map, mergeMap, takeUntil} from 'rxjs/operators';
import {interval} from 'rxjs/internal/observable/interval';
import {setLastRefreshTime, setLoggedUser, setSubscriptions} from '../twitch/twitch-store/twitch.actions';
import {updateStreamUrls} from '../twitch/streamUtils';

@Component({
  selector: 'app-twitch-new',
  templateUrl: './twitch-new.component.html',
  styleUrls: ['./twitch-new.component.css']
})
export class TwitchNewComponent implements OnInit, OnDestroy {

  public url = environment.TWITCH_AUTH_URL;
  data: User[];
  token: string;
  user: User;
  displayedStreamer: User;
  lastRefresh: moment.Moment;
  minutesToNow$: Observable<number>;

  destroy$ = new Subject<any>();

  constructor(private twitchService: TwitchHttpService,
              private storeService: TwitchStoreService) {
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
          })).subscribe((subscriptions: User[]) => {
        this.data = updateStreamUrls(subscriptions)
          .sort((userA, userB) => (userB?.live?.gameId || 0) - (userA?.live?.gameId || 0));
        this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
        this.storeService.dispatch(setLastRefreshTime());
      });
    }
  }

  displayPlayer(user: User) {
    if (user.live) {
      if (this.displayedStreamer?.userId === user.userId) {
        this.displayedStreamer = null;
      } else {
        this.displayedStreamer = user;
      }
    }
  }

  refreshSubscriptions() {
    this.twitchService.retrieveCompleteSubscriptions().subscribe((subscriptions: User[]) => {
      this.data = updateStreamUrls(subscriptions)
        .sort((userA, userB) => (userB.live?.gameId || 0) - (userA.live?.gameId || 0));
      this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
      this.storeService.dispatch(setLastRefreshTime());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  logout() {
    this.twitchService.logout().subscribe(_ => {
        sessionStorage.removeItem('twitch');
        location.reload();
      }
    );
  }

}
