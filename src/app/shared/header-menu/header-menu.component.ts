import {Component, ViewEncapsulation} from '@angular/core';
import {AppStoreService} from '../../store/app-store.service';
import {Meteo} from '../../localization/geolocation-http.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMenuComponent {

  meteo: Meteo;

  constructor(private appStoreService: AppStoreService) {
    this.appStoreService.getMeteo().subscribe(meteo => this.meteo = meteo);
  }

}
