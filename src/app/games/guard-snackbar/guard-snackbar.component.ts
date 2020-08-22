import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-guard-snackbar',
  templateUrl: './guard-snackbar.component.html',
  styleUrls: ['./guard-snackbar.component.css']
})
export class GuardSnackbarComponent implements OnInit {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
