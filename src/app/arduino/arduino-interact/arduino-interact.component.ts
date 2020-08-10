import {Component, OnDestroy, OnInit} from '@angular/core';
import {CircuitElement} from '../circuitElement';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';
import {ArduinoStoreService} from '../arduino-store/arduino-store.service';

@Component({
  selector: 'app-arduino-interact',
  templateUrl: './arduino-interact.component.html',
  styleUrls: ['./arduino-interact.component.css']
})
export class ArduinoInteractComponent implements OnInit, OnDestroy {


  elements: CircuitElement[] = [];

  destroy$ = new Subject<any>();

  constructor(private storeService: ArduinoStoreService) {
  }

  ngOnInit() {
    this.storeService.spyOnElements()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((elements) => {
      this.elements = elements;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
