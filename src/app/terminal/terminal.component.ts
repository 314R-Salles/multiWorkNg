import {Component, OnInit} from '@angular/core';
import {gsap} from 'gsap';
import {TextPlugin} from 'gsap/TextPlugin';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    gsap.registerPlugin(TextPlugin);

    gsap.to('.screen', {
      duration: 3,
      width: '13vw',
      // 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power1.inOut'
    });
    gsap.to('.text-terminal', {duration: 2, text: 'Hello, how are you?', ease: 'none', delay: 3});
  }

}
