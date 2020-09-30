import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 33 },
      enableBody: true,
    },
  },
  dom: {
    createContainer: true
  },
};
