import {Component, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderMenuComponent {

  SWAGGER_URL = environment.SWAGGER_URL;

  constructor() {
  }

}
