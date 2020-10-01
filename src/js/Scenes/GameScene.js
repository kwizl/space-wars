/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import ScoreApi from '../Api/ScoreApi';
import LaserGroup from '../Objects/LaserGroup';

const gameState = { score: 0 };

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  shootLaser() {
    this.laserGroup.fireLaser(gameState.player.x, gameState.player.y - 20);
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');

    this.laserGroup = new LaserGroup(this);

    gameState.player = this.physics.add.sprite(380, 450, 'player').setScale(0.2);
    gameState.player.setGravity(0, 0);
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    const asteriods = this.physics.add.group();
    const enemies = this.physics.add.group();

    const asteriodList = ['asteriod1', 'asteriod2', 'asteriod3'];
    const enemyList = ['enemy', 'enemy'];

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

    gameState.scoreText = this.add.text(20, 0, 'Score: 0', {
      fontSize: '18px',
      fill: '#dcdcdc',
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

      const api = ScoreApi();
      api.getResults().then((scores) => {
        this.inputField = document.getElementById('name');
        const topScores = api.topScores(5, scores);
        if (topScores[topScores.length - 1].score < gameState.score) {
          this.scene.start('Name');
          this.scene.stop('Game');
          gameState.topScore = gameState.score;
        } else {
          this.scene.stop('Game');
          this.scene.start('Title');
          gameState.score = 0;
        }
      }).catch(() => {
        this.scene.start('Title');
      });

      gameState.player.anims.play('collisionExplosion', true);
    });

    this.physics.add.collider(gameState.player, enemies, () => {
      asteriodGenLoop.destroy();
      enemyGenLoop.destroy();

      const api = ScoreApi();
      api.getResults().then((scores) => {
        this.inputField = document.getElementById('name');
        const topScores = api.topScores(5, scores);
        if (topScores[topScores.length - 1].score < gameState.score) {
          gameState.topScore = gameState.score;
          this.scene.stop('Game');
          this.scene.start('Name');
        } else {
          this.scene.stop('Game');
          this.scene.start('Title');
          gameState.score = 0;
        }
      }).catch(() => {
        this.scene.start('Title');
      });

      gameState.player.anims.play('collisionExplosion', true);
    });

    this.physics.add.collider(enemies, this.laserGroup, (enemy, laser) => {
      enemy.destroy();
      laser.destroy();
      gameState.score += 20;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    this.physics.add.collider(asteriods, this.laserGroup, (asteriod, laser) => {
      asteriod.destroy();
      laser.destroy();
      gameState.score += 5;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });
  }

  gameScore() {
    return gameState.topScore;
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