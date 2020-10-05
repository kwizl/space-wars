import Phaser from 'phaser';
import Entity from './Entity';

export default class Asteroid extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'asteriod', 'Asteroid');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}