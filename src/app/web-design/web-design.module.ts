import {NgModule} from '@angular/core';
import {BandcampComponent} from './bandcamp/bandcamp.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';
import {YouTubePlayerModule} from '@angular/youtube-player';

const appRoutes: Routes = [
  {path: 'youtube', component: YoutubeComponent},
  {path: 'bandcamp', component: BandcampComponent},
];

@NgModule({
  declarations: [BandcampComponent, YoutubeComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(appRoutes),
        YouTubePlayerModule
    ]
})
export class WebDesignModule {
}
