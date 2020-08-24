import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  pageNumber = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  pageUp() {
    return this.pageNumber < 5 ? this.pageNumber++ : this.pageNumber;
  }

  pageDown() {
    return this.pageNumber > 1 ? this.pageNumber-- : this.pageNumber;
  }
}
