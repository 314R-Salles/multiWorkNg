import {Component, OnInit} from '@angular/core';
import {TwitchHttpService} from '../twitch-http-service';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/user';
import {mergeMap} from 'rxjs/operators';
import {updateStreamUrl, updateVideoUrl} from '../streamUtils';
import {Video} from '../models/video';
import {oc} from 'ts-optchain';
import {Store} from '@ngrx/store';
import {AppState} from './twitch-store/twitch.reducer';
import {setLastRefreshTime, setLoggedUser, setSubscriptions} from './twitch-store/twitch.actions';
import {StoreService} from '../store.service';
import * as moment from 'moment';

@Component({
  selector: 'app-twitch-section',
  templateUrl: './twitch-section.component.html',
  styleUrls: ['./twitch-section.component.css']
})
export class TwitchSectionComponent implements OnInit {

  public url = 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=048o30kiq54suyv43jio7boaknv8e2&redirect_uri=http://localhost:4200&scope=user_subscriptions&state=c3ab8aa609ea11e793ae92361f002671';
  data: User[];
  token: string;
  user: User;
  displayedStreamer: User;
  displayedUser: User;
  previousVideos: Video[];
  lastRefresh: moment.Moment;

  constructor(private cookieService: CookieService,
              private twitchService: TwitchHttpService,
              private store: Store<AppState>,
              private storeService: StoreService) {
  }

  ngOnInit() {

    this.storeService.spyOnLastRefreshTime().subscribe(lastRefresh => {
      this.lastRefresh = lastRefresh;
      console.log(lastRefresh);
    });

    this.token = this.cookieService.get('token');

    let string = 'access_token=';
    let hash = document.location.hash;
    if (hash && hash.indexOf(string) !== -1) {
      let index = hash.indexOf(string);
      this.token = hash.substr(index + string.length, 30);
      console.log(this.token);
      this.cookieService.set('token', this.token);
    }
    this.twitchService.login(this.token)
      .pipe(
        mergeMap(() => this.twitchService.retrieveMyUser()),
        mergeMap((user: User) => {
          this.user = user;
          this.storeService.dispatch(setLoggedUser({user}));
          return this.twitchService.retrieveCompleteSubscriptions(this.user.userId);
        }),
      )
      .subscribe((subscriptions: User[]) => {
        this.data = updateStreamUrl(subscriptions).sort((userA, userB) => userA.live ? -1 : 1);
        this.storeService.dispatch(setSubscriptions({subscriptions: this.data}));
        this.storeService.dispatch(setLastRefreshTime()); // à passer en Effect
      });

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

}
