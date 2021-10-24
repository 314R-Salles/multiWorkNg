import {Component, ViewEncapsulation} from '@angular/core';
import {AppStoreService} from '../../store/app-store.service';
import {Meteo} from '../../localization/geolocation-http.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMenuComponent {

  meteo: Meteo;
  playerUrl;

  constructor(private appStoreService: AppStoreService, private sanitizer: DomSanitizer) {
    this.appStoreService.getMeteo().subscribe(meteo => this.meteo = meteo);
    this.appStoreService.getBandcampAlbumId().subscribe(bandcampAlbum => {
      if (bandcampAlbum) {
        localStorage.setItem('bandcampAlbumId', bandcampAlbum);
        this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://bandcamp.com/EmbeddedPlayer/album=${bandcampAlbum}/size=small/bgcol=a9a9a9/linkcol=0687f5`
        );
      } else {
        this.playerUrl = null;
      }
    });
  }

}
