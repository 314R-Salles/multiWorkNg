import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  instructionPanel = false;
  levels = false;
  extra = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  displayInstructions() {
    this.instructionPanel = true;
    this.levels = false;
    this.extra = false;
  }

  displayLevels() {
    this.instructionPanel = false;
    this.levels = true;
    this.extra = false;
  }

  displayExtra() {
    this.instructionPanel = false;
    this.levels = false;
    this.extra = true;
  }

}
