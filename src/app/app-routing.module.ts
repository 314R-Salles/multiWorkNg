import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'twitchLoginSuccess', redirectTo: 'twitch', pathMatch: 'full'},
  {path: 'metrics', loadChildren: () => import(`./metrics/metrics.module`).then(m => m.MetricsModule)},
  {path: 'twitch', loadChildren: () => import(`./twitch/twitch.module`).then(m => m.TwitchModule)},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
