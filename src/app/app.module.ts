import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomePageComponent} from './home-page/home-page.component';
import {HttpInterceptorService} from './http-interceptor.service';
import {AppInitializerService} from './app-initializer.service';
import {CustomYoutubePlayerComponent} from './custom-youtube-player/custom-youtube-player.component';
import {AppStoreService} from './store/app-store.service';
import {reducers} from './store/app.reducer';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {ReactiveFormsModule} from '@angular/forms';
import {GoogleLoginDialogComponent} from './google-login-dialog/google-login-dialog.component';
import {YoutubeMenuComponent} from './youtube-menu/youtube-menu.component';
import {RerMenuComponent} from './rer-menu/rer-menu.component';
import {BandcampNewComponent} from './bandcamp-new/bandcamp-new.component';
import {BandcampNew2Component} from './bandcamp-new2/bandcamp-new2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CustomYoutubePlayerComponent,
    GoogleLoginDialogComponent,
    YoutubeMenuComponent,
    RerMenuComponent,
    BandcampNewComponent,
    BandcampNew2Component,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    YouTubePlayerModule,
  ],
  providers: [
    AppStoreService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '506210682916-um12taceoo96u9salmfrcrfdjvk276l7.apps.googleusercontent.com',
              {scope: 'https://www.googleapis.com/auth/youtube.readonly'})
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AppInitializerService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initApp(appLoadService: AppInitializerService) {
  return () => appLoadService.initApp();
}
