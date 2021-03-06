window.onload = function() {
    const gameWidth = 600;
    const gameHeight = 600;
    const bombProbability = .99; // better stay between .990 and .995

    let randomCol = getRandomColor();
    let bomb;
    let bombs = [];
    let score;
    let scoreText;

    var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'game', { preload: preload, create: create, init: init, update: update, render: render });

    function preload() {
        game.load.image('bomb', 'assets/bomb-mini.png');
        game.load.image('ball', 'assets/circle.png');
        game.load.image('ball3', 'assets/circle3.png');
        game.load.image('head', 'assets/head.png');
    }

    var snakeHead; // Snake's head
    var snakeSection = new Array(); // Snake's tail
    var snakePath = new Array(); // Snake's dots' position
    var numSnakeSections = 25; // Number of snakeSection (without head)
    var snakeSpacer = 3; // Space between snakeSections

    var current_size = 1;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, gameWidth, gameHeight);

        cursors = game.input.keyboard.createCursorKeys();

        // snakeHead = game.add.sprite(gameWidth / 2, gameHeight / 2, 'ball3');
        snakeHead = game.add.sprite(gameWidth / 2, gameHeight / 2, 'head');
        snakeHead.scale.setTo(0.06, 0.06);
        snakeHead.anchor.setTo(0.5, 0.5);
        game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

        let i;
        for (i = 1; i <= numSnakeSections - 1; i++) {
            snakeSection[i] = game.add.sprite(gameWidth / 2, gameHeight / 2, 'ball3');
            snakeSection[i].scale.setTo(0.105, 0.105);
            snakeSection[i].anchor.setTo(0.5, 0.5);
        }

        for (i = 0; i <= numSnakeSections * snakeSpacer; i++) {
            snakePath[i] = new Phaser.Point(gameWidth / 2, gameHeight / 2);
        }

    }

    function init() {
        // Display score
        score = 0;
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#555' });
    }

    function update() {
        addBomb();
        checkCollisions();
        updateScore();
        snake_angularVelocity();

    }

    function snake_angularVelocity() {

        snakeHead.body.velocity.setTo(0, 0);
        snakeHead.body.angularVelocity = 0;
        snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));
        var part = snakePath.pop();
        part.setTo(snakeHead.x, snakeHead.y);
        snakePath.unshift(part);
        for (var i = 1; i <= numSnakeSections - 1; i++) {
            snakeSection[i].x = (snakePath[i * snakeSpacer]).x;
            snakeSection[i].y = (snakePath[i * snakeSpacer]).y;
        }

        if (cursors.left.isDown) {
            snakeHead.body.angularVelocity = -300;
        } else if (cursors.right.isDown) {
            snakeHead.body.angularVelocity = 300;
        }

    }

    function render() {}

    function getSnakeHeadCenter() {}

    function checkCollisions() {
        if (isCollision()) {
            gameOver();
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
        score += .01;
        afficherScore();
    }

    function afficherScore() {
        scoreText.text = 'Score: ' + parseInt(score);
    }

    function addBomb() {
        if (Math.random() > bombProbability) {
            let x = Math.floor(Math.random() * gameWidth);
            let y = Math.floor(Math.random() * gameHeight);
            if (distance(x, y, snakeHead.x, snakeHead.y) > 50) {
                bomb = game.add.sprite(x, y, 'bomb');
                bomb.anchor.setTo(0.5, 0.5);
                bombs.push(bomb);
            }
        }
    }


    function isCollision() {
        let b, s;
        // On est d'accord c'est le truc le moins opti ever
        // Lel

        // Map
        if (snakeHead.x < 0 || snakeHead.x > gameWidth || snakeHead.y < 0 || snakeHead.y > gameHeight)
            playerOut();

        // Bombs
        for (let i = 0; i < bombs.length; i++) {
            b = bombs[i];
            if (distance(b.x, b.y, snakeHead.x, snakeHead.y) <= 28) {
                return true;
            }
        }

        // Own Tail
        if (score < 1) return false;

        for (let i = 16; i < snakeSection.length; i++) {
            s = snakeSection[i];
            if (distance(s.x, s.y, snakeHead.x, snakeHead.y) < 15) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        game.paused = true;

        if (score < 5) {
            confirm('Oh non :( Tu as perdu !\nTu as fais ' + parseInt(score) + ' points, tu dois être DeViNT');
        } else if (score < 10) {
            confirm('Oh non :(\n Tu as perdu !\nMais tu as fais ' + parseInt(score) + ' points,\ntu peux faire mieux =)');
        } else {
            confirm('Oh non :(\n Tu as perdu !\nMais tu as fais ' + parseInt(score) + ' points,\ntu dois être très fort');
        }
        location.reload();
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function playerOut() {
        if (snakeHead.x > gameWidth) {
            snakeHead.reset(0, snakeHead.y);
        }
        if (snakeHead.x < 0) {
            snakeHead.reset(gameWidth, snakeHead.y);
        }
        if (snakeHead.y > gameHeight) {
            snakeHead.reset(snakeHead.x, 0);
        }
        if (snakeHead.y < 0) {
            snakeHead.reset(snakeHead.x, gameHeight);
        }
    }
}