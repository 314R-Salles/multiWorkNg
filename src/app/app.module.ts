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
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import {GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CustomYoutubePlayerComponent,
    BookmarkComponent,
    BookmarkListComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
              '506210682916-um12taceoo96u9salmfrcrfdjvk276l7.apps.googleusercontent.com'
            )
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
