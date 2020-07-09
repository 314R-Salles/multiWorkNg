import {Component, OnInit} from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.css']
})
export class MineSweeperComponent implements OnInit {
  canvas: any;
  width: number;
  height: number;
  gridWidth: number;
  boxWidth: number;
  mineWidth: number;
  mineOffset: number;

  buttonWidth: number;
  buttonHeight: number;
  buttonOffset: number;
  buttonStartX: number;
  buttonStartY: number;

  mineNumberX: number;
  mineNumberY: number;
  mineNumberOffset: number;

  endMessageX: number;
  endMessageY: number;

  restartX: number;
  restartY: number;

  bigTextSize: number;
  smallTextSize: number;

  constructor() {
  }

  ngOnInit() {
    const sketch = s => {
      const mines = createArray();
      const plateau = createArray();
      let gameOver = false;
      let minesNumber = 0;
      let mine;

      s.setup = () => {
        mine = s.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bomb_icon.svg/656px-Bomb_icon.svg.png');

        s.initialize();
      };

      s.draw = () => {
      };

      s.mouseClicked = () => {

        if (!gameOver && s.mouseX > 0 && s.mouseX <= this.gridWidth && s.mouseY > 0 && s.mouseY < this.height) {
          s.unveil(Math.floor(s.mouseX / this.boxWidth) + 1, Math.floor(s.mouseY / this.boxWidth) + 1);
          s.checkWin();
        } else if (s.mouseX > this.buttonStartX && s.mouseX < this.buttonStartX + this.buttonWidth
          && s.mouseY > this.buttonStartY && s.mouseY < this.buttonStartY + this.buttonHeight) {
          s.initialize();
        }
      };

      s.initialize = () => {

        s.setSizes();

        const canvas2 = s.createCanvas(this.width, this.height);
        canvas2.parent('sketch-holder');

        // reset game properties
        minesNumber = 0;
        gameOver = false;

        // clear screen
        s.background(150);

        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            mines[j][i] = Math.random() > 0.8 ? 1 : 0;
            plateau[j][i] = ' ';
            s.line(j * this.boxWidth, 0, j * this.boxWidth, this.height);
            s.line(0, j * this.boxWidth, this.height, j * this.boxWidth);
          }
        }
        mines[1][1] = mines[8][8] = mines[8][1] = mines[1][8] = 0;

        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            minesNumber += mines[j][i];
          }
        }
        s.textSize(this.smallTextSize);
        s.fill(255, 0, 0); // red
        s.rect(this.buttonStartX, this.buttonStartY, this.buttonWidth, this.buttonHeight);
        s.fill(255); // white
        s.text('Mines: ' + minesNumber, this.mineNumberX, this.mineNumberY);
        s.text('Restart', this.restartX, this.restartY);
        s.textSize(this.bigTextSize);
      };


      s.unveil = (x, y) => {
        if (mines[y][x] !== 1 && plateau[y][x] === ' ') {
          const minesAround = s.sum(x, y);
          plateau[y][x] = minesAround; // +48
          s.text(plateau[y][x], (x - 0.72) * this.boxWidth, (y - 0.28) * this.boxWidth);
          if (minesAround === 0) {
            s.unveil0(x, y);
          }
        } else if (mines[y][x] === 1) {
          gameOver = true;
          s.displayMines();
          s.textSize(this.smallTextSize);
          s.fill(255, 0, 0); // red
          s.text('¯\\_(°~°)_/¯', this.endMessageX, this.endMessageY);
        }
      };


      s.sum = (x, y) => {
        return mines[y - 1][x - 1] + mines[y - 1][x] + mines[y - 1][x + 1] + mines[y][x - 1] +
          mines[y][x + 1] + mines[y + 1][x - 1] + mines[y + 1][x] + mines[y + 1][x + 1];
      };

      s.unveil0 = (x, y) => {
        s.unveil(x - 1, y - 1);
        s.unveil(x - 1, y);
        s.unveil(x - 1, y + 1);
        s.unveil(x, y - 1);
        s.unveil(x, y + 1);
        s.unveil(x + 1, y - 1);
        s.unveil(x + 1, y);
        s.unveil(x + 1, y + 1);
      };

      s.displayMines = () => {
        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            if (mines[j][i] === 1) {
              s.image(mine, (i - 1) * this.boxWidth + this.mineOffset, (j - 1) * this.boxWidth + this.mineOffset, this.mineWidth, this.mineWidth);
            }
          }
        }
      };


      s.checkWin = () => {
        let sum = minesNumber;
        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            sum += plateau[j][i] !== ' ' ? 1 : 0;
          }
        }
        if (sum === 64) {
          s.fill(130, 255, 130); // green
          s.displayMines();
          s.text('Bravo', this.endMessageX, this.endMessageY);
        }
      };

      s.setSizes = () => {
        this.width = Math.min(500, s.windowWidth - 50);
        this.height = Math.min(400, s.windowHeight - 50); // -50 for scrollbars and mobile
        if (this.height <= 0.8 * this.width) {
          this.width = 1.25 * this.height;
        }
        if (this.width <= 1.25 * this.height) {
          this.height = 0.8 * this.width;
        }

        this.gridWidth = this.height;
        this.boxWidth = this.height / 8;
        this.mineWidth = this.height / 16;
        this.mineOffset = this.height / 32;
        this.buttonWidth = this.height / 5;
        this.buttonHeight = this.height / 16;
        this.buttonOffset = this.height / 40;

        this.buttonStartX = this.gridWidth + this.buttonOffset;
        this.buttonStartY = this.height * 0.875;

        this.restartX = this.gridWidth + this.gridWidth / 16;
        this.restartY = this.height * 0.918;

        this.mineNumberOffset = this.gridWidth / 40;
        this.mineNumberX = this.gridWidth + this.mineNumberOffset;
        this.mineNumberY = this.height / 16;

        this.endMessageX = this.gridWidth * 1.03;
        this.endMessageY = this.gridWidth * 0.8375;

        this.bigTextSize = this.height / 16;
        this.smallTextSize = this.height / 26;
      };

      s.debug = () => {
        s.text(s.windowWidth, this.mineNumberX, this.mineNumberY + 30);
        s.text(this.width, this.mineNumberX, this.mineNumberY + 45);
        s.text(s.windowHeight, this.mineNumberX, this.mineNumberY + 60);
        s.text(this.height, this.mineNumberX, this.mineNumberY + 75);
      };

    };
    this.canvas = new p5(sketch);

    function createArray() {
      const array = [];
      for (let i = 0; i < 10; i++) {
        array[i] = [];
        for (let j = 0; j < 10; j++) {
          array[i][j] = 0;
        }
      }
      return array;
    }

  }
}
