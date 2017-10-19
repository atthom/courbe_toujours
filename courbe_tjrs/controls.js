class Controls {
    constructor(game, player, Phaser) {
        this.game = game;
        this.player = player;
        this.Phaser = Phaser
    }

    mouse_control() {
        if (game.input.mousePointer.isDown) {
            //  400 is the speed it will move towards the mouse
            game.physics.arcade.moveToPointer(player, 400);

            //  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
                player.body.velocity.setTo(0, 0);
            }
        } else {
            player.body.velocity.setTo(0, 0);
        }
    }

    move(pointer, x, y, click) {

        //  If the cursor is locked to the game, and the callback was not fired from a 'click' event
        //  (such as a mouse click or touch down) - as then it might contain incorrect movement values
        while (click) {
            player.x += game.input.mouse.event.movementX;
            player.y += game.input.mouse.event.movementY;
        }
    }

    keyboard_control2() {
        texture.renderXY(player, player.x, player.y);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.angularVelocity = 0;

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            player.body.angularVelocity = -10;
            player.body.angularAcceleration -= 10;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            player.body.angularVelocity = 10;
            player.body.angularAcceleration += 10;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            game.physics.arcade.velocityFromAngle(player.angle, 100, player.body.velocity);
        }
    }

    keyboard_control() {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown)
            player.body.velocity.x = -150;

        if (cursors.right.isDown)
            player.body.velocity.x = 150;

        if (cursors.up.isDown)
            player.body.velocity.y = -150;

        if (cursors.down.isDown)
            player.body.velocity.y = 150;
    }


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
}