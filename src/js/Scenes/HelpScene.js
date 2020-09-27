import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }

  create() {
    this.add.text(300, 100, 'How To Play', { fontSize: '25px', fill: '#a0522d' });
    this.add.text(150, 200, 'Use the arrow keys to move across the screen', { fontSize: '20px', fill: '#fff' });
    this.add.text(230, 250, 'Press F to fire the laser bullets', { fontSize: '20px', fill: '#fff' });
    this.add.text(270, 350, 'And avoid getting hit', { fontSize: '20px', fill: '#fff' });

    this.menuButton = new Button(this, 380, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}