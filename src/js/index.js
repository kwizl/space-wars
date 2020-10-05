import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import HelpScene from './Scenes/HelpScene';
import CreditsScene from './Scenes/CreditsScene';
import ScoreScene from './Scenes/ScoreScene';
import NameScene from './Scenes/NameScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Help', HelpScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Score', ScoreScene);
    this.scene.add('Name', NameScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

const input = document.createElement('input');
const canvas = document.getElementById('canvas');
input.classList.add('hidden');
input.id = 'name';
input.setAttribute('type', 'text');
input.placeholder = 'Name';
canvas.appendChild(input);

window.game = new Game();