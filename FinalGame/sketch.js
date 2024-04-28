let ground, sensor;
let jumpHeight = -30;
let charSpeed = 5;
let lives = 3;
let menu, caveBack, platform, character, score;
let attack, isAttacking, enemyAttack, enemy, enemyImg;
let temp;
let menuSong, endSong, gameSong;
let gameEnd, started;
let enemyKill, death;
let ninja, damageTaken, enemyDrop, powerUp, attackImg;
let levelOne, levelTwo, levelThree;
let gunDelay = 3000, hitDelay = 3000;
let lastFire = 0;
let lastHit = 0;
let coin, coinImg, buttonImg1, buttonImg2;
let font2, startButton, startButton2, retryButton;
let currentlevel = 0;
let changedOnce, changedTwice, changedThrice = false;
let right = true;
let curLev = 1;
let sensor2_2, sensor2_1, sensor3_2, sensor3_1, sensor4_2, sensor4_1, sensor5_2, sensor5_1, sensor6_2, sensor6_1;
let e2, e3, e4, e5, e6, e7, e8;
let enemyList = [];
let deathScreenOver, over, fadeIn, fade = 0, fadeAmount = 0;
let isRetry = false;
let animations;



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
  enemyImg = loadImage("Assets/robot.png")
  deathScreenOver = loadImage("Assets/deathScreen.png")

}

function setup() {
  createCanvas(1200, 800);
  startButton = createImg("Assets/startButton1.png");
  startButton.position(width/2-140, height/2);
  startButton.mousePressed(gameStart)
  
  attack = new Sprite(-100, 0); //offset, an attack needs to be established somewhere to continue to levels

  background(menu);
  textSize(100);
  textAlign(CENTER);
  fill(120,34,78);
  strokeWeight(5);
  textFont(font2);
  text("ESCAPE THE DUNGEON", width/2, height/2);
}

function draw() {

  //console.log(mouseX, mouseY);
  
  
  
  if(started)
  {
  
    if(!over)
    {
      background(caveBack);
      
    }
  

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

  //start of death condition

  if(lives==0 || ninja.y > height)
  {
    
    gameOver();

    
  }

  //end of death condition

  if(currentlevel == 0 && !changedOnce)
  {
    if(ninja.x + 20 > width+10 || kb.pressed('p'))
    {
      changedOnce = true;
      levelTwoStart();
    }
  }
  else if(currentlevel == 1 && !changedTwice)
  {
    if(ninja.x + 20 > width+10 || kb.pressed('l'))
    {
      changedTwice = true;
      levelThreeStart();
    }
  }

  if(curLev == 2)
  {
    console.log(lives);
    //console.log("here");

    //start of enemy checks
    if(!(sensor2_2.overlapping(platform)))
    {
      eWalkL(enemyList[0]);
    }
    else if(!(sensor2_1.overlapping(platform)))
    {
      eWalkR(enemyList[0]);
    }
    if(!(sensor3_2.overlapping(platform)))
    {
      eWalkL(enemyList[1]);
    }
    else if(!(sensor3_1.overlapping(platform)))
    {
      eWalkR(enemyList[1]);
    }

    //end of enemy checks
    if(attack.overlapping(enemyList[0]) && isAttacking)
    {
      defeated(enemyList[0]);
      score += 5;
    }
    else if(attack.overlapping(enemyList[1]) && isAttacking)
    {
      defeated(enemyList[1]);
      score += 5;
    }
    else if(ninja.overlapping(enemyList[0]) && (millis() - lastHit > hitDelay))
    {
      lives--;
      lastHit = millis();
    }
    else if(ninja.overlapping(enemyList[1]) && (millis() - lastHit > hitDelay))
    {
      lives--;
      lastHit = millis();
    }
   
  }

 

  }
  
}

function collect(spr, coin){

  coin.remove();
  score++;

}

function gameOver(){
  allSprites.remove();
  over = true;
  isRetry = true;

    
    if(fade<=255 && !fadeIn)
    {
      fade += 5;
    }
    if(fade>255 || fadeIn)
    {
      fadeIn = true;
      fade += -1;
      
      if(fade < 200)
      {
        
        fill('black');
        rect(0,0,300,800);
        rect(900,0,300,800);
        background(deathScreenOver);
        strokeWeight(5);
        textFont(font2);
        textSize(50);
        fill('black');
        textAlign(CENTER);
        text("YOU HAVE BECOME LOST\nIN THE DUNGEON", width/2, height/2-200);
        
      }

    }
  fill(0,fade)
  rect(0,0,1600,1000)
  lives = 0;
}

