import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GameStoreService} from './game-store/game-store.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GuardSnackbarComponent} from './guard-snackbar/guard-snackbar.component';

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private storeService: GameStoreService, private _snackBar: MatSnackBar, private router: Router) {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(GuardSnackbarComponent, {
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackbar',
      data: 'Invalid Credentials!'
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const levelId = next.routeConfig.path;

    if (+levelId === 2) {
      return this.storeService.getRedCardState().pipe(
        switchMap(redCard => {
          if (!redCard) {
            return of(this.router.parseUrl('/game/menu'));
          }
          const isValid = redCard.id === 'kitty' && redCard.password === 'azerty';
          if (!isValid) {
            this.openSnackBar();
          }
          return of(isValid);
        }),
      );
    }

    return false;
  }

}
