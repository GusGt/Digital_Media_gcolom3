let ground, sensor;
let jumpHeight = -30;
let charSpeed = 5;
let menu, caveBack, platform, lives, character, score;
let attack, enemyAttack, enemy;
let temp;
let menuSong, endSong, gameSong;
let gameEnd, started;
let enemyKill, death;
let ninja, damageTaken, enemyDrop, powerUp, attackImg;
let levelOne, levelTwo, levelThree;
let gunDelay = 3000
let lastFire = 0;
let coin, coinImg, buttonImg1, buttonImg2;
let font2, startButton, startButton2, retryButton;
let currentlevel = 0;
let changedOnce, changedTwice, changedThrice = false;
let right = true;



//stretch features
let boss;
let cutScene;
let bossHealth;
let upgrade;
//end of stretch features


function preload() 
{
  caveBack = loadImage("Assets/Background.png");
  attackImg = loadImage("Assets/fire.png");
  platImg = loadImage("Assets/plat.png");
  coinImg = loadImage("Assets/Coin_.png");
  menu = loadImage("Assets/mainMenu.png");
  font2 = loadFont("Assets/MedievalSharp.ttf");
  buttonImg1 = loadImage("Assets/startButton1.png");

}

function setup() {
  createCanvas(1200, 800);
  startButton = createImg("Assets/startButton1.png");
  startButton.position(width/2-140, height/2);
  startButton.mousePressed(gameStart)
  

}

function draw() {

  background(menu);
  textSize(100);
  textAlign(CENTER);
  fill(120,34,78);
  strokeWeight(5);
  textFont(font2);
  text("ESCAPE THE DUNGEON", width/2, height/2);
  
  
  if(started)
  {
    
  background(caveBack);

  if(kb.pressed('w')) jump(ninja)
  if(kb.pressing('d')) WalkR(ninja)
  else if(kb.pressing('a')) WalkL(ninja)
  else if(kb.pressing(' ') && (millis() - lastFire > gunDelay))
  {
    fire(ninja);
    lastFire = millis();
  } 

  else Stop(ninja)
  bounds(ninja); //always checking bounds

  if(currentlevel == 0 && !changedOnce)
  {
    if(ninja.x + 20 > width+10)
    {
      changedOnce = true;
      levelTwoStart();
    }
  }


  }
  
}

function collect(spr, coin){

  coin.remove();
  score++;

}

function fire(spr){

 attack = new Sprite(spr.x, spr.y);
 if(right)
 {
  attack.vel.x = 6;
 }
 else
 {
  attack.vel.x = -6;
  attack.scale.x = -1;
 }
 
 attack.h = 1;
 attack.w = 1;
 attack.img = attackImg;
 attack.collider = 'none';
 attack.life = 80;

}

function bounds(spr){
  
  if(spr.x - 20 < 0){
    WalkR(spr);
  }
} 

function WalkR(spr){ //walk right
  spr.changeAni('run')
  spr.scale.x = 1;
  spr.vel.x = charSpeed;
  right = true;
}

function jump(spr){
  if(sensor.overlapping(ground) || sensor.overlapping(platform))
  {
  spr.changeAni('jump');
  spr.vel.y = jumpHeight;
  }
}

function WalkL(spr){ //walk left
  spr.changeAni('run')
  spr.scale.x = -1;
  spr.vel.x = -charSpeed;
  right = false;
  
}

function Stop(spr){
  spr.changeAni('stand')
  spr.vel.x = 0;
  
}

function gameStart(){
  startButton.remove();
  started = true;
  
  world.gravity.y = 120;

  ninja = new Sprite(30,570,80,80);
  ninja.spriteSheet = 'Assets/Ninja.png';
  let animations =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 8},
    jump: {row:9, col:0, frames:12}
  };

  ninja.addAnis(animations);
  ninja.changeAni('stand'); //starting position

  ground = new Group();
  ground.layer = 0;
  ground.h = 5;
  ground.w = 200
  ground.collider = 'static';
  ground.tile = 'g';
  ground.color = (123,12,200);
  
  platform = new Group();
  platform.img = platImg;
  platform.h = 1;
  platform.w = 10;
  platform.collider = 'static';
  platform.tile = '-';

  coin = new Group();
  coin.spriteSheet = coinImg;
  coin.collider = 'none';
  coin.tile = 'c';
  coin.layer = 0;
  coin.addAni( {w: 13, h:16, row:0, frames:4});
  coin.anis.frameDelay = 8;
  
  


  ninja.collide(ground);
  ninja.rotationLock = true;
  ninja.friction = 0;

  sensor = new Sprite(30,595,30,95,'n');
  let e = new GlueJoint(ninja,sensor);
  e.visible = false;
  sensor.visible = false;

  levelOne = new Tiles(
		[
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                            c  c  c     ',
      '     c  c  c                                                             ',
      '                                                            -  -  -      ',
      '     -  -  -                                                             ',
      '                                                                        ',
      '                                                -  -  -                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                    c  c                                                ',
      '                                                                        ',
      '                    -  -           -  -                                     ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '       -  -  -                                                             ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
			'g       g       g       g                     g  g                     g'
		],
		8,
		8,
		16,
		16
	);

  


  ninja.overlaps(coin, collect);

}

function levelTwoStart(){
  levelOne.remove();
  ninja.x = 10;
  ninja.y = 50;
  levelTwo = new Tiles(
		[
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'                                                                        ',
			'-  -  -                                                                 ',
			'                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
			'                                                                        '
		],
		8,
		8,
		16,
		16
	);

}

