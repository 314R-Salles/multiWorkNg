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
        {text: this.user.live.username, cols: 1, rows: 1, color: 'lightblue'},
        {text: this.user.live.title, cols: 2, rows: 1, color: 'lightpink'},
        {text: '', cols: 2, rows: 2, color: ''},
        {text: 'Viewers :' + this.user.live.viewerCount, cols: 3, rows: 1, color: '#DDBDF1'},
      ];
    } else {
      this.noStreamTiles = [
        {text: this.user.displayName, cols: 1, rows: 1, color: 'lightblue'},
        {text: this.user.description, cols: 3, rows: 1, color: 'lightpink'},
        {text: 'Views :' + this.user.viewCount, cols: 1, rows: 1, color: '#DDBDF1'},
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

}
