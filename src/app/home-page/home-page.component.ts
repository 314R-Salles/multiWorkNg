import {Component, OnInit} from '@angular/core';
import {getQueryVariable} from '../shared/stringUtils';
import {AppStoreService} from '../store/app-store.service';
import {savePlaylist} from '../store/app.actions';
import jwt_decode from 'jwt-decode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  playlistUrl;
  playlistId;

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(private store: AppStoreService, private formBuilder: FormBuilder,
              private socialAuthService: SocialAuthService) {

  }

  updateUrl() {
    this.playlistId = getQueryVariable(this.playlistUrl, 'list');
    this.store.dispatch(savePlaylist({youtubePlaylistId: this.playlistId}));
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }

}

