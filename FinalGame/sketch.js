let caveBack;
let lives;
let character;
let enemy;
let projectile;
let ground;
let temp;
let menuSong;
let gameOver;
let enemyKill;
let death;
let damageTaken;
let enemyDrop;
let powerUp;
let ninja;
let gameStart;
let gameEnd;

//stretch features
let boss;
let cutScene;
let bossHealth;
let upgrade;
//end of stretch features


function preload() 
{
  caveBack = loadImage("Assets/Background.png");
  ninja = new Sprite(30,570,80,80);
  ninja.spriteSheet = 'Assets/Ninja.png';
  let animations =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 8},
    jump: {row:9, col:0, frames:12}
  };

  ninja.addAnis(animations);
  ninja.changeAni('stand'); //starting position

}

function setup() {
  createCanvas(900, 800);
}

function draw() {
  background(caveBack);
}
