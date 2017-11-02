window.onload = function() {
    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.
    const gameWidth = 600;
    const gameHeight = 600;
    const bombProbability = .99; // better stay between .990 and .995
    const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    let player;
    let randomCol = getRandomColor();
    let texture;
    let controls;
    let graphics;
    let bomb;
    var score;
    //let scoreText;

    function preload() {
        // si on a besoin de charger des images
        game.load.image('bomb', 'assets/bomb-mini.png');
    }

    function create() {
        createplayer();
        init();
        controls = new Controls(game, player, texture, Phaser);
    }

    function init() {
        texture = game.add.renderTexture(gameWidth, gameHeight, 'mousetrail');
        game.add.sprite(0, 0, texture);
        //affichage du score

        score = 0;
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#555' });
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
    }

    function createplayer() {
        let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 15);
        // création de la boule
        player = game.add.graphics(0, 0);
        player.beginFill(randomCol, 1);
        player.drawCircle(circle.x, circle.y, circle.diameter);
        player.boundsPadding = 0;

        game.physics.arcade.enable(player);
        player.anchor.setTo(0.5, 0.5);
        // on charge les physics arcades
        // si on touche les bords, on appelle la fonction 'playerOut'
        player.events.onOutOfBounds.add(playerOut, this);
        // on check si les bords sont atteints
        player.checkWorldBounds = true;
    }

    function render() {}

    function update() {
        texture.renderXY(player, player.x, player.y);
        addBomb();
        updateScore();

        //  Reset the players velocity (movement)
        // controls claviers
        //keyboard_control();       
        // console.log(player.x, player.y);
        //  only move when you click
        controls.control("keyboard");
    }

    function collisionHandler(obj1, obj2) {
        theEnd();
    }

    function theEnd() {
        game.stage.backgroundColor = '#992d2d';
        console.log("It is the end, my dudes");
    }

    function playerOut() {
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

    function updateScore() {
        score += 0.1;
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