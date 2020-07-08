import {Component, OnInit} from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.css']
})
export class MineSweeperComponent implements OnInit {
  canvas: any;

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
        const canvas2 = s.createCanvas(500, 400);
        canvas2.parent('sketch-holder');
        mine = s.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bomb_icon.svg/656px-Bomb_icon.svg.png');

        s.initialize();
      };

      s.draw = () => {
      };

      s.mouseClicked = () => {

        if (!gameOver && s.mouseX > 0 && s.mouseX <= 400 && s.mouseY > 0 && s.mouseY < 400) {
          s.unveil(Math.floor(s.mouseX / 50) + 1, Math.floor(s.mouseY / 50) + 1);
          s.checkWin();
        } else if (s.mouseX > 410 && s.mouseX < 490 && s.mouseY > 350 && s.mouseY < 375) {
          s.initialize();
        }
      };

      s.initialize = () => {

        // reset game properties
        minesNumber = 0;
        gameOver = false;

        // clear screen
        s.background(150);

        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            mines[j][i] = Math.random() > 0.8 ? 1 : 0;
            plateau[j][i] = ' ';
            s.line(j * 50, 0, j * 50, 400);
            s.line(0, j * 50, 400, j * 50);
          }
        }
        mines[1][1] = mines[8][8] = mines[8][1] = mines[1][8] = 0;

        for (let j = 1; j < 9; j++) {
          for (let i = 1; i < 9; i++) {
            minesNumber += mines[j][i];
          }
        }
        s.textSize(15);
        s.fill(255, 0, 0); // red
        s.rect(410, 350, 80, 25);
        s.fill(255); // white
        s.text('Mines: ' + minesNumber, 410, 25);
        s.text('Restart', 425, 367);
        s.textSize(25);
      };


      s.unveil = (x, y) => {
        if (mines[y][x] !== 1 && plateau[y][x] === ' ') {
          const minesAround = s.sum(x, y);
          plateau[y][x] = minesAround; // +48
          s.text(plateau[y][x], (x - 0.72) * 50, (y - 0.28) * 50);
          if (minesAround === 0) {
            s.unveil0(x, y);
          }
        } else if (mines[y][x] === 1) {
          gameOver = true;
          s.displayMines();
          s.textSize(15);
          s.fill(255, 0, 0); // red
          s.text('¯\\_(°~°)_/¯', 410, 335);
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
              s.image(mine, (i - 1) * 50 + 12, (j - 1) * 50 + 12, 25, 25);
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
          s.text('Bravo', 415, 335);
        }
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
