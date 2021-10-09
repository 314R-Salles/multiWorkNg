import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() img;
  @Input() text;
  @Input() tooltip;
  @Input() size;

  @Input() redirect;
  @Input() newTab;


  constructor(private router: Router) {
  }

  click() {
    if (!this.newTab) {
      this.router.navigate([this.redirect]);
    } else {
      window.open(this.redirect);
    }
  }
}
