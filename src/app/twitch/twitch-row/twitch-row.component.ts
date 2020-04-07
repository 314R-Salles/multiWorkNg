import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user';
import {StoreService} from '../../store.service';
import {Extension} from '../models/extension';
import {takeUntil} from 'rxjs/internal/operators';
import {Subject} from 'rxjs/index';

@Component({
  selector: 'app-twitch-row',
  templateUrl: './twitch-row.component.html',
  styleUrls: ['./twitch-row.component.css']
})
export class TwitchRowComponent implements OnInit, OnDestroy {

  @Input() user: User;
  tiles;
  noStreamTiles;
  extensions: Extension[];
  destroy$ = new Subject<any>();

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.spyOnExtensions()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((extensions: { [id: string]: Extension[] }) => this.extensions = (extensions || {})[this.user.userId]
    );

    if (this.user.live) {
      this.tiles = [
        {cols: 1, rows: 2},
        {cols: 2, rows: 1, text: this.getShortenedName(this.user.displayName, 20), fontSize: '0.9vw', fontWeight: 'bold'},
        {cols: 4, rows: 1, text: this.getShortenedName(this.user.live.gameName, 30), fontSize: '0.7vw'},
        {cols: 1, rows: 2},
        {cols: 6, rows: 1, text: this.getShortenedName(this.user.live.title, 50), fontSize: '0.55vw'},
      ];
    } else {
      this.noStreamTiles = [
        {cols: 1, rows: 1},
        {cols: 6, rows: 1, text: this.getShortenedName(this.user.displayName, 20), fontSize: '0.9vw', fontWeight: 'bold'},
        {cols: 1, rows: 1},
      ];
    }
  }

  open(extension: Extension) {
    window.open(
      'https://www.twitch.tv/popout/' + this.user.displayName + '/extensions/' + extension.id + '/panel',
      '_blank', 'width=400,height=400');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getShortenedName(name: string, length: number) {
    if (name.length > length) {
      return name.substr(0, length) + '...';
    } else {
      return name;
    }
  }

}
