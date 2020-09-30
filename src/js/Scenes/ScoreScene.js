import Phaser from 'phaser';
import ScoreApi from '../Api/ScoreApi';
import Button from '../Objects/Button';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  displayData() {
    this.api = new ScoreApi()
    const data = this.api.getResults();

    data.forEach(el => {
      console.log(el)
    });
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'background');
    this.add.text(260, 100, 'Leaderboard Score', { fontSize: '25px', fill: '#a0522d' });
    this.menuButton = new Button(this, 380, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    // this.api = new ScoreApi()
    // const data = this.api.getResults();

    // this.add.text(100, 100, JSON.stringify(data.result[0]));
  }
}