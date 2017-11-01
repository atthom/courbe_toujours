window.onload = function() {
    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    const gameWidth = 625;
    const gameHeight = 625;
    const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    const bombProbability = .99; // better stay between .990 and .995

    let player;
    let cursors;
    let randomCol = getRandomColor();
    let texture;
    let controls;
    let graphics;
    let bomb;
    let score;
    let scoreText;

    function preload() {
        // si on a besoin de charger des images
        //game.load.image('bomb', 'assets/bomb-mini.png');
    }

    function create() {
        let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 15);
        texture = game.add.renderTexture(gameWidth, gameHeight, 'mousetrail');
        //affichage du score
        score = 0;
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#555' });
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
        // game.input.addMoveCallback(move, this); 
        controls = new Controls(game, player, texture, Phaser, cursors);
        graphics = game.add.graphics(game.world.centerX, game.world.centerY);

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    }

    function render() {}

    function update() {
        texture.renderXY(player, player.x, player.y);
        //addBomb();
        score += 0.01;
        afficherScore();
        //  Reset the players velocity (movement)
        // controls claviers
        //keyboard_control();       
        // console.log(player.x, player.y);
        //  only move when you click
        controls.keyboard_control();
    }

    function playerOut() {
        // pour voir ou est le joueur
        console.log(player.x, player.y);
        // pour téléporter le joueur de l'autre coté de l'écran si il sort
        if (Math.abs(player.x) > gameWidth / 2) {
            player.reset(player.x * -1, player.y);
        }
        if (Math.abs(player.y) > gameHeight / 2) {
            player.reset(player.x, player.y * -1);
        }
    }

    function getRandomColor() {
        const chars = '0123456789ABCDEF';
        let length = 6;
        let hex = '0x';
        while (length--) hex += chars[(Math.random() * 16) | 0];
        return hex;
    }

    function afficherScore() {
        scoreText.text = 'Score: ' + parseInt(score);
    }

    /*
    function addBomb() {
        if (Math.random() > bombProbability) {
            const x = Math.floor(Math.random() * gameWidth) - gameWidth / 2;
            const y = Math.floor(Math.random() * gameHeight) - gameHeight / 2;
            console.debug("player: " + player.x + " " + player.y + "\nbomb: " + x + " " + y);
            console.debug("dist: " + distance(x, y, player.x, player.y));
            if (distance(x, y, player.x, player.y) > 100) {
                bomb = game.add.sprite(x, y, 'bomb');
            }
        }
    }
    */

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
};