import Phaser from 'phaser';
import ScoreApi from '../Api/ScoreApi';
import GameScene from './GameScene';

export default class NameScene extends Phaser.Scene {
  constructor() {
    super('Name');
  }

  displayFields() {
    const display = this.add.zone(400, 300, 800, 600);
    const title = this.add.text(1, 1, 'You got a high score!\nEnter your name and press Enter', { fontSize: 20 });
    Phaser.Display.Align.In.Center(title, display, 0, -200);
    this.inputField = document.getElementById('name');
    this.inputField.classList.remove('hidden');
    this.inputField.focus();
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scoreValue = false;

    this.displayFields();
  }

  update() {
    const game = new GameScene();
    if (this.enterKey.isDown && (this.inputField.nodeValue !== '')) {
      this.inputField = document.getElementById('name');
      this.inputField.classList.add('hidden');
      this.input.keyboard.removeAllListeners();
      if (!this.scoreValue) {
        const api = ScoreApi();
        api.postResults(this.inputField.value, game.gameScore()).then(() => {
          this.scene.start('Score');
        }).catch(() => {
          this.scene.start('Title');
        });
      }
      this.scoreValue = true;
    }
  }
}