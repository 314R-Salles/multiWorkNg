import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-entry-screen',
  templateUrl: './entry-screen.component.html',
  styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements AfterViewInit {

  // @ViewChild('image') image: ElementRef;
  // @ViewChild('text') text: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    this.animation();
  }

  animation() {
    // gsap.from(this.image.nativeElement, {duration: 2, x: -1000});
    // gsap.set(this.text.nativeElement, {y: 400});
    // gsap.fromTo(this.text.nativeElement, {x: 3000}, {x: -200, delay: 1, duration: 2});



  }

}
