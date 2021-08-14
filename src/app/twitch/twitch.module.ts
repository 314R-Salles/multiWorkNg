import {NgModule} from '@angular/core';
import {TwitchHttpService} from './twitch-http-service';
import {TwitchPlayerComponent} from './twitch-player/twitch-player.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {twitchReducer} from './twitch-store/twitch.reducer';
import {TwitchStoreService} from './twitch-store/twitch-store.service';
import {TwitchNewComponent} from '../twitch-new/twitch-new.component';


const appRoutes: Routes = [
  {path: '', component: TwitchNewComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
    StoreModule.forFeature('twitch', twitchReducer),
  ],
  providers: [
    TwitchHttpService,
    TwitchStoreService,
  ],
  declarations: [
    TwitchNewComponent,
    TwitchPlayerComponent,
  ]
})
export class TwitchModule {
}
