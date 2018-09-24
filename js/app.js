//Saving variables globally
var lvlNum = 0; //Current level

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

    //Constantly move enemies and reset their possition when they move out of canvas
   this.x += this.speed * dt;
   if (this.x >= 505) {
     this.x = -100;
   }

   //Cheking for collisions between a player and enemies

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class Player {
  constructor(x,y, speed) {
    this.sprite = 'images/char-boy.png'; //load the hero image
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  update(dt) {
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Move a player method
  handleInput(keypress){
    switch (keypress) {
      case 'left':
        this.x -= this.speed;
          if (this.x <= 0) {
            this.x = 3;
          }
        break;
        case 'up':
          this.y -= this.speed - 15; //decreasing the speed a little to optimize the movement
          if (this.y <= -20) {
            this.y = -20; //locking the possition and unabling further movement
            lvlNum++;
            setTimeout(() => (this.y = 405) && (this.x = 203), 200); //adding a delay to reset position
            return lvlNum;
          }
          break;
          case 'right':
            this.x += this.speed;
            if (this.x >= 403) {
              this.x = 403;
            }
            break;
            case 'down':
              this.y += this.speed -15;
              if (this.y >= 405) {
                this.y = 405;
              }
              break;
      default:
    }
  }
};

// Initializing objects
let bug1 = new Enemy(10, 145, 150);
let bug2 = new Enemy(10, 230, 150);
let bug3 = new Enemy(10, 60, 150);

let allEnemies = [bug1, bug2, bug3];
let player = new Player (203, 405, 100);

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

//Creating a span to check the level
var level = document.createElement('span');
level.innerHTML = 'Current level: '  + lvlNum;
document.body.appendChild(level);
