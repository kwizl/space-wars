import Entity from './Entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'player');

    this.setData('speed', 600);
    this.setData('stop', 0);
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

  moveStop() {
    this.body.velocity.x = this.getData('stop');
    this.body.velocity.y = this.getData('stop');
  }
}