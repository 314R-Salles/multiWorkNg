import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular.material.module';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    HeaderMenuComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    HeaderMenuComponent,
    RouterModule,
    ProgressBarComponent,
  ]
})
export class SharedModule {
}
