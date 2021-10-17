import {NgModule} from '@angular/core';
import {BandcampComponent} from './bandcamp/bandcamp.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {ButtonDisplayComponent} from './button-display/button-display.component';

const appRoutes: Routes = [
  {path: 'buttons', component: ButtonDisplayComponent},
  {path: 'youtube', component: YoutubeComponent},
  {path: 'bandcamp', component: BandcampComponent},
];

@NgModule({
  declarations: [BandcampComponent, YoutubeComponent, ButtonDisplayComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(appRoutes),
        YouTubePlayerModule
    ]
})
export class WebDesignModule {
}