function fire(spr){

 isAttacking = true;
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
 attack.onLifetimeEnd = function() { // Define function to be executed when attack's lifespan ends
 isAttacking = false; // Set isAttacking to false
};

}

function bounds(spr){
  
  if(spr.x - 20 < 0){
    WalkR(spr);
  }
} 

//enemy controls start

function eWalkR(spr){ //walk right
  spr.changeAni('run')
  spr.scale.x = 1;
  spr.vel.x = 1;
  
}

function eWalkL(spr){ //walk left
  spr.changeAni('run')
  spr.scale.x = -1;
  spr.vel.x = -1;
  
  
}

//end of enemy controls

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

function resetAll(){
  
  fade = 0;
  fadeIn = false;
  changedOnce = false;
  changedTwice = false;
  changedTwice = false;
  lives = 3;
  lastFire = 0;
  lastHit = 0;
  curLev = 1;
  currentlevel = 0;
  started = true;
  over = false;
  isRetry = false;
}

function defeated(spr){
  spr.remove();
}

function gameStart(){
  if(isRetry)
  {
    console.log("here2");
    resetAll();
    console.log(lives, "here3");
    
  }
  
  
  startButton.remove();
  started = true;
  
  world.gravity.y = 120;

  ninja = new Sprite(30,570,80,80);
  ninja.spriteSheet = 'Assets/Ninja.png';
  animations =  {
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

  sensor = new Sprite(30,595,60,55,'n');
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
  curLev =2;
  currentlevel = 1;
  let animationsEn =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 8}
  };

  levelOne.remove();
  
  ninja.x = 10;
  ninja.y = 50;
  levelTwo = new Tiles(
		[
			'                                                                        ',
			'                                                                         -',
			'                                                                        ',
			'            c c c                                                        -',
			'                                                                        ',
			'                                                                         -',
			'                                                                        ',
			'-  -  -                                               -  -  -            - ',
			'                                                                        ',
      '                                                                         -   ',
      '                                                                        ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '           c     c                                                      ',
      '                                                                        ',
      '                                                                        ',
      '        -  -  -  -  -                                                   ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                                                             -  -  -    ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                                               -  -  -  -               ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
			'  -  -  -                      -        -  -                            ',
      '                                                                         -  ',
      '                                                                        ',
      '                                                                         -  ',
      '                          c                                             ',
      '                                                                         -  ',
      '                                                      c  c              ',
      '                                                                         -  ',
      '                                                      -  -              ',
      '             -       -  -                                                -  ',
      '                                                                         ',
      '                                                                         -  ',
		],
		8,
		8,
		16,
		16
	);

  enemyList[0] = new Sprite(200,280,80,80);
  enemyList[0].spriteSheet = "Assets/robot.png";
  enemyList[0].addAnis(animationsEn);
  enemyList[0].layer = 0;
  enemyList[0].rotationLock = true;
  enemyList[0].friction = 0;
  enemyList[0].collider = 'none';
  sensor2_1 = new Sprite(enemyList[0].x-15,enemyList[0].y+40,60,20,'n');
  sensor2_2 = new Sprite(enemyList[0].x+15,enemyList[0].y+40,60,20,'n');
  e2 = new GlueJoint(enemyList[0],sensor2_1);
  e3 = new GlueJoint(enemyList[0],sensor2_2);
  //sensor2_1.visible = false; sensor2_2.visible = false;
  eWalkR(enemyList[0]);

  enemyList[1] = new Sprite(810,470,80,80);
  enemyList[1].spriteSheet = "Assets/robot.png";
  enemyList[1].addAnis(animationsEn);
  enemyList[1].layer = 0;
  enemyList[1].rotationLock = true;
  enemyList[1].friction = 0;
  enemyList[1].collider = 'none';
  sensor3_1 = new Sprite(enemyList[1].x-15,enemyList[1].y+40,60,20,'n');
  sensor3_2 = new Sprite(enemyList[1].x+15,enemyList[1].y+40,60,20,'n');
  e4 = new GlueJoint(enemyList[1],sensor3_1);
  e5 = new GlueJoint(enemyList[1],sensor3_2);
  //sensor3_1.visible = false; sensor3_2.visible = false;
  eWalkL(enemyList[1])
  



}

function levelThreeStart(){

  levelTwo.remove();
  enemyList[0].remove();
  enemyList[1].remove();
  ninja.x = 10;
  ninja.y = 700;
  levelThree = new Tiles(
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
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      ' -  -  -                                                                ',
		],
		8,
		8,
		16,
		16
	);

}


