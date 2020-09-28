import Phaser from 'phaser';
import LaserGroup from '../Objects/LaserGroup';

const gameState = { score: 0 };

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.laserGroup;
  }

  gameOver() {
    this.physics.pause();

    this.add.text(300, 250, 'Game Over', {
      fontSize: '30px',
      fontWeight: '700',
      fill: '#333',
    });

    this.add.text(300, 270, 'Click to Restart', {
      fontSize: '30px',
      fontWeight: '700',
      fill: '#333',
    });

    this.input.on('pointerup', () => {
      gameState.score = 0;
      this.scene.restart();
    });
  }

  shootLaser() {
    this.laserGroup.fireLaser(gameState.player.x, gameState.player.y - 20);
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
    this.add.image(400, 300, 'enemy').setScale(0.02);

    this.laserGroup = new LaserGroup(this);

    gameState.player = this.physics.add.sprite(300, 450, 'player');
    gameState.player.setGravity(0, 0);
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    const asteriods = this.physics.add.group();
    const enemies = this.physics.add.group();

    const asteriodList = ['asteriod1', 'asteriod2', 'asteriod3'];
    const enemyList = ['enemy1', 'enemy2'];

    const asteriodGen = () => {
      const xCoord = Math.random() * 600;
      const randomasteriod = asteriodList[Math.floor(Math.random() * 3)];
      asteriods.create(xCoord, -50, randomasteriod);
    };

    const enemyGen = () => {
      const xCoord = Math.random() * 600;
      const randomenemy = enemyList[Math.floor(Math.random() * 2)];
      enemies.create(xCoord, -50, randomenemy);
    };

    const asteriodGenLoop = this.time.addEvent({
      delay: 2200,
      callback: asteriodGen,
      callbackScope: this,
      loop: true,
    });

    const enemyGenLoop = this.time.addEvent({
      delay: 3300,
      callback: enemyGen,
      callbackScope: this,
      loop: true,
    });

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

    this.anims.create({
      key: 'collisionExplosion',
      frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 10 }),
      frameRate: 20,
      repeat: 0,
    });

    this.physics.add.collider(gameState.player, asteriods, () => {
      asteriodGenLoop.destroy();
      enemyGenLoop.destroy();

      gameState.player.anims.play('collisionExplosion', true);

      this.gameOver();
    });

    this.physics.add.collider(gameState.player, enemies, () => {
      asteriodGenLoop.destroy();
      enemyGenLoop.destroy();

      gameState.player.anims.play('collisionExplosion', true);

      this.gameOver();
    });

    this.physics.add.collider(gameState.player, enemies, () => {
      asteriodGenLoop.destroy();
      enemyGenLoop.destroy();

      gameState.player.anims.play('collisionExplosion', true);

      this.gameOver();
    });

    this.physics.add.collider(enemies, this.laserGroup, (enemyr) => {
      enemy.destroy();
      this.laserGroup.destroy();     
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
    } else if (gameState.fire.isDown) {
      this.shootLaser();
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.setVelocityY(0);
    }
  }
}
