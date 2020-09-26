import Entity from './Entity';

export default class Enemy extends Entity {
  constructor() {
    super(scene, x, y, key, 'Enemy');
    this.setData('speed', 200);
    this.play('enemy');
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }
  
  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }
  
  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }
  
  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
  }
}