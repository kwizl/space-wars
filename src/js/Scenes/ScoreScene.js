import Phaser from 'phaser';
import ScoreApi from '../Api/ScoreApi';
import Button from '../Objects/Button';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  displayData(data) {
    let jsonString = '';
    data.forEach(el => {
      jsonString += `\n${el.user}: ${el.score}`;
    });
    this.header = this.add.text(260, 100, 'Leaderboard Score', { fontSize: '25px', fill: '#a0522d' });
    this.scores = this.add.text(1, 1, jsonString, { lineSpacing: 20 });
    Phaser.Display.Align.In.Center(this.header, this.textZone, 0, -250);
    Phaser.Display.Align.In.Center(this.scores, this.textZone, 0, -50);
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'background');
    
    this.menuButton = new Button(this, 380, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.textZone = this.add.zone(400, 300, 800, 600);

    const api = ScoreApi();
    api.getResults().then((scores) => {
      const scorelist = api.topScores(5, scores);
      this.displayData(scorelist);
    }).catch(() => {
      const err = this.add.text(1, 1, 'API request failed!');
      Phaser.Display.Align.In.Center(err, this.textZone);
    });
  }
}