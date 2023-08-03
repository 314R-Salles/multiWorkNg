import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular.material.module';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ButtonComponent} from './button/button.component';
import {ButtonListComponent} from './button-list/button-list.component';
import {ButtonList2Component} from './button-list2/button-list2.component';
import { ButtonFlowerComponent } from './button-flower/button-flower.component';
import {EaseInTextComponent} from '../ease-in-text/ease-in-text.component';
import { DndDirective } from './dnd.directive';


@NgModule({
  declarations: [
    HeaderMenuComponent,
    ProgressBarComponent,
    ButtonComponent,
    ButtonListComponent,
    ButtonList2Component,
    ButtonFlowerComponent,
    EaseInTextComponent,
    DndDirective,
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
    ButtonComponent,
    ButtonListComponent,
    ButtonList2Component,
    ButtonFlowerComponent,
    EaseInTextComponent,
  ]
})
export class SharedModule {
}
