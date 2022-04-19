let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyR, keyT, keyLEFT, keyUP, keyRIGHT, keyA, keyW, keyD;

// Jacob Phung 
// Airship Patrol (Rocket Patrol Mod)
// 4/18/2022
// 20 - 25 hours

// Allow the player to control the Rocket after it's fired (5)
//      The player can move the Rocket left and right.

// Replace the UI borders with new artwork (10)
//      The UI has been replaced with a custom border.
// Create a new animated sprite for the Spaceship enemies (10)
//      The enemies are animated through the movement of their propellors. I think this should be separate from the
//      "Create new artwork for all of the in-game assets" because the Spaceship enemies are specifically animated
//      rather than just receiving new static artwork.
// Create a new title screen (e.g., new artwork, typography, layout) (10)
//      The title screen has been changed with a custom title and background, along with some layout and font changes.

// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//      A smaller enemy has been added that's faster and awards 50 points.
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
//      The rocket, spaceship, and explosion have all been replaced with new artwork.

// Implement a simultaneous two-player mode (30)
//      There are two rockets that can be controlled by a Player One or a Player Two (or by one person controlling two players).
//      Both players have their own respective scores at the top of the screen and their own colors (P1 is blue and P2 is purple).

// 105 points total