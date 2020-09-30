import Phaser from 'phaser';
import config from '../Config/config';

export default class NameScene extends Phaser.Scene {
  constructor() {
    super('Name');
  }

  preload() {
    this.load.html('nameform', 'assets/form.html');
  }

  create() {
    this.add.text(210, 100, 'You are one of the Top 5 Players', {
      color: 'white',
      fontSize: '26px ',
    });

    const text = this.add.text(300, 130, 'Please Enter Name', {
      color: 'white',
      fontSize: '22px ',
    });

    const width = config.width / 2;
    const height = config.height / 2;

    const element = this.add.dom(width, height).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {
      if (event.target.name === 'btnSubmit') {
        const playerName = this.getChildByName('name');

        if (playerName.value !== '') {
          this.removeListener('click');
          this.scene.sys.scenePlugin.start('Title');
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });
  }
}