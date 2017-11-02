class Controls {
    constructor(game, player, texture, Phaser, pad) {
        this.game = game;
        this.texture = texture;
        this.player = player;
        this.Phaser = Phaser;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        // on charge les controles au clavier
        this.zqsd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        // add controls
        this.game.input.gamepad.start();
        this.pad = this.game.input.gamepad.pad1;
    }

    control(name) {
        if (name == "mouse") {
            this.mouse_control();
        } else if (name == "keyboard") {
            this.keyboard_control();
        } else if (name == "gamepad") {
            this.gamepad_control();
        }
    }

    mouse_control() {
        if (this.game.input.mousePointer.isDown) {
            //  400 is the speed it will move towards the mouse
            this.game.physics.arcade.moveToPointer(this.player, 400);
            //  if it's overlapping the mouse, don't move any more
            if (this.Phaser.Rectangle.contains(this.player.body, this.game.input.x, this.game.input.y)) {
                this.player.body.velocity.setTo(0, 0);
            }
        } else {
            this.player.body.velocity.setTo(0, 0);
        }
    }

    move(pointer, x, y, click) {
        //  If the cursor is locked to the game, and the callback was not fired from a 'click' event
        //  (such as a mouse click or touch down) - as then it might contain incorrect movement values
        while (click) {
            this.player.x += this.game.input.mouse.event.movementX;
            this.player.y += this.game.input.mouse.event.movementY;
        }
    }

    keyboard_control2() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.body.angularVelocity = 0;

        if (this.game.input.keyboard.isDown(this.Phaser.Keyboard.LEFT)) {
            this.player.body.angularVelocity = -10;
            this.player.body.angularAcceleration -= 10;
        } else if (this.game.input.keyboard.isDown(this.Phaser.Keyboard.RIGHT)) {
            this.player.body.angularVelocity = 10;
            this.player.body.angularAcceleration += 10;
        }
        if (this.game.input.keyboard.isDown(this.Phaser.Keyboard.UP)) {
            this.game.physics.arcade.velocityFromAngle(this.player.angle, 100, this.player.body.velocity);
        }
    }

    keyboard_control() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown || this.zqsd.left.isDown)
            this.player.body.velocity.x = -150;

        if (this.cursors.right.isDown || this.zqsd.right.isDown)
            this.player.body.velocity.x = 150;

        if (this.cursors.up.isDown || this.zqsd.up.isDown)
            this.player.body.velocity.y = -150;

        if (this.cursors.down.isDown || this.zqsd.down.isDown)
            this.player.body.velocity.y = 150;
    }

    gamepad_control() {
        var leftStickX = this.pad.axis(this.Phaser.Gamepad.XBOX360_STICK_LEFT_X);
        var leftStickY = this.pad.axis(this.Phaser.Gamepad.XBOX360_STICK_LEFT_Y);

        if (this.pad.connected) {
            if (leftStickX)
                this.player.x += leftStickX * 7;
            if (leftStickY)
                this.player.y += leftStickY * 7;
        }
    }

}