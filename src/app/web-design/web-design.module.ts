import {NgModule} from '@angular/core';
import {BandcampComponent} from './bandcamp/bandcamp.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { YoutubeComponent } from './youtube/youtube.component';

const appRoutes: Routes = [
  {path: '', component: YoutubeComponent},
];

@NgModule({
  declarations: [BandcampComponent, YoutubeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class WebDesignModule {
}
