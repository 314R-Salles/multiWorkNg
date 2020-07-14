import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayConnect4 = false;
  displayMineSweeper = false;

  constructor() {
  }

  ngOnInit() {
  }
}

