import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PocsService} from './pocs.service';


const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [PocsService]
})
export class PocsModule {
}
