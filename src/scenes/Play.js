class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load spritesheet
        this.load.spritesheet('explosion', './Assets/explosion.png', {frameWidth: 64, frameHeight: 32,
        startFrame: 0, endFrame: 9});
        this.load.spritesheet('airship', './Assets/airship.png', {frameWidth: 63, frameHeight: 32,
        startFrame: 0, endFrame: 9});
        this.load.spritesheet('jetship', './Assets/jetship.png', {frameWidth: 31, frameHeight: 16,
        startFrame: 0, endFrame: 7});
        // load images/tile sprites
        this.load.image('p1rocket', './assets/p1rocket.png');
        this.load.image('p2rocket', './assets/p2rocket.png');
        this.load.image('skyfield', './assets/skyfield.png');
        this.load.image('border', './assets/border.png');
    }

    create() {
        // place tile sprite
        this.skyfield = this.add.tileSprite(0, 0, 640, 480, 'skyfield').setOrigin(0, 0);
        // custom border
        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new p1Rocket(this, borderUISize*7, game.config.height - borderUISize - borderPadding, 'p1rocket').setOrigin(0.5, 0);
        // add rocket (p2)
        this.p2Rocket = new p2Rocket(this, borderUISize*14, game.config.height - borderUISize - borderPadding, 'p2rocket').setOrigin(0.5, 0);
        // add airships (x4)
        this.ship00 = new Jetship(this, game.config.width + borderUISize*9, borderUISize*4, 'jetship', 0, 50).setOrigin(0, 0);
        this.ship01 = new Airship(this, game.config.width + borderUISize*5, borderUISize*5 + borderPadding, 'airship', 0, 30).setOrigin(0,0);
        this.ship02 = new Airship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*2, 'airship', 0, 20).setOrigin(0,0);
        this.ship03 = new Airship(this, game.config.width + borderUISize, borderUISize*7 + borderPadding*3, 'airship', 0, 10).setOrigin(0,0);
        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'air_flight',
            frames: this.anims.generateFrameNumbers('airship', { start: 0, end: 7, first: 0}),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'jet_flight',
            frames: this.anims.generateFrameNumbers('jetship', { start: 0, end: 5, first: 0}),
            frameRate: 30,
            repeat: -1
        });
        // play animations for spaceships (x4)
        this.ship00.play("jet_flight")
        this.ship01.play("air_flight");
        this.ship02.play("air_flight");
        this.ship03.play("air_flight");
        // initialize scores
        this.p1Score = 0;
        this.p2Score = 0;
        // display scores
        let scoreConfig = {
        fontFamily: 'Verdana',
        fontSize: '28px',
        backgroundColor: 'white',
        color: 'black',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        right: 3,
        },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize*14 + borderPadding*5, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (T) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rockets (x2)
            this.p2Rocket.update();
            this.ship00.update();           // update airships (x4)
            this.ship01.update();           
            this.ship02.update();
            this.ship03.update();
        } 

        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipP1Explode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipP1Explode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipP1Explode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship00)) {
            this.p1Rocket.reset();
            this.shipP1Explode(this.ship00);
        }

        // check collisions for p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipP2Explode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipP2Explode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipP2Explode(this.ship01);
        }
        if (this.checkCollision(this.p2Rocket, this.ship00)) {
            this.p2Rocket.reset();
            this.shipP2Explode(this.ship00);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipP1Explode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); 
    }
    shipP2Explode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion'); 
    }
}