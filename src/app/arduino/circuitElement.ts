import * as uuid from 'uuid';

export class CircuitElement {

  type: Type;
  color: Color;
  xPos: number;
  yPos: number;

  active: State;

  id: number;

  constructor(active: State,
              xPos: number,
              yPos: number,
              type: Type,
              color: Color) {
    this.active = active;
    this.type = type;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = uuid.v4();
  }

}

export enum Type {
  BUTTON = 'button',
  // SWITCH = 'switch',
  // LED = 'LED',
  // LOCK = 'Lock',
}

export enum Color {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  // WHITE = 'white',
}

export enum State {
 ACTIVE = 'active',
 INACTIVE = 'inactive',
}
