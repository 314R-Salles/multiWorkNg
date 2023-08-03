import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
import {gsap} from 'gsap';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-button-flower',
  templateUrl: './button-flower.component.html',
  styleUrls: ['./button-flower.component.css']
})
export class ButtonFlowerComponent implements AfterViewInit {

  @ViewChildren(ButtonComponent) buttons: QueryList<ButtonComponent>;

  status = true;

  math = Math;

  timeline;

  _number: number;

  petal;

  get number(): number {
    return this._number;
  }

  @Input() set number(value: number) {
    this._number = value;
    this.petal = 'petal-' + this.number;
  }

  @Input() size = 8;
  @Input() portrait;
  @Input() buttonList;


  constructor() {

  }

  ngAfterViewInit() {
    this.timeline = gsap.timeline();
    this.timeline.from(`.petal-${this.number}`, {delay: 0.01, opacity: 0}, 'simultanné');
    this.timeline.pause();
    this.timeline.from(`.petal-${this.number}`, {
      duration: 1, ease: 'back.out(2.1)', margin: '0',
      onComplete: () => {
        this.status = !this.status;
        this.clickChild();
      },
      onReverseComplete: () => {
        this.status = !this.status;
      },
    }, 'simultanné');
  }

  click(button) {
    if (!button.offset) {
      if (this.status) {
        this.timeline.play();
      } else {
        this.timeline.reverse();
      }
    }
  }

  clickChild() {
    this.buttons.forEach(button => button.triggerText());
  }

  //
  // @HostListener('click', ['$event']) onClick(event) {
  //   this.play();
  // }
  //
  // play() {
  //   this.timeline.play();
  // }

}
