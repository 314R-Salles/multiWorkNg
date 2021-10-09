import {Component, OnInit} from '@angular/core';
import {setGoogleToken} from '../store/app.actions';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {AppStoreService} from '../store/app-store.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-google-login-dialog',
  templateUrl: './google-login-dialog.component.html',
  styleUrls: ['./google-login-dialog.component.css']
})
export class GoogleLoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GoogleLoginDialogComponent>,
              private store: AppStoreService, private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem('googleToken', user.authToken);
      this.store.dispatch(setGoogleToken({googleToken: user.authToken}));
      this.dialogRef.close();
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
