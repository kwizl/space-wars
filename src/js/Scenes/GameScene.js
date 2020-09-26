import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('background', 'assets/bg.jpg');
  }

  create() {
    this.add.image(300, 100, 'background');
  }
};
