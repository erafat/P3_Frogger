// Set up essential variables
var positionX = [0,100,200,300,400];
var positionY = [60, 143, 226, 309, 392];
var score = 0;
var life = 5;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Enemy has three parameters, which is different for every new instance.
    this.x=x;
    this.y=y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If bug is crawling on the battlefield, then keep crawling;
    // when they hit the other side, set them back to the left side
    // of the battlefield and give them random location behind the
    // scene.
    if(this.x < 505) {
        this.x += (this.speed * dt + score);
    } else {
        this.x = Math.floor((Math.random() * -300) -100);
        this.y = positionY[Math.floor(Math.random() * 3)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class which the user controls
var Player=function(x,y) {
    // Array of Characters
    var charactors = ['images/char-cat-girl.png', 'images/char-horn-girl.png', 
        'images/char-pink-girl.png', 'images/char-boy.png', 'images/char-princess-girl.png'];

    // The image/sprite for our player, this uses
    // a helper Udacity provided to easily load images
    // and picks random image from charactor array
    this.sprite = charactors[Math.floor(Math.random()* charactors.length)];

    // Player has two parameters, along with it's score and life property
    this.x = x;
    this.y = y;
    this.life = life;
    this.score = score;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.getElementById('score').innerHTML = score;
    document.getElementById('life').innerHTML = life;
};

// Move it!
Player.prototype.handleInput = function(key){
    if(key =='left'){
        this.x -= 100;
    }

    else if(key == 'up'){
        this.y -= 83;
    }

    else if(key == 'right'){
        this.x += 100;
    }

    else if(key == 'down'){
        this.y += 83;
    }
};

Player.prototype.update = function(){

    // Score 1 when hit the water.
    if(this.y < 1){
        this.reset();
        score += 1;
    }
    // No more move down
    else if(this.y > 400){
            this.y -= 83;
         }
    // No more move left
    else if(this.x < 0){
            this.x += 100;
         }
    // No more move right
    else if(this.x > 400){
            this.x -= 100;
         }

    // Collision Detect
    // Axis-Aligned Bounding Box
    for(var i = 0; i < allEnemies.length; i++){
        if (
            this.x < allEnemies[i].x + 76 &&
            this.x + 76 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 80 &&
            this.y + 80 > allEnemies[i].y) {
            this.reset();
            life -= 1;
        }
    }

    // Update Score
    document.getElementById('score').innerHTML = score;
    // Update Life
    document.getElementById('life').innerHTML = life;
    // Implement gameover if life is over
    gameover();
};

// Reset player's position randomly.
Player.prototype.reset= function(){
    this.x = positionX[Math.floor(Math.random() * 5)];
    this.y = positionY[Math.floor(Math.random() * 2) + 3];
};


// Create those annoying bugs
var allEnemies=[];

var creatBugs = function(){
    var bugsNum = Math.floor((Math.random() * 6) + 4);
    for (i = 0; i < bugsNum; i++) {
        var enemy = new Enemy();
        enemy.x = Math.floor((Math.random() * -300) -100);
        enemy.y = positionY[Math.floor(Math.random() * 3)];
        enemy.speed = Math.floor((Math.random() * 51) + 40);
        allEnemies.push(enemy);
    }
};

creatBugs();

// Randomly create a player.
var player = new Player(positionX[Math.floor(Math.random() * 5)], positionY[Math.floor(Math.random() * 2) + 3]);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Gameover when it should
var gameover = function(){
    if (life === 0) {
        alert("Game Over!")
        document.location.reload();
    }
};

