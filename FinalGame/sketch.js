let ground;
let jumpHeight = -30;
let sensor;
let charSpeed = 4;
let caveBack;
let inAir;
let lives;
let character;
let enemy;
let projectile;
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
let levelOne;
let levelTwo;
let levelThree;


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
  createCanvas(1200, 800);
  world.gravity.y = 150;
  ground = new Sprite(0, 615, windowWidth*2, 10)
  ground.collider = 'static';
  ground.color = (123,12,200);
  ground.visible = false;
  ninja.collide(ground);
  ninja.rotationLock = true;
  sensor = new Sprite(30,575,50,50,'n');
  let e = new GlueJoint(ninja,sensor);
  e.visible = false;
  sensor.visible = false;
  
}

function draw() {
  background(caveBack);

  
  if(kb.pressed('w')) jump(ninja)


  if(kb.pressing('d')) WalkR(ninja)
  else if(kb.pressing('a')) WalkL(ninja)
  
  else Stop(ninja)
  bounds(ninja);
  //console.log(ninja.position.y); checking base height
  
}

function bounds(spr){
  if(spr.x + 20 > width){
    WalkL(spr);
  }
  else if(spr.x - 20 < 0){
    WalkR(spr);
  }
} 

function WalkR(spr){ //walk right
  spr.changeAni('run')
  spr.scale.x = 1;
  spr.vel.x = charSpeed;
}

function jump(spr){
  
  spr.changeAni('jump');
  spr.vel.y = jumpHeight;
  
}

function WalkL(spr){ //walk left
  spr.changeAni('run')
  spr.scale.x = -1;
  spr.vel.x = -charSpeed;
}

function Stop(spr){
  spr.changeAni('stand')
  spr.vel.x = 0;
  spr.vel.y = 0;
}