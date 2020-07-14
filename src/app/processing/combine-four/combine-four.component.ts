import {Component, OnDestroy, OnInit} from '@angular/core';
import p5 from 'p5';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as uuid from 'uuid';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-combine-four',
  templateUrl: './combine-four.component.html',
  styleUrls: ['./combine-four.component.css']
})
export class CombineFourComponent implements OnInit, OnDestroy {
  canvas: any;
  userId: string;
  previousPlayerUuid: string;

  width: number;
  height: number;
  gridWidth: number;
  boxWidth: number;

  tokenDiameter: number;

  buttonWidth: number;
  buttonHeight: number;
  buttonStartX: number;
  buttonStartY: number;

  restartX: number;
  restartY: number;

  endMessageRedX: number;
  endMessageYellowX: number;
  endMessageY: number;

  textSize: number;

  private serverUrl = environment.JAVA_API + '/socket';
  private stompClient;

  constructor() {
  }


  sendMessage(message) {
    this.stompClient.send('/app/send/connect4', {}, message);
  }

  ngOnInit() {
    this.userId = uuid.v4();

    const sketch = s => {
      /**
       * Game is 7*6, but array is 13*12 since I add a length of 3 for each side.
       * Enables me to test token combinations without using dozens of if else statements
       */
      const plateau = createArray();
      let gameOver = false;

      let token = 'O';

      s.initializeWebSocketConnection = () => {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, () => {
          that.stompClient.subscribe('/connect4', (message) => {
            const parsedMessage = JSON.parse(message.body);
            if (!parsedMessage.replay && this.previousPlayerUuid !== parsedMessage.uuid) {
              const yPos = s.placeToken(+parsedMessage.xpos);
              if (yPos !== -1) {
                this.previousPlayerUuid = parsedMessage.uuid;
                s.checkWin(yPos, +parsedMessage.xpos + 2);
              }
            } else if (parsedMessage.replay) {
              s.initialize();
            }
          });
        });
      };

      s.setup = () => {
        s.initializeWebSocketConnection();
        s.initialize();
      };

      s.draw = () => {
      };

      s.mouseClicked = () => {

        if (!gameOver && s.mouseX > 0 && s.mouseX <= this.gridWidth && s.mouseY > 0 && s.mouseY < this.height) {
          this.sendMessage(JSON.stringify({xpos: Math.floor(s.mouseX / this.boxWidth) + 1, uuid: this.userId}));
        } else if (s.mouseX > this.buttonStartX && s.mouseX < this.buttonStartX + this.buttonWidth
          && s.mouseY > this.buttonStartY && s.mouseY < this.buttonStartY + this.buttonHeight) {
          this.sendMessage(JSON.stringify({replay: true}));
        }
      };

      s.initialize = () => {

        s.setSizes();

        const canvas2 = s.createCanvas(this.width, this.height);
        canvas2.parent('connect-four-holder');

        // reset game properties
        gameOver = false;
        token = 'O';
        this.previousPlayerUuid = '';
        s.clearTable();

        // clear screen
        s.background(150);
        s.drawTable();

        s.textSize(this.textSize);
        s.fill(255, 0, 0); // red
        s.rect(this.buttonStartX, this.buttonStartY, this.buttonWidth, this.buttonHeight);
        s.fill(255); // white
        s.text('Restart', this.restartX, this.restartY);
      };


      /** We only use the X coordinate to select a column, then we "drop" a token in it.
       *  8 is the bottom row ( starts at 0, height is 6, with 3 extra rows => 8)
       *  We try to place a token at the bottom row. If there is already a token, we go up and try the (8 - 1)th spot, then (8 - 2)th...
       *  Then we swap tokens for the next player, and return 8-i, the height of the played token.
       */
      s.placeToken = (x: number) => {
        for (let i = 0; i < 6; i++) {
          if (plateau[8 - i][x + 2] === ' ') {
            plateau[8 - i][x + 2] = token;
            if (token === 'O') {
              s.fill(255, 255, 0);
              token = 'X';
            } else {
              s.fill(255, 0, 0);
              token = 'O';
            }
            s.ellipse(this.boxWidth * (x - 1 + 0.5), (8 - i - 3 + 0.5) * this.boxWidth, this.tokenDiameter, this.tokenDiameter);
            return 8 - i;
          }
        }
        return -1;
      };


      /**
       *  Extract the 4 lines of tokens which have the new token as center. - | / \
       *  Then find a winning combination in those 4 lines. Concatenation let us search once, instead of searching once for each direction.
       *  The 4 lines starts with a space, so that concatenation doesn't create false positives.
       */
      s.checkWin = (y, x) => {
        let h = ' ';
        let v = ' ';
        let d1 = ' ';
        let d2 = ' ';

        for (let i = -3; i <= 3; i++) {
          h += plateau[y][x + i];
          v += plateau[y + i][x];
          d1 += plateau[y + i][x + i];
          d2 += plateau[y - i][x + i];
        }

        if ((h + v + d1 + d2).includes('OOOO')) {
          s.text('Yellow wins', this.endMessageYellowX, this.endMessageY);
          gameOver = true;
        }
        if ((h + v + d1 + d2).includes('XXXX')) {
          s.text('Red wins', this.endMessageRedX, this.endMessageY);
          gameOver = true;
        }
      };

      s.clearTable = () => {
        for (let j = 3; j < 9; j++) {
          for (let i = 3; i < 10; i++) {
            plateau[j][i] = ' ';
          }
        }
      };

      // draw rectangle then "erase" all the possible token spots
      s.drawTable = () => {
        s.fill(255, 226, 147);
        s.rect(0, 0, this.gridWidth, this.height);
        s.fill(150);
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 6; j++) {
            s.ellipse(this.boxWidth * (i + 0.5), this.boxWidth * (j + 0.5), this.tokenDiameter, this.tokenDiameter);
          }
        }
      };

      s.setSizes = () => {
        this.width = Math.min(600, s.windowWidth - 50);
        this.height = Math.min(400, s.windowHeight - 50); // -50 for scrollbars and mobile
        if (this.height <= 0.66 * this.width) {
          this.width = 1.5 * this.height;
        }
        if (this.width <= 1.5 * this.height) {
          this.height = 0.66 * this.width;
        }

        this.gridWidth = this.height / 6 * 7;
        this.boxWidth = this.height / 6;
        this.tokenDiameter = this.boxWidth * 0.9;
        this.buttonWidth = this.height / 5;
        this.buttonHeight = this.height / 16;

        this.buttonStartX = this.gridWidth * 1.06;
        this.buttonStartY = this.height * 0.875;

        this.restartX = this.gridWidth * 1.09;
        this.restartY = this.height * 0.918;

        this.endMessageRedX = this.gridWidth * 1.08;
        this.endMessageYellowX = this.gridWidth * 1.05;
        this.endMessageY = this.height / 6;

        this.textSize = this.height / 26;
      };

      s.debug = () => {
      };

    };
    this.canvas = new p5(sketch);

    function createArray() {
      const array = [];
      for (let i = 0; i < 12; i++) {
        array[i] = [];
        for (let j = 0; j < 13; j++) {
          array[i][j] = ' ';
        }
      }
      return array;
    }

  }

  ngOnDestroy(): void {
    // A new connection starts each time the component is created
    this.stompClient.disconnect();
  }
}

