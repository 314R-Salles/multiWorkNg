import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular.material.module';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {HomePageComponent} from '../home-page/home-page.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderMenuComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
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
