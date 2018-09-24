// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png'; //load the image of the enemies
    this.speed  = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x += this.speed * dt;
   if (this.x >= 505) {
     this.x = -100;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class Player {
  constructor(x,y) {
    this.sprite = 'images/char-boy.png'; //load the hero image
    this.x = x;
    this.y = y;
  }
  update(dt) {
    dt = 20;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(){

  }
};

// Initializing objects
let bug1 = new Enemy(10,145, 150);
let bug2 = new Enemy(10,230, 150);
let bug3 = new Enemy(10,60, 150);

let allEnemies = [bug1, bug2, bug3];
let player = new Player (203,405);


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
