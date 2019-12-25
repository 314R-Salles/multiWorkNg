import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CookieService} from 'ngx-cookie-service';
import {StoreModule} from '@ngrx/store';
import {twitchReducer} from './twitch/twitch-store/twitch.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({twitchState: twitchReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
