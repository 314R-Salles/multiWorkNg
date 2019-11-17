import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule

  ],
  exports: [
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule
  ],
  declarations: []
})
export class AngularMaterialModule {
}
