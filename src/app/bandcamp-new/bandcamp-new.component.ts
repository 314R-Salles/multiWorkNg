import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-bandcamp-new',
  templateUrl: './bandcamp-new.component.html',
  styleUrls: ['./bandcamp-new.component.css']
})
export class BandcampNewComponent implements OnInit {

  artists;
  playerUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.artists = [
      {
        profilePicture: 'assets/album_covers/n/norowareta_logo.jpg',
        name: 'norowareta night',
        display: false,
        titles: [
          {
            img: 'assets/album_covers/n/radiant.jpg',
            albumId: '2469118885', title: 'Radiant'
          },
          {
            img: 'assets/album_covers/n/millionStars.jpg',
            albumId: '3432225370', title: 'Million Stars'
          },
          {
            img: 'assets/album_covers/n/instrumental.jpg',
            albumId: '736095763', title: 'Instrumental Collection Vol 1'
          },
          {
            img: 'assets/album_covers/n/spectrum.jpg',
            albumId: '2900505169', title: 'Spectrum'
          },
          {
            img: 'assets/album_covers/n/openUpYourHeart.jpg',
            albumId: '1820371796', title: 'Open up your Heart'
          },
          {
            img: 'assets/album_covers/n/continue.jpg',
            albumId: '2968982999', title: ':Continue'
          },
          {
            img: 'assets/album_covers/n/dissonance.jpg',
            albumId: '3974317338', title: 'Dissonance'
          },
          {
            img: 'assets/album_covers/n/lightAFire.jpg',
            albumId: '638527234', title: 'Light a Fire EP'
          },
        ]
      },
      {
        profilePicture: 'assets/album_covers/t/timo.jpg',
        name: 'timo',
        display: false,
        titles: [
          {
            img: 'assets/album_covers/t/beyond_the_stars.jpg',
            albumId: '428178153', title: 'Beyond the Stars'
          },
          {
            img: 'assets/album_covers/t/eden_island.jpg',
            albumId: '1469036157', title: 'Eden Island'
          },
          {
            img: 'assets/album_covers/t/fearless_desire.jpg',
            albumId: '3357392325', title: 'Fearless Desire'
          },
          {
            img: 'assets/album_covers/t/fried_rice.jpg',
            albumId: '3593092009', title: 'Fried Rice'
          },
          {
            img: 'assets/album_covers/t/great_escape.jpg',
            albumId: '2641956915', title: 'The Great Escape'
          },
          {
            img: 'assets/album_covers/t/lueur_espoir.jpg',
            albumId: '2937050238', title: 'Une Lueur d\'Espoir'
          },
          {
            img: 'assets/album_covers/t/stereo_dream.jpg',
            albumId: '4019979997', title: 'シューダイバーの夢 ～ STEREO DREAM ～'
          },
          {
            img: 'assets/album_covers/t/touhou_collection.jpg',
            albumId: '2711017636', title: '東方 Sound Collection Vol​.​1'
          },
        ]
      }];

  }

  focusArtist(clickedArtist) {
    this.artists.forEach(artist => artist.display = false);
    this.artists.find(artist => clickedArtist.name === artist.name).display = true;
  }

  setPlayerUrl(id: string) {
    if (id) {
      this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/`
      );
    }
  }
}
