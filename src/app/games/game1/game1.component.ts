import {Component, OnInit} from '@angular/core';
import {Item} from '../item.model';
import {Router} from '@angular/router';
import {GameStoreService} from '../game-store/game-store.service';
import {setRedCardState} from '../game-store/game.actions';


@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.css']
})
export class Game1Component implements OnInit {
  pos = {x: 1200, y: 0};
  uvOn = false;
  redCard = false;
  above = false;
  aboveLock = false;

  items: Item[] = [];


  constructor(private router: Router, private storeService: GameStoreService) {
  }

  ngOnInit() {
    this.items.push(new Item('UV Lamp', false, 'assets/game_files/items/uv_light.gif', 1));
    this.items.push(new Item('Red Card', false, 'assets/game_files/items/red_card.gif', 2));
    this.items.push(new Item('Empty slot', false, 'assets/game_files/items/empty.gif', 0));
    this.items.push(new Item('Empty slot', false, 'assets/game_files/items/empty.gif', 0));
    this.items.push(new Item('Empty slot', false, 'assets/game_files/items/empty.gif', 0));
    this.items.push(new Item('Empty slot', false, 'assets/game_files/items/empty.gif', 0));

    // Ajout d'un redCardState puisqu'on a la carte dans l'inventaire
    this.storeService.dispatch(setRedCardState({newState: {id: 'DarkSasuke', password: 'superGod'}}));

  }

  onItemEvent(id) {
    const itemToUpdate = this.items.find(item => item.id === id);
    itemToUpdate.isActive = !itemToUpdate.isActive;
    this.items.filter(item => item.id !== id).forEach(item => item.isActive = false);

    this.updateState();
  }

  // remplacer par un store?
  updateState() {
    this.uvOn = this.items.find(item => item.id === 1).isActive;
    this.redCard = this.items.find(item => item.id === 2).isActive;
  }

  onMove(event) {
    var cX = event.clientX;
    var sX = event.screenX;
    var cY = event.clientY;
    var sY = event.screenY;
    // console.log('client - X: ' + cX + ', Y coords: ' + cY);
    // console.log('screen - X: ' + sX + ', Y coords: ' + sY);
    this.pos = {x: cX - 150, y: cY - 150};
    this.above = cX > 125 && cX < 950 && cY > 130 && cY - 80 < 500;
    this.aboveLock = cX > 900 && cX < 930 && cY > 300 && cY < 340;
    console.log(this.aboveLock);
  }

  onClick() {
    // plutot qu'avoir un booleen pour chaque item, calculé n'importe comment, avoir une liste des objets avec lesquels on peut interagir
    // leurs positions/dimensions, et avoir une méthode générique pour calculer le "is Above" en temps voulu.

    if (this.aboveLock && this.redCard) {
      this.router.navigate(['/game/2']);
    }
  }


}
