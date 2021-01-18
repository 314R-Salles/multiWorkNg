import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {Bandcamp1Component} from './bandcamp1/bandcamp1.component';
import {RouterModule, Routes} from '@angular/router';
import {Bandcamp2Component} from './bandcamp2/bandcamp2.component';
import {Youtube1Component} from './youtube1/youtube1.component';
import {Youtube2Component} from './youtube2/youtube2.component';


const appRoutes: Routes = [
  {path: 'bandcamp1', component: Bandcamp1Component},
  {path: 'youtube1', component: Youtube1Component},
  {path: 'youtube2', component: Youtube2Component},
  {path: '', redirectTo: 'bandcamp1'},
];

@NgModule({
  declarations: [Bandcamp1Component, Bandcamp2Component, Youtube1Component, Youtube2Component],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  exports: []
})
export class IframesModule {
}


