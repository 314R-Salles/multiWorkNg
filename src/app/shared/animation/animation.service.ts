import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  animationId = 0;
  animations: { [key: string]: GSAPTween[] } = {};

  // animationGroups: { [key: string]: GSAPTween[]; } = {};


  constructor() {
  }

  getNewComponentId() {
    return this.animationId++;
  }

  add(key: string, animation: GSAPTween) {
    if (!!this.animations[key]) {
      this.animations[key].push(animation);
    } else {
      this.animations[key] = [animation];
    }
  }

  get(key: string) {
    return this.animations[key];
  }

  delete(key: string) {
    this.animations[key] = undefined;
  }

  play(key: string) {
    return (this.animations[key] || []).forEach(anim => anim.play());
  }

  pause(key: string) {
    return this.animations[key].forEach(anim => anim.pause());
  }


}
