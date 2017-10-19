window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    const game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    let player;
    let cursors;
    let randomCol = getRandomColor();
    let texture;

    function preload() {
        // si on a besoin de charger des images
    }

    function create() {
        let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 15);
        texture = game.add.renderTexture(600, 600, 'mousetrail');
        // création de la boule
        player = game.add.graphics(0, 0);
        player.beginFill(randomCol, 1);
        player.drawCircle(circle.x, circle.y, circle.diameter);
        game.add.sprite(0, 0, texture);
        player.anchor.setTo(0.5, 0.5);

        // on charge les physics arcades
        game.physics.arcade.enable(player);
        // on check si les bords sont atteints
        player.checkWorldBounds = true;
        // si on touche les bords, on appelle la fonction 'playerOut'
        player.events.onOutOfBounds.add(playerOut, this);

        // on charge les controles au clavier
        cursors = game.input.keyboard.createCursorKeys();

        // on charge les controles au clavier
        cursors = game.input.keyboard.createCursorKeys();
        // game.input.addMoveCallback(move, this); 

        controls = Controls(game, player, Phaser);
    }

    function render() {}

    function update() {
        //  Reset the players velocity (movement)
        // controls claviers
        //keyboard_control();       
        // console.log(player.x, player.y);
        //  only move when you click
        keyboard_control2();
    }

    function playerOut() {
        // pour voir ou est le joueur
        console.log(player.x, player.y);
        // pour téléporter le joueur de l'autre coté de l'écran si il sort
        if (Math.abs(player.x) > 300)
            player.reset(player.x * -1, player.y);

        if (Math.abs(player.y) > 300)
            player.reset(player.x, player.y * -1);
    }

    function getRandomColor() {
        const chars = '0123456789ABCDEF';
        let length = 6;
        let hex = '0x';
        while (length--) hex += chars[(Math.random() * 16) | 0];
        return hex;
    }
};