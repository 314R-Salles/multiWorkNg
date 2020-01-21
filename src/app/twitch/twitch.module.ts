import {NgModule} from '@angular/core';
import {TwitchHttpService} from './twitch-http-service';
import {PreviousVideosTableComponent} from './previous-videos-table/previous-videos-table.component';
import {TwitchSectionComponent} from './twitch-section/twitch-section.component';
import {TwitchRowComponent} from './twitch-row/twitch-row.component';
import {VideoRowComponent} from './previous-videos-table/video-row/video-row.component';
import {TwitchPlayerComponent} from './twitch-player/twitch-player.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


const appRoutes: Routes = [
  {path: '', component: TwitchSectionComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [
    TwitchHttpService,
  ],
  declarations: [
    TwitchSectionComponent,
    TwitchRowComponent,
    TwitchPlayerComponent,
    PreviousVideosTableComponent,
    VideoRowComponent,
  ]
})
export class TwitchModule {
}
