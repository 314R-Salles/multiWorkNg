import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnChanges {

  constructor() {
  }

  @Input() step: number;
  @Input() steps: number;
  @Input() value: number;
  @Input() colors: string[];

  @Output() trigger = new EventEmitter();

  colorIndex = 0;
  indexes;

  ngOnChanges(changes: SimpleChanges) {
    this.indexes = Array(this.steps).fill(1).map((x, i) => i);
    this.colorIndex = Math.floor(this.value / this.step);
    if (this.colorIndex >= this.steps) {
      this.colorIndex = 0;
      this.trigger.emit();
    }
  }

}
