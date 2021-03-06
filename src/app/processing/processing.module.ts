import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MineSweeperComponent} from './mine-sweeper/mine-sweeper.component';
import {CombineFourComponent} from './combine-four/combine-four.component';
import {BugReportHttpService} from './bug-report-http.service';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    DashboardComponent,
    MineSweeperComponent,
    CombineFourComponent,
  ],
  providers: [BugReportHttpService]
})
export class ProcessingModule {
}
