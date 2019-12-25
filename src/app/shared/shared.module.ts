import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular.material.module';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {HomePageComponent} from '../home-page/home-page.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderMenuComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    HeaderMenuComponent,
    RouterModule
  ]
})
export class SharedModule {
}
