/* eslint-disable operator-linebreak */
import Phaser from 'phaser';
import Enemy from '../Objects/Enemy';
import Player from '../Objects/Player';
import ScoreApi from '../Api/ScoreApi';

const gameState = { score: 0 };

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');

    gameState.scoreText = this.add.text(20, 0, 'Score: 0', {
      fontSize: '18px',
      fill: '#dcdcdc',
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explode'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 10 }),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('explode0'),
        this.sound.add('explode1'),
      ],
      laser: this.sound.add('laser_audio'),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'player',
    );

    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.asteriods = this.physics.add.group();

    const asteriodList = ['asteriod1', 'asteriod2', 'asteriod3'];

    const asteriodGen = () => {
      const xCoord = Math.random() * 600;
      const randomasteriod = asteriodList[Math.floor(Math.random() * 3)];
      this.asteriods.create(xCoord, -40, randomasteriod);
    };

    const asteriodGenLoop = this.time.addEvent({
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

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new Enemy(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
        gameState.score += 20;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
      }
    });

    this.physics.add.collider(this.player, this.asteriods, (player) => {
      if (!player.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
      }

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
      asteriodGenLoop.destroy();
    });

    this.physics.add.collider(this.playerLasers, this.asteriods, (playerLaser, asteriod) => {
      asteriodGenLoop.destroy();
      playerLaser.destroy();
      asteriod.destroy();
      gameState.score += 5;
      gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }

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
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  gameScore() {
    return gameState.topScore;
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    this.bg.tilePositionY -= 0.3;

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (gameState.cursors.up.isDown) {
        this.player.moveUp();
      } else if (gameState.cursors.down.isDown) {
        this.player.moveDown();
      }

      if (gameState.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (gameState.cursors.right.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
