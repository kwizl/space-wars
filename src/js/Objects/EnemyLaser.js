import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_laser');
    this.body.velocity.y = 200;
  }
}