# SPACE WARS

Space Wars is a javascript arcade space-shooter made using the Phaser 3 Framework.


# Live version
Live version of the game [here](https://kwizl.github.io/space-shooter/)

## Overview
The goal of the game is to destroy as man enemies and asteroids as possible without getting killed. When the player shots an enemy they get 20 points on their score while shooting and asteroid is 5 points. You can control the spaceship is controlled by moving the arrow keys up, down, right and left to move as desired. To shot the lasers at the enmeies or asteroids press the keyboard key F.

## Design overview

The initial design for the game was meant to be a much more manuevering game while shooting. The movement of the player spaceship, enemy spaceship and the asteroids had to be restrained to the y-axis since having them move across the screen became would bring alot of complexity to the player experience.

### Obstacles
The obstacles that the player has to encounter are the enemy spaceships and the asteroids. The asteroids and the spaceships fall across the screen towards the player. The player has to destroy them by firing lasers or avoid getting hit by them. Initially the rocks were meant to be moving haphazardly across the screen. This proved to be too complicated and the time wasn't enough. I was able to implement the rocks to fall from the top of the screen.

### Future additions
Future additions may include addition of game levels with the player fighting the main enemy at the end of each level. There would also be a choice in the options scene for setting the level of defficulty for the game.

### Feedback
If there is a new feature that you feel should be incoperated into the game, you can reach me via the contacts below.

#### Get a local copy
Now you need a copy of this application, if you are using Git, enter the following commands:
```js
git clone git@github.com:kwizl/space-shooter.git
```
Otherwise just hit (Download Zip) on green button (Clone or Download) at top of this page.

#### Run App

In order to run the App on your browser:
- Open your command prompt or terminal and navigate inside the downloaded project
- Type in the terminal `npm install`
- Type in the terminal `npx webpack` or `npx webpack --watch`
- Open the `index.html` in the dist folder on your Browser.`

## Requirements
- Node.js v14.12.0
- npm 6.14.8

## Acknowledgements and credits
This game uses 100% free and open assets thanks to the community over at **OpenGameArt** and **Unity Store**. Here are the authors of the assets used in this game:

- [Unity Store](), Game music.
- [para](https://opengameart.org/content/low-poly-rocks), Asteroid
- [Bleed](https://opengameart.org/users/bleed), Explosion animation.
- [Rawdanitsu](https://opengameart.org/users/rawdanitsu), Laser sprite.
- [MillionthVector](https://opengameart.org/content/set-faction5-spaceships)

## Author

👤 **Martin Njoroge**

- Github: [@kwizl](https://github.com/kwizl)
- Twitter: [@NjoroKaris](https://twitter.com/NjoroKaris)
- Linkedin: [Martin Njoroge](https://www.linkedin.com/in/martin-kariuki-njoroge/)

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](issues/).
