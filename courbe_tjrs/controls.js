class Controls {
    constructor(game, player, texture, Phaser) {
        this.game = game;
        this.texture = texture;
        this.player = player;
        this.Phaser = Phaser;
        // on charge les controles au clavier
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.zqsd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
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

    /*
    gamepad_control() {
        // Pad "connected or not" indicator
        if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected)
            indicator.animations.frame = 0;
        else
            indicator.animations.frame = 1;

        // Controls
        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
            sprite.x--;
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
            sprite.x++;

        if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
            sprite.y--;
        else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
            sprite.y++;

        if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
            sprite.angle += 5;

        if (pad1.justReleased(Phaser.Gamepad.XBOX360_B)) {
            sprite.scale.x += 0.01;
            sprite.scale.y = sprite.scale.x;
        }

        if (pad1.connected) {
            var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
            var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

            if (rightStickX)
                sprite.x += rightStickX * 10;

            if (rightStickY)
                sprite.y += rightStickY * 10;
        }
    }
    */
}