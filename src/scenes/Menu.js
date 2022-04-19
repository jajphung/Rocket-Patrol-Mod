class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        // load images/tile sprites
        this.load.image('title', './assets/title.png');
        this.load.image('bigcloud', './assets/bigcloud.png');
        this.load.image('mediumcloud', './assets/mediumcloud.png');
        this.load.image('smallcloud', './assets/smallcloud.png');
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xb3e0ff).setOrigin(0, 0);
        // place tile sprite
        this.bigcloud = this.add.tileSprite(0, 0, 640, 480, 'bigcloud').setOrigin(0, 0);
        this.mediumcloud = this.add.tileSprite(0, 0, 640, 480, 'mediumcloud').setOrigin(0, 0);
        this.smallcloud = this.add.tileSprite(0, 0, 640, 480, 'smallcloud').setOrigin(0, 0);
        this.skyfield = this.add.tileSprite(0, -60, 640, 480, 'title').setOrigin(0, 0);
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '20px',
            color: 'black',
            backgroundColor: 'white',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3,
        'Player 1: (A) and (D) to move / (W) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundcolor = 'white';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding,
        'Player 2: <- and -> to move / (up arrow) to fire',
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5 + borderPadding*2,
        'Press (R) for Novice or (T) for Expert',
        menuConfig).setOrigin(0.5);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
          // easy mode
          game.settings = {
            airshipSpeed: 3,
            jetshipSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
          // hard mode
          game.settings = {
            airshipSpeed: 4,
            jetshipSpeed: 6,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}