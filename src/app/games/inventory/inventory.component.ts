import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../item.model';
import {setRedCardState} from '../game-store/game.actions';
import {saveAs} from 'file-saver';
import {GameStoreService} from '../game-store/game-store.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input()
  items: Item[] = [];

  @Output() trigger = new EventEmitter<number>();


  constructor(private storeService: GameStoreService) {
  }

  ngOnInit(): void {
  }

  isCardSelected(): boolean {
    return this.items.find(item => item.isActive)?.id === 2;
  }


  saveState() {
    this.storeService.getRedCardState().subscribe(state => {

      const fileName = 'red_card.json';

      // JSON.stringify(this.state, null, 2) donne un json formatté.
      const fileToSave = new Blob([JSON.stringify(state, null, 2)], {
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
        that.storeService.dispatch(setRedCardState({newState: intern}));
      }
    };

    // reading file
    fileReader.readAsText(file_to_read);

  }

}
