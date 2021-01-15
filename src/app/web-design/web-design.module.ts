import {NgModule} from '@angular/core';
import {BandcampComponent} from './bandcamp/bandcamp.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';
import {TwitchComponent} from './twitch/twitch.component';
import {Youtube2Component} from './youtube2/youtube2.component';

const appRoutes: Routes = [
  {path: 'youtube', component: YoutubeComponent},
  {path: 'youtube2', component: Youtube2Component},
  {path: 'bandcamp', component: BandcampComponent},
  {path: 'twitch', component: TwitchComponent},
  {path: '', redirectTo: 'twitch'},
];

@NgModule({
  declarations: [BandcampComponent, YoutubeComponent, Youtube2Component, TwitchComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class WebDesignModule {
}
