window.onload = function() {
    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    const gameWidth = 600;
    const gameHeight = 600;
    const bombProbability = .99; // better stay between .990 and .995

    let player;
    let randomCol = getRandomColor();
    let texture;
    let controls;
    let graphics;
    let bomb;
    let bombs = [];
    let score;
    let scoreText;

//******************************************************************

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, init: init, update: update,render : render });

function preload() {
    game.load.image('bomb', 'assets/bomb-mini.png');    
    game.load.image('ball', 'assets/circle.png');

}

var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 25; //number of snake body sections
var snakeSpacer = 4; //parameter that sets the spacing between sections

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, gameWidth, gameHeight);

    cursors = game.input.keyboard.createCursorKeys();

    snakeHead = game.add.sprite(gameWidth / 2, gameHeight / 2, 'ball');
    snakeHead.anchor.setTo(0.5, 0.5);
    game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

    //  Init snakeSection array
    for (var i = 1; i <= numSnakeSections-1; i++)
    {
        snakeSection[i] = game.add.sprite(gameWidth / 2, gameHeight / 2, 'ball');
        snakeSection[i].anchor.setTo(0.5, 0.5);
    }
    
    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections * snakeSpacer; i++)
    {
        snakePath[i] = new Phaser.Point(gameWidth / 2, gameHeight / 2);
    }

}

function init() {
    //affichage du score
    score = 0;
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#555' });

}

function update() {  
    addBomb();
    if (isCollision()) {
        gameOver();
    }
    score += 0.01;
    afficherScore()
    
    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;

    if (true/*cursors.up.isDown*/) {
        snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));
        var part = snakePath.pop();
        part.setTo(snakeHead.x, snakeHead.y);
        snakePath.unshift(part);
        for (var i = 1 ; i <= numSnakeSections - 1 ; i++) {
            snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
            snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
        }
    }

    if (cursors.left.isDown) {
        snakeHead.body.angularVelocity = -300;
    } else if (cursors.right.isDown) {
        snakeHead.body.angularVelocity = 300;
    }

}

function render() {
    //game.debug.spriteInfo(snakeHead, 32, 32);
}
//******************************************************************
   
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
            let x = Math.floor(Math.random() * gameWidth) ;
            let y = Math.floor(Math.random() * gameHeight) ;
            //console.debug("player: " + player.x + " " + player.y + "\nbomb: " + x + " " + y);
            //console.debug("dist: " + distance(x, y, player.x, player.y));
            //TODO: center, not right corner 
            if (distance(x, y, snakeHead.x, snakeHead.y) > 26) {
                console.log("NEW BOMB : [" + x + ", " + y + "]");
                bomb = game.add.sprite(x, y, 'bomb');
                bombs.push([x, y]);
            }
        }
    }

    function isCollision() {
        let b, s;
        // On est d'accord c'est le truc le moins opti ever

        // Map
        if (snakeHead.x < 0 || snakeHead.x > gameWidth || snakeHead.y < 0 || snakeHead.y > gameHeight)
            return true;

        // Bombs
        for (let i = 0 ; i < bombs.length ; i++) {
            b = bombs[i];
            //console.log(distance(b[0], b[1], player.x, player.y));
            if (distance(b[0], b[1], snakeHead.x, snakeHead.y) < 15) {
                return true;
            }
        }

        // Own Tail
        if (score < 1) return false;
        for (let i = 16 ; i < snakeSection.length ; i++) {
            s = snakeSection[i];
            //console.log(distance(b[0], b[1], player.x, player.y));
            if (distance(s.x, s.y, snakeHead.x, snakeHead.y) < 15) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        confirm('Lol you lost with ' + parseInt(score) + ' pts\n\nnoob go play candy crush');
        location.reload();
    }


    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}
/*
    function preload() {
        // si on a besoin de charger des images
        game.load.image('bomb', 'assets/bomb-mini.png');
        game.load.image('mine', 'assets/mine5.jpg');
    }

    function create() {
        createplayer();x

        createMine(-40, -40);
        createMine(-40, 530);
        createMine(530, -40);
        createMine(530, 530);

        init();
    }

    function init() {
        //affichage du score
        score = 0;
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#555' });
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        // add controls
        controls = new Controls(game, player, texture, Phaser);
    }

    function createMine(x, y) {
        var mine = game.add.sprite(x, y, 'mine');
        mine.scale.setTo(0.15, 0.15);
    }


    function createplayer() {
        let circle = new Phaser.Circle(0, 0, 15);
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
        if (!isCollision()) {
            gameOver();
        }
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

    function afficherScore() {
        scoreText.text = 'Score: ' + parseInt(score);
    }


    function addBomb() {
        if (Math.random() > 0) {
            let x = Math.floor(Math.random() * gameWidth) ;
            let y = Math.floor(Math.random() * gameHeight) ;
            //console.debug("player: " + player.x + " " + player.y + "\nbomb: " + x + " " + y);
            //console.debug("dist: " + distance(x, y, player.x, player.y));
            if (distance(x, y, player.x, player.y) > 100) {
                console.log("NEW BOMB : [" + x + ", " + y + "]");
                bomb = game.add.sprite(x, y, 'bomb');
                bombs.push([x, y]);
            }
        }
    }

    function isCollision() {
        let b;
       
        // On est d'accord c'est le truc le moins opti ever
        for (let i = 0 ; i < bombs.length ; i++) {
            b = bombs[i];
            //console.log(distance(b[0], b[1], player.x, player.y));
            if (distance(b[0], b[1], player.x, player.y) < 8) {
                return false;
            }
        }
        return true;
    }

    function gameOver() {
        alert('You lost lol noob go play candy crush');
    }


    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
};
*/