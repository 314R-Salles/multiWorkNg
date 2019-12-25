import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MetricsDashboardComponent} from './metrics-dashboard/metrics-dashboard.component';
import {MetricsHttpService} from './metrics-http.service';
import {BeanPackagesPipe} from './bean-packages.pipe';
import {BeanNamePipe} from './bean-name.pipe';


const appRoutes: Routes = [
  {path: '', component: MetricsDashboardComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [
    MetricsHttpService,
  ],
  declarations: [
    MetricsDashboardComponent,
    BeanNamePipe,
    BeanPackagesPipe,
  ],
  exports: [
  ]
})
export class MetricsModule {
}
