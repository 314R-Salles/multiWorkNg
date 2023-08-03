import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevMenuComponent} from './dev-menu/dev-menu.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { LogReaderComponent } from './log-reader/log-reader.component';


const appRoutes: Routes = [
  {path: '', component: DevMenuComponent},
];


@NgModule({
  declarations: [
    DevMenuComponent,
    LogReaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(appRoutes),
  ]
})
export class DevToolsModule {
}
