# SPACE WARS

A javascript arcade space-shooter made on Phaser 3.

![game demo](/assets/jsAsteroidsDemo.gif)

# Live version
You can find a live version of the game [here](https://js-asteroids.netlify.app/)

## Overview
Space Wars is a real-time shooting game with an overhead view. The objective of the game is to destroy as many asteroids as possible without getting hit by debris, or crashing into obstacles.

The ship is controlled by thrusting forwards or backward, and turning the ship left or right with either the WASD or cursor keys. The player can also shoot lasers at asteroids or debris by pressing the spacebar.

## Design overview

The initial design for the game was much more focused on the shooting mechanics, rather than the handling and maneuvering of the ship. It was initially planned to include features such as enemy ships and player powerups scattered throughout the map that would, for instance, speed up the player's spaceship or enhance its projectiles. However, after starting to implement the basic functionality for player movement, it became apparent that the movement itself and the handling of the ship introduced its own layer of difficulty to the game, and adding enemy spaceships would make the game too difficult and frustrating for the player.

### Obstacles
And so, the design shifter in favor of obstacles being the main difficulty the player would have to overcome. The initial design only contemplated having static asteroids as obstacles. After a few iterations on this initial design, it was decided to make asteroids a bit less static by imprinting a very subtle initial speed they're created, that that they would wander around the map and incentivize the player to also move around the map.
This addition worked out well in incentivizing the player to move around the map, but the gameplay still felt too easy and simple. Another layer or difficulty was required. To this end, asteroids were modified so that when the player shot them, four pieces of debris would fly out in different directions at relatively high speeds, giving the player another reason to keep moving.

### Future additions
At this point the game is in a playable state, which does not mean it's in its final state. Some of the initial designs are still being considered for implementation.
One such example is player powerups. They could introduce a way of keeping the base gameplay loop of becoming stale too quickly, and it would be a fun way to introduce some variance in player experience. Enemy ships are not being considered at the moment.

### Feedback
If you'd like to see a new feature introduced to the game, or if you feel like the game is not fun or rewarding enough, please provide such feedback through the issues page for this project, or through the social media accounts linked at the bottom of this file. Any feedback would be greatly appreciated, as the objective of the project is to make this game as fun as it can be for as many people as possible.

## Running the game
You can always run the game through the live version linked on a previous section. But if you'd like to run the game locally, follow the instructions below:

### Getting the files
First, you need to have the files on your computer. You can get them by either cloning this repository, or downloading its contents directly
- To clone the repository, go on the project's [Github page](https://github.com/ivanid22/js-spaceships/tree/game), click on "Clone or download", copy the contents of the text box, and then run `git clone "repo"` on the command line, where "repo" is the text you just copied.
- If you want to download it directly instead, go on the project's [Github page](https://github.com/ivanid22/js-spaceships/tree/game), click on "Clone or download", and then on "Download ZIP". After this, you need to extract the contents of the zip file on your computer.

### Installing dependencies
Now you need to open a terminal and navigate to the project's directory. Once there, run the command `npm install`. This is going to fetch and install all the dependencies for the game. 

### Running the game
Once that's done, run the command 
`npm run start`. That should open a new browser window with the game. If the browser does not open, do it manually, paste this on the url box: `localhost:8080`, and press enter.

## Requirements
- Node.js v14.12.0
- npm 6.14.8

## Acknowledgements and credits
This game uses 100% free and open assets thanks to the community over at [OpenGameArt](https://opengameart.org/). Here are the authors of the assets used in this game:

- [Jan125](https://opengameart.org/users/jan125), Game music.
- [Tatermand](https://opengameart.org/users/tatermand), Game sprites and background
- [Bleed](https://opengameart.org/users/bleed), Explosion animation.
- [Rawdanitsu](https://opengameart.org/users/rawdanitsu), Laser sprite.

## Author

👤 **Martin Njoroge**

- Github: [@kwizl](https://github.com/kwizl)
- Twitter: [@NjoroKaris](https://twitter.com/NjoroKaris)
- Linkedin: [Martin Njoroge](https://www.linkedin.com/in/martin-kariuki-njoroge/)

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](issues/).