import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EaseInTextComponent} from '../../ease-in-text/ease-in-text.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() img;
  @Input() text;
  @Input() tooltip;
  @Input() size;
  @Input() portrait;
  @Input() redirect;
  @Input() newTab;

  @Input() parentId;
  @Input() id;
  @Input() autoplay = false;

  matRippleColor;

  @ViewChild(EaseInTextComponent) textComponent: EaseInTextComponent;

  constructor(private router: Router) {
  }

  click() {
    if (this.redirect) {
      if (!this.newTab) {
        this.router.navigate([this.redirect]);
      } else {
        window.open(this.redirect);
      }
    }
  }

  ngOnInit(): void {

    if (this.newTab) {
      this.matRippleColor = 'rgba(116,255,255,0.1)';
    } else if (this.redirect) {
      this.matRippleColor = 'rgba(239,113,127,0.1)';
    } else {
      this.matRippleColor = 'rgba(182,182,182,0.1)';
    }
  }

  toString() {
    console.log(
      'img' + this.img +
      'text' + this.text +
      'tooltip' + this.tooltip +
      'size' + this.size +
      'portrait' + this.portrait +
      'redirect' + this.redirect +
      'newTab' + this.newTab);
  }

  triggerText() {
    this.textComponent.play();
  }

}
