import {AfterViewInit, Component} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements AfterViewInit {

  hovers = [];

  options = [
    {img: 'assets/krosmaga/bg-cra.jpg', pos: 57.5},
    {img: 'assets/krosmaga/bg-ecaflip.jpg', pos: 58},
    {img: 'assets/krosmaga/bg-eniripsa.jpg', pos: 58},
    {img: 'assets/krosmaga/bg-enutrof.jpg', pos: 54},
    {img: 'assets/krosmaga/bg-feca.jpg', pos: 64},
    {img: 'assets/krosmaga/bg-iop.jpg', pos: 53},
    {img: 'assets/krosmaga/bg-sacrieur.jpg', pos: 57},
    {img: 'assets/krosmaga/bg-sadida.jpg', pos: 54},
    {img: 'assets/krosmaga/bg-sram.jpg', pos: 53},
    {img: 'assets/krosmaga/bg-xelor.jpg', pos: 56},
  ];

  constructor() {
  }

  ngAfterViewInit() {
    this.animation();
  }

  animation() {
    gsap.from('.menuItem-bottom', {duration: 2, xPercent: 50, yPercent: -200});
    gsap.from('.menuItem-top', {duration: 2, xPercent: -50, yPercent: 200, onComplete: this.initHover});
  }

  initHover() {
    const images = document.getElementsByClassName('god-img');
    const wrappers = document.getElementsByClassName('menuItem');

    const hover = (elem) => gsap.to(elem, {
      width: '13vw',
      xPercent: -10,
      zIndex: 10,
      duration: 0.1,
      marginTop: 0,
      height: 'calc(100vh - var(--header-menu))',
      paused: true,
      ease: 'power1.inOut'
    });
    const hover2 = (elem) => gsap.to(elem, {
      width: '13vw',
      zIndex: 10,
      duration: 0.1,
      height: ' calc(100vh - var(--header-menu))',
      paused: true,
      ease: 'power1.inOut'
    });

    for (const wrapper of wrappers) {
      const anim = hover(wrapper);
      wrapper.addEventListener('mouseenter', () => {
        anim.play();
      });
      wrapper.addEventListener('mouseleave', () => {
        anim.reverse();
      });
    }

    for (const image of images) {
      const anim = hover2(image);
      image.addEventListener('mouseenter', () => {
        anim.play();
      });
      image.addEventListener('mouseleave', () => {
        anim.reverse();
      });
    }
  }

}
