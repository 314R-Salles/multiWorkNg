import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home-page/home-page.component';
import {YoutubeMenuComponent} from './youtube-menu/youtube-menu.component';
import {RerMenuComponent} from './rer-menu/rer-menu.component';
import {BandcampNewComponent} from './bandcamp-new/bandcamp-new.component';
import {BandcampNew2Component} from './bandcamp-new2/bandcamp-new2.component';
import {LoadersComponent} from './loaders/loaders.component';
import {EntryScreenComponent} from './entry-screen/entry-screen.component';
import {Menu1Component} from './menu1/menu1.component';
import {TerminalComponent} from './terminal/terminal.component';
import {DevMenuComponent} from './dev-tools/dev-menu/dev-menu.component';
import {DevToolsModule} from './dev-tools/dev-tools.module';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'twitch', loadChildren: () => import('./twitch/twitch.module').then(m => m.TwitchModule)},
  {path: 'youtube', component: YoutubeMenuComponent},
  {path: 'rer', component: RerMenuComponent},
  {path: 'bandcamp', component: BandcampNew2Component},
  {path: 'animations', component: BandcampNewComponent},
  {path: 'loaders', component: LoadersComponent},
  {path: 'entryScreen', component: EntryScreenComponent},
  {path: 'terminal', component: TerminalComponent},
  {path: 'menu1', component: Menu1Component},
  {path: 'dev', loadChildren: () => import('./dev-tools/dev-tools.module').then(m => m.DevToolsModule)},
  {path: 'processing', loadChildren: () => import('./processing/processing.module').then(m => m.ProcessingModule)},
  {path: 'webdesign', loadChildren: () => import('./web-design/web-design.module').then(m => m.WebDesignModule)},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true, relativeLinkResolution: 'legacy'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
