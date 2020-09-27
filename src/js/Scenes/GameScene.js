import 'phaser';

const gameState = { score: 0 }
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('background', 'assets/bg.jpg');

    this.load.image('asteriod1', 'assets/asteriods/asteriod_1.png');
    this.load.image('asteriod2', 'assets/asteriods/asteriod_2.png');
    this.load.image('asteriod3', 'assets/asteriods/asteriod_3.png');

    this.load.image('player', 'assets/player/player.png');

    this.load.image('enemy1', 'assets/enemy/enemy.png');
    this.load.image('enemy2', 'assets/enemy/enemy.png');
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
    
    gameState.player = this.physics.add.sprite(225, 450, 'player').setScale(0.5);
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'enemy').setScale(0.02);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    const asteriods = this.physics.add.group();
    const enemies = this.physics.add.group();

    const asteriodList = ['asteriod1', 'asteriod2', 'asteriod3'];
    const enemyList = ['enemy1', 'enemy2'];

    const asteriodGen = () => {
      const xCoord = Math.random() * 600;
      let randomasteriod = asteriodList[Math.floor(Math.random() * 3)];
      asteriods.create(xCoord, -50, randomasteriod);
    };

    const enemyGen = () => {
      const xCoord = Math.random() * 600;
      let randomenemy = enemyList[Math.floor(Math.random() * 2)];
      enemies.create(xCoord, -50, randomenemy);
    };

    this.time.addEvent({
      delay: 2200,
      callback: asteriodGen,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 3300,
      callback: enemyGen,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.bg.tilePositionY -= 0.3;

    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-120);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(120);
    } else if (gameState.cursors.up.isDown) {
      gameState.player.setVelocityY(-120);
    } else if (gameState.cursors.down.isDown) {
      gameState.player.setVelocityY(120);
    } else {
      gameState.player.setVelocityX(0);
    }
  }
};
