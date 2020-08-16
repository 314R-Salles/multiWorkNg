import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-bandcamp',
  templateUrl: './bandcamp.component.html',
  styleUrls: ['./bandcamp.component.css']
})
export class BandcampComponent implements OnInit {


  tiles;
  playerUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.tiles = [
      {
        img: 'assets/album_covers/radiant.jpg',
        albumId: '2469118885', title: 'Radiant'
      },
      {
        img: 'assets/album_covers/millionStars.jpg',
        albumId: '3432225370', title: 'Million Stars'
      },
      {
        img: 'assets/album_covers/instrumental.jpg',
        albumId: '736095763', title: 'Instrumental Collection Vol 1'
      },
      {
        img: 'assets/album_covers/spectrum.jpg',
        albumId: '2900505169', title: 'Spectrum'
      },
      {
        img: 'assets/album_covers/norowareta_logo.jpg',
        albumId: '', title: ''
      },
      {
        img: 'assets/album_covers/openUpYourHeart.jpg',
        albumId: '1820371796', title: 'Open up your Heart'
      },
      {
        img: 'assets/album_covers/continue.jpg',
        albumId: '2968982999', title: ':Continue'
      },
      {
        img: 'assets/album_covers/dissonance.jpg',
        albumId: '3974317338', title: 'Dissonance'
      },
      {
        img: 'assets/album_covers/lightAFire.jpg',
        albumId: '638527234', title: 'Light a Fire EP'
      },
    ];

  }

  setPlayerUrl(id: string) {
    if (id) {
      this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/`
      );
    }
  }
}
