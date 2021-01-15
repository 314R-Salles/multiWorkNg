import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {Game1Component} from './game1/game1.component';
import {Game2Component} from './game2/game2.component';
import {InventoryComponent} from './inventory/inventory.component';
import {StoreModule} from '@ngrx/store';
import {gameReducer} from './game-store/game.reducer';
import {LevelGuard} from './level.guard';
import {GameStoreService} from './game-store/game-store.service';
import {GuardSnackbarComponent} from './guard-snackbar/guard-snackbar.component';
import {MenuComponent} from './menu/menu.component';
import {LevelSelectionComponent} from './menu/level-selection/level-selection.component';
import {InstructionsComponent} from './menu/instructions/instructions.component';
import {ExtraComponent} from './menu/extra/extra.component';


const appRoutes: Routes = [
  {path: '1', component: Game1Component},
  {path: '2', component: Game2Component, canActivate: [LevelGuard]},
  {path: 'menu', component: MenuComponent},
  {path: '', redirectTo: 'menu'},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
    StoreModule.forFeature('game', gameReducer)
  ],
  declarations: [
    Game1Component,
    Game2Component,
    InventoryComponent,
    GuardSnackbarComponent,
    MenuComponent,
    LevelSelectionComponent,
    InstructionsComponent,
    ExtraComponent,
  ],
  providers: [
    GameStoreService,
    LevelGuard,
  ]
})
export class GamesModule {
}
