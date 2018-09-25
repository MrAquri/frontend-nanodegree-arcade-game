//Global variables
var lvlNum = 0; //Current level
var modal = document.querySelector('#myModal');
const closing = document.querySelector(".close");
let popuptext = document.querySelector('.popuptext')


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
    if (player.x < this.x + 72 &&
        player.x + 50 > this.x &&
        player.y < this.y + 48.5 &&
        player.y + 56.5 > this.y) {
      player.x = 203;
      player.y = 405;
    }
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
  update() {
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
            levelupdate();
            setTimeout(() => (this.y = 405) && (this.x = 203), 200); //adding a delay to reset position
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


class GatherLife {
  constructor(x, y) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

//Creating array to randomize position of heart to spawn only in the middle on the stones
const xH = [3, 103, 203, 303, 403];
const yH = [65, 150, 235];
const xHF = xH[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
const yHF = yH[Math.floor(Math.random() * (2 - 0 + 1)) + 0];

// Initializing objects
let bug1 = new Enemy(10, 145, 150);
let bug2 = new Enemy(10, 230, 150);
let bug3 = new Enemy(10, 60, 150);

let allEnemies = [bug1, bug2, bug3];
let player = new Player (203, 405, 100);
let heart = new GatherLife (xHF, yHF);

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
level.innerHTML = 'Current level: 0';
document.body.appendChild(level);

function levelupdate() {
  lvlNum++;
  level.innerHTML = 'Current level: '  + lvlNum;
  congrats();
  close();
  }

//Creating popup function
function congrats() {
    if (lvlNum == 99) {
        popuptext.innerHTML = '<b>Congratulations !!</b> <br/> <br/>You are amazing! </br> <br/> Your power is over 99! <br/> <br/>';
        modal.style.display = 'block';
    }
}

//function closing popup screen
function close() {
    closing.addEventListener('click', function() {
        modal.style.display = "none";
    })
}
