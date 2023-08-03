import {AfterViewInit, Component} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-dev-menu',
  templateUrl: './dev-menu.component.html',
  styleUrls: ['./dev-menu.component.css']
})
export class DevMenuComponent implements AfterViewInit {

  timeline: GSAPTimeline;

  size = 8;
  offset = 1;
  // offset = 0.875;

  buttonList0 = [
    {offset: 0, size: this.size, img: '', redirect: null},
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/java.png',
      redirect: 'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.1%2B12/OpenJDK17U-jdk_x64_windows_hotspot_17.0.1_12.msi',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/nodejs.png',
      redirect: 'https://nodejs.org/dist/v16.13.2/node-v16.13.2-x64.msi',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/postman.png',
      text: '',
      redirect: 'https://dl.pstmn.io/download/latest/win64',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/maven.png',
      text: '',
      redirect: 'https://dlcdn.apache.org/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.zip',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/idea.ico',
      text: '',
      redirect: 'https://download.jetbrains.com/idea/ideaIU-2021.3.1.exe',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      img: 'assets/idea.ico',
      text: '',
      redirect: 'https://account.jetbrains.com/licenses',
      newTab: true
    },
  ];

  buttonList1 = [
    {offset: 0, size: this.size, img: '', redirect: null},
    {
      offset: this.offset,
      size: this.size,
      text: 'Material icons list',
      redirect: 'https://fonts.google.com/icons',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      text: 'Clip path generator',
      redirect: 'https://bennettfeely.com/clippy/',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      text: 'Gradient generator',
      redirect: 'https://cssgradient.io/',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      text: 'Cron generator',
      redirect: 'https://www.freeformatter.com/cron-expression-generator-quartz.html',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      text: 'Flexbox guide',
      redirect: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      newTab: true
    },
    {
      offset: this.offset,
      size: this.size,
      text: 'JWT IO',
      redirect: 'https://jwt.io/',
      newTab: true
    },
  ];

  constructor() {
  }


  ngAfterViewInit() {
    this.timeline = gsap.timeline();
    this.timeline.from('.flower', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        onComplete: this.start
      },
    );
  }

  start() {
    // console.log(this);
    // (this as any).targets()[0].click();
    // (this as any).targets().forEach(a => a.click());
  }

}
