import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'twitch', loadChildren: () => import('./twitch/twitch.module').then(m => m.TwitchModule)},
  {path: 'processing', loadChildren: () => import('./processing/processing.module').then(m => m.ProcessingModule)},
  {path: 'webdesign', loadChildren: () => import('./web-design/web-design.module').then(m => m.WebDesignModule)},
  {path: 'game', loadChildren: () => import('./games/games.module').then(m => m.GamesModule)},
  {path: 'arduino', loadChildren: () => import('./arduino/arduino.module').then(m => m.ArduinoModule)},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
