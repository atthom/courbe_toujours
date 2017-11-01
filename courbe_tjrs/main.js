window.onload = function() {
    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    const gameWidth = 600;
    const gameHeight = 600;
    const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    const bombProbability = .99; // better stay between .990 and .995

    let player;
    let randomCol = getRandomColor();
    let texture;
    let controls;
    let graphics;
    let bomb;
    let score;
    let scoreText;

    function preload() {
        // si on a besoin de charger des images
        game.load.image('bomb', 'assets/bomb-mini.png');
        game.load.image('mine', 'assets/mine5.jpg');
    }

    function create() {
        createplayer();

        createMine(-40, -40);
        createMine(-40, 530);
        createMine(530, -40);
        createMine(530, 530);
        /*
                mine = game.add.sprite(-20, -20, 'mine');
                mine.scale.setTo(0.11, 0.11);
                mine2 = game.add.sprite(620, -20, 'mine');
                mine2.scale.setTo(0.11, 0.11);
                mine3 = game.add.sprite(0, -20, 'mine');
                mine3.scale.setTo(0.11, 0.11);
                mine4 = game.add.sprite(620, 620, 'mine');
                mine4.scale.setTo(0.11, 0.11);
        */
        init();
        // game.input.addMoveCallback(move, this); 
        controls = new Controls(game, player, texture, Phaser);
        graphics = game.add.graphics(game.world.centerX, game.world.centerY);
    }

    function init() {
        //affichage du score
        score = 0;
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#555' });
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    }

    function createMine(x, y) {
        //mine = game.add.graphics(220, 220);
        var mine = game.add.sprite(x, y, 'mine');
        mine.scale.setTo(0.15, 0.15);
    }


    function createplayer() {
        let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 15);
        texture = game.add.renderTexture(gameWidth, gameHeight, 'mousetrail');
        // création de la boule
        player = game.add.graphics(0, 0);
        player.beginFill(randomCol, 1);
        player.drawCircle(circle.x, circle.y, circle.diameter);
        game.add.sprite(0, 0, texture);
        player.anchor.setTo(0.5, 0.5);
        // on charge les physics arcades
        game.physics.arcade.enable(player);
        // si on touche les bords, on appelle la fonction 'playerOut'
        player.events.onOutOfBounds.add(playerOut, this);
        // on check si les bords sont atteints
        player.checkWorldBounds = true;
    }

    function render() {}

    function update() {
        texture.renderXY(player, player.x, player.y);
        addBomb();
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


    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
};