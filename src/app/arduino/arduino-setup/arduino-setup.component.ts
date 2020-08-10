import {Component, OnDestroy, OnInit} from '@angular/core';
import {CircuitElement, Color, State, Type} from '../circuitElement';
import {addElement, removeElement, setCoordinates, setState} from '../arduino-store/arduino.actions';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {saveAs} from 'file-saver';
import {ArduinoStoreService} from '../arduino-store/arduino-store.service';

@Component({
  selector: 'app-arduino-setup',
  templateUrl: './arduino-setup.component.html',
  styleUrls: ['./arduino-setup.component.css']
})
export class ArduinoSetupComponent implements OnInit, OnDestroy {

  colors = Color;
  types = Type;

  action: string;
  color: Color;
  item: Type;

  state;
  elements: CircuitElement[] = [];

  destroy$ = new Subject<any>();


  ngOnInit() {
    this.storeService.spyOnElements()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((elements) => {
      this.elements = elements;
    });
  }

  constructor(private storeService: ArduinoStoreService) {
  }

  onDragReleased(circuitElement, event) {
    const element = event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    const parentPosition = this.getPosition(element);

    this.storeService.dispatch(setCoordinates({
      id: circuitElement.id,
      xPos: boundingClientRect.x - parentPosition.left,
      yPos: boundingClientRect.y - parentPosition.top
    }));
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  }

  editElement() {
    if (this.action === 'add') {
      this.storeService.dispatch(addElement({element: new CircuitElement(State.INACTIVE, 50, 50, this.item, this.color)}));
    }
    if (this.action === 'remove') {
      const id = this.elements.find(element => element.type === this.item && element.color === this.color)?.id;
      if (id) {
        this.storeService.dispatch(removeElement({id}));
      }
    }
  }

  saveState() {
    this.storeService.getArduinoState().subscribe(state => {
      this.state = state;

      const fileName = 'circuit.json';

      const fileToSave = new Blob([JSON.stringify(this.state)], {
        type: 'application/json',
      });

      saveAs(fileToSave, fileName);
    });
  }

  loadState() {
    const file_to_read = (<HTMLInputElement>document.getElementById('file_upload')).files[0];
    const fileReader = new FileReader();
    const that = this;

    // action to be done when reading file
    fileReader.onload = function (e) {
      const content = e.target.result;
      if (typeof content === 'string') {
        const intern = JSON.parse(content);
        that.storeService.dispatch(setState({newState: intern}));
      }
    };

    // reading file
    fileReader.readAsText(file_to_read);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

