//Global variables
var lvlNum = 0; //Current level
var modal = document.querySelector('#myModal');
const closing = document.querySelector(".close");
let popuptext = document.querySelector('.popuptext')
let imageDiv = document.getElementById('Life');
let restartButton = document.querySelector('.restart');

// Enemies our player must avoid
class Enemy {
  constructor(x,y, speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png'; //load the image of the enemies
    this.speed  = speed;
};

//Randomize spawning enemies location before entering canvas
    moveEnemies() {
      const xH = [-103, -203, -303];
      const yH = [65, 150, 235];
      let xHF = xH[Math.floor(Math.random() * (3 - 0 + 1)) + 0];
      let yHF = yH[Math.floor(Math.random() * (2 - 0 + 1)) + 0];
      this.x = xHF;
      this.y = yHF;
    }

    update(dt) {
      //Constantly move enemies and reset their possition when they move out of canvas
     this.x += this.speed * dt;
     if (this.x > 700) {
       bug1.moveEnemies();
       bug2.moveEnemies();
       bug3.moveEnemies();
       bug4.moveEnemies();
       bug5.moveEnemies();
     }

     if (lvlNum==15) {
       this.speed = 250;
     }
     if (lvlNum==40) {
       this.speed = 350;
     }
    if (lvlNum==60) {
      this.speed = 450;
    }
    if (lvlNum==80) {
      this.speed = 550;
    }
    if (lvlNum==95) {
      this.speed=650
    }
     //Checking for collisions between a player and enemies
      if (player.x < this.x + 72 &&
          player.x + 50 > this.x &&
          player.y < this.y + 48.5 &&
          player.y + 56.5 > this.y) {
            //Remove one life when collided with enemy
          imageDiv.removeChild(imageDiv.lastChild);
          if (imageDiv.children.length == 0) {
            tryagain();
            close();
          }
        player.x = 203;
        player.y = 405;

      }
  };
  // Draw the enemy on the screen, required method for game
      render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      }
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
  constructor(x, y, speed) {
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  addlife () {
    if (imageDiv.children.length == 3) {

    } else {
      let img = document.createElement('img');
      img.src = 'images/Heart.png';
      img.classList.add('picture');
      img.height = '100';
      img.alt = 'heart';
      imageDiv.appendChild(img);
    }
  }

  moveOjbect() {
    const xH = [3, 103, 203, 303, 403];
    const yH = [65, 150, 235];
    let xHF = xH[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
    let yHF = yH[Math.floor(Math.random() * (2 - 0 + 1)) + 0];
    this.x = xHF;
    this.y = yHF;
  }

  update(dt)  {
//Adds moving heart with randomized spawn location
    this.x -= this.speed * dt;
    if (this.x <= -200) {
      heart.moveOjbect();
    }

    if (player.x < this.x + 65 &&
        player.x + 50 > this.x &&
        player.y < this.y + 65 &&
        56.5 + player.y > this.y) {
      heart.addlife();
    }
  }

};

//Creating array to randomize position of heart to spawn only in the middle on the stones
const xH = [3, 103, 203, 303, 403];
const yH = [65, 150, 235];
let xHF = xH[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
let yHF = yH[Math.floor(Math.random() * (2 - 0 + 1)) + 0];

// Initializing objects
let bug1 = new Enemy(10, 145, 150);
let bug2 = new Enemy(10, 230, 150);
let bug3 = new Enemy(10, 60, 150);
let bug4 = new Enemy (-100, 150, 150);
let bug5 = new Enemy (-200, 235, 150)

let allEnemies = [bug1, bug2, bug3, bug4, bug5];
let player = new Player (203, 405, 100);
let heart = new GatherLife (203, 235, 100);

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
let level = document.createElement('span');
level.innerHTML = 'Current level: 0';
document.body.appendChild(level);

//Creating player's lives
function createlives () {
  for (var j = 0; j < 3; j++) {
    let img = document.createElement('img');
    img.src = 'images/Heart.png';
    img.classList.add('picture');
    img.height = '100';
    img.alt = 'heart';
    imageDiv.appendChild(img);
  }
}
createlives();

function levelupdate() {
  lvlNum++;
  level.innerHTML = 'Current level: '  + lvlNum;
  congrats();
  close();
  }

//Creating popup function
function congrats() {
    if (lvlNum == 99) {
        popuptext.innerHTML = '<b> Congratulations !!</b> <br/> <br/>You are amazing! </br> <br/> Your power is over 99! <br/> <br/>';
        modal.style.display = 'block';
    }
}

function tryagain () {
  popuptext.innerHTML = '<b> Sorry :< </b> <br/> <br/>You lost! </br> <br/> Try again! <br/> <br/>';

  restartButton.addEventListener('click', function() {
    heart.addlife();
    heart.addlife();
    heart.addlife();
    lvlNum = 0;
    level.innerHTML = 'Current level: 0'
    modal.style.display = "none";
  })
  modal.style.display = 'block';
}

//function closing popup screen
function close() {
    closing.addEventListener('click', function() {
        modal.style.display = "none";
    })
}
