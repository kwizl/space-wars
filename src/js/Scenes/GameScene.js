import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('background', 'assets/bg.jpg');

    this.load.image('asteriod1', 'assets/asteriods/asteriod_1.png');
    this.load.image('asteriod2', 'assets/asteriods/asteriod_2.png');
    this.load.image('asteriod3', 'assets/asteriods/asteriod_3.png');

    this.load.image('enemy1', 'assets/enemies/enemy.png');
    this.load.image('enemy2', 'assets/enemies/enemy.png');
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');

    const asteriods = this.physics.add.group();
    const enemies = this.physics.add.group();

    const asteriodList = ['asteriod1', 'asteriod2', 'asteriod3'];
    const asteriodList = ['enemy1', 'enemy2'];

    const asteriodGen = () => {
      const xCoord = Math.random() * 600;
      let randomasteriod = asteriodList[Math.floor(Math.random() * 3)];
      asteriods.create(xCoord, -50, randomasteriod);
    };

    this.time.addEvent({
      delay: 2200,
      callback: asteriodGen,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 2200,
      callback: asteriodGen,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.bg.tilePositionY -= 0.3;
  }
};
