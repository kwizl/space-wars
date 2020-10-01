import Phaser from 'phaser';
import Laser from './Laser';

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      classType: Laser,
      frameQuantity: 10000,
      active: false,
      visible: false,
      key: 'player_laser',
    });
  }

  fireLaser(x, y) {
    const laser = this.getFirstDead(true);

    if (laser) {
      laser.fire(x, y);
    }
  }
}