import {AfterViewInit, Component, Input} from '@angular/core';
import {gsap} from 'gsap';
import {TextPlugin} from 'gsap/TextPlugin';
import {AnimationService} from '../shared/animation/animation.service';

@Component({
  selector: 'app-ease-in-text',
  templateUrl: './ease-in-text.component.html',
  styleUrls: ['./ease-in-text.component.css']
})
export class EaseInTextComponent implements AfterViewInit {

  @Input() text: string;
  @Input() autoplay;
  id;
  timeline;

  constructor(private animationService: AnimationService) {
    this.id = animationService.getNewComponentId();
  }

  ngAfterViewInit(): void {
    if (this.text) {
      this.generateAnim();
    }
  }

  to(text: string, duration) {
    console.log(text);
    console.log(`.text-button-${this.id}`);
    this.timeline.to(`.text-button-${this.id}`, {duration, text, ease: 'none'});
  }

  generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateAnim() {
    gsap.registerPlugin(TextPlugin);
    this.timeline = gsap.timeline();
    this.timeline.pause();
    const length = this.text.length;

    this.to('/'.repeat(length), 0.5);

    let first = length;
    let numberOfIteration = 0;

    const duration = 0.1;


    while (first >= (1 - 14)) {
      numberOfIteration++;
      first -= 2;
      if (numberOfIteration < 7 && this.text.length >= 14) {
        this.to(this.generateRandomString(numberOfIteration * 2) + '/'.repeat(length - numberOfIteration * 2), duration);
      } else {
        const second = numberOfIteration - 7;
        this.to(this.text.substring(0, second * 2) + this.generateRandomString(Math.min(14, 14 + length - numberOfIteration * 2)) +
          '/'.repeat(Math.max(0, length - numberOfIteration * 2)), duration);
      }
    }
    this.to(this.text, 0.05);

    if (this.autoplay) {
      this.timeline.play();
    } else {
      this.animationService.add('text-button-' + this.id, this.timeline);
    }
  }

  play() {
    // FIXME plutot tenter le service?
    // this.animationService.play('text-button-' + this.id);
    if (this.text) {
      this.timeline.play();
    }
  }

}
