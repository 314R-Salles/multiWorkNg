import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.css']
})
export class LoadersComponent implements OnInit {

  count = 0;
  maxValue = 10;

  clipPathValues: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.count = 0;
    this.computeClipPathValues();
  }

  add() {
    this.count++;
    this.computeClipPathValues();
  }

  computeClipPathValues() {
    this.clipPathValues[0] = `polygon(0 0, ${(1 + this.count) * 10}% 0, ${(1 + this.count) * 10}% 100%, 0% 100%)`;
    this.clipPathValues[1] = `polygon(0% 0%,  ${(1 + this.count) * 10}% 0,  ${(1 + this.count) * 10 + 5}% 50%,  ${(1 + this.count) * 10}% 100%, 0% 100%)`;
    this.clipPathValues[2] = `polygon(0% 0%,  ${(1 + this.count) * 10}% 0,  ${(1.5 + this.count) * 10}% 100%, 0% 100%)`;
    this.clipPathValues[3] = `polygon(0% 0%,  ${(1 + this.count) * 10}% 0,  ${(1 + this.count) * 15}% 100%, 0% 100%)`;
    this.clipPathValues[4] = `polygon(0% 0%,  ${(1 + this.count) * 10}% 0,  ${(1 + this.count) * 20}% 100%, 0% 100%)`;
  }

}
