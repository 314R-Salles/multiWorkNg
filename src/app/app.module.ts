import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TwitchHttpService} from './twitch-http-service';
import {HttpClientModule} from '@angular/common/http';
import {TwitchSectionComponent} from './twitch-section/twitch-section.component';
import {TwitchRowComponent} from './twitch-section/twitch-row/twitch-row.component';
import {AngularMaterialModule} from './angular.material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {TwitchPlayerComponent} from './twitch-section/twitch-player/twitch-player.component';
import {PreviousVideosTableComponent} from './twitch-section/previous-videos-table/previous-videos-table.component';
import {VideoRowComponent} from './twitch-section/previous-videos-table/video-row/video-row.component';
import {StoreModule} from '@ngrx/store';
import {twitchReducer} from './twitch-section/twitch-store/twitch.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TwitchSectionComponent,
    TwitchRowComponent,
    TwitchPlayerComponent,
    PreviousVideosTableComponent,
    VideoRowComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    StoreModule.forRoot({twitchState: twitchReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    TwitchHttpService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
