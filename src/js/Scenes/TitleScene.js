import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'background');
    
    this.gameButton = new Button(this, config.width / 2, config.height / 4 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    this.optionsButton = new Button(this, config.width / 2, config.height / 4, 'blueButton1', 'blueButton2', 'Options', 'Options');

    this.helpButton = new Button(this, config.width / 2, config.height / 4 + 100, 'blueButton1', 'blueButton2', 'Help', 'Help');

    this.leaderScoreButton = new Button(this, config.width / 2, config.height / 4 + 200, 'blueButton1', 'blueButton2', 'Scores', 'Score');

    this.creditsButton = new Button(this, config.width / 2, config.height / 4 + 300, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
