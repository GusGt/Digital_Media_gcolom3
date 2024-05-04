let ground, sensor, added, platform2;
let jumpHeight = -30;
let charSpeed = 5;
let lives = 3, lifes, first, second, third;
let menu, caveBack, platform, character, score = 0;
let attack, attackE, isAttacking, enemyAttack, enemy, enemyImg, eAttackImg;
let temp;
let gameEnd = false, started;
let enemyKill, death;
let ninja, damageTaken, enemyDrop, powerUp, attackImg, anubis;
let levelOne, levelTwo, levelThree, levelThree2;
let gunDelay = 3000, hitDelay = 3000;
let lastFire = 0, lastFireE = 0;
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
let bossLife = 10, bossDelay = 3000, lastBossHit = 0;
let escaped;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;

//start of sound implementation

let ThemeSong = new Tone.Player("Assets/theme.mp3").toDestination();
ThemeSong.loop = true;
ThemeSong.volume.value = -6

let EndSong = new Tone.Player("Assets/endSong.mp3").toDestination();
EndSong.loop = true;
EndSong.volume.value = -6

let loserSong = new Tone.Player("Assets/gameOver.mp3").toDestination();
loserSong.loop = true;
//loserSong.autostart = true; //testing
loserSong.volume.value = -6

let menuSong = new Tone.Player("Assets/mainMenu.mp3").toDestination();
menuSong.loop = true;
menuSong.autostart = true;
menuSong.volume.value = -6

let coinSound = new Tone.Player("Assets/grabCoin.mp3").toDestination();
coinSound.loop = false;
coinSound.volume.value = -6;

let enemySound = new Tone.Player("Assets/enemyDefeated.mp3").toDestination();
enemySound.loop = false;
enemySound.volume.value = -6;

let attackFire = new Tone.Player("Assets/fire.mp3").toDestination();
attackFire.loop = false;
attackFire.volume.value = -6;

let bossFire = new Tone.Player("Assets/bossFire.mp3").toDestination();
bossFire.loop = false;
bossFire.volume.value = -6;

//end of sound

//stretch features
let boss;
let cutScene;
let bossHealth = 10;
let upgrade;
let bossMaxHealth;
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
  enemyImg = loadImage("Assets/robot.png");
  deathScreenOver = loadImage("Assets/deathScreen.png");
  lifes = loadImage("Assets/lifes.png");
  eAttackImg = loadImage("Assets/eFire.png");
  escaped = loadImage("Assets/escaped.png")

}

function setup() {
  port = createSerial();
  createCanvas(1200, 800);

  connectButton = createButton("Connect");
  connectButton.position(width/2-30,height/2+200);
  connectButton.mousePressed(connect);

  startButton = createImg("Assets/startButton1.png");
  startButton.position(width/2-140, height/2);
  startButton.mousePressed(gameStart);
  
  attack = new Sprite(-100, 0); //offset, an attack needs to be established somewhere to continue to levels
  attackE = new Sprite(-100, 0);
  platform2 = new Sprite(-100, -300, 30, 10);

  background(menu);
  textSize(100);
  textAlign(CENTER);
  fill(120,34,78);
  strokeWeight(5);
  textFont(font2);
  text("ESCAPE THE DUNGEON", width/2, height/2);
  
}

/*
dev commands
p - level2
l - level3
m - end
(must be pressed in order to go to each level, cannot go backwards)
*/

function draw() {

  //console.log(mouseX, mouseY);
  
  if(started)
  {

    // start of analog

    let str = port.readUntil("\n");
    let values = str.split(",");
    //console.log(values[0]);
    if (values.length == 3) {
      joyX = values[0];
      joyY = values[1];
      sw = Number(values[2]);

     console.log("x: ", joyX, "y: ",joyY, " sw: ",sw );

      if (joyX < -100) {
        WalkR(ninja);
        
      } else if (joyX > 100) {
        WalkL(ninja);
      }
      else if (joyY > 100) {
        jump(ninja);
      } 
      else if(sw == 1 && (millis() - lastFire > gunDelay))
      {
        fire(ninja);
        lastFire = millis();
      }
      else{
        Stop(ninja);
      }
    }

// end of analog

    menuSong.stop();

      if(!over)
      {
        background(caveBack);
        
        if(lives == 3)
        {
          first = image(lifes, 10,10)
          second =image(lifes, 40,10)
          third = image(lifes, 70,10)
          port.write('3');
        }
        else if (lives ==2)
        {
          first = image(lifes, 10,10)
          second =image(lifes, 40,10)
          port.write('2');
        }
        else if (lives == 1)
        {
          first = image(lifes, 10,10)
          port.write('1');
        }


      }

        // if(kb.pressed('w')) jump(ninja)
        // if(kb.pressing('d')) WalkR(ninja)
        // else if(kb.pressing('a')) WalkL(ninja)
        // else if(kb.pressing(' ') && (millis() - lastFire > gunDelay))
        // {
        //   fire(ninja);
        //   lastFire = millis();
        // } 
        // else Stop(ninja)

        bounds(ninja); //always checking bounds

        //start of death condition

        if((lives==0 || ninja.y > height) )
        {
          port.write('0');
          gameOver();

          if(!gameEnd) // just for end song
          {
            gameEnd = true;
            loserSong.start();
          }

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
        else if(currentlevel == 2 && !changedThrice)
        {
          if(ninja.x + 20 > width+10 || kb.pressed('m'))
          {
            changedThrice = true;
            winnerWinner();
          }
        }

        if(curLev == 2)
        {
          
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
          for(let i = 0; i < 2; i++)
          {
          
            if(attack.overlapping(enemyList[i]) && isAttacking)
            {
              defeated(enemyList[i]);
              score += 5;
            }
            else if(ninja.overlapping(enemyList[i]) && (millis() - lastHit > hitDelay))
            {
              lives--;
              lastHit = millis();
            }
          }
        
        }

        else if(curLev == 3)
        {
          if(!over && bossLife != 0)
          {
            stroke(0);
            strokeWeight(4);
            noFill();
            rect(750,30,400,20);
            noStroke();
            fill('red');
            rect(750,30,map(bossLife, 0, bossHealth,0,400),20);
            textSize(20);
            fill('Yellow');
            text("Anubis",780,70);
          }

          if(ninja.x > width/2)
          {
            enemyList[2].scale.x = 1; 
          }
          else
          {
             enemyList[2].scale.x = -1; 
          }

          if(millis() - lastFireE > gunDelay && bossLife != 0)
          {
          eFire(enemyList[2]); //boss
          lastFireE = millis();
          }

          for(let i = 2; i < 3; i++)
          {
          
            if(attack.overlapping(enemyList[2]) && isAttacking)
            {
              if(bossLife == 0)
              {
              defeated(enemyList[2]);
              score += 20;
              }
              if(millis() - lastBossHit > bossDelay)
              {
              bossLife--;
              lastBossHit = millis();
              }
            }
            else if((ninja.overlapping(enemyList[i]) || ninja.overlapping(attackE)) && (millis() - lastHit > hitDelay))
            {
              lives--;
              lastHit = millis();
            }
          }

          if(bossLife == 0 && !added)
          {
            added = true;
            platform2 = new Sprite(1100, 300, 30, 10);
            platform2.img = platImg;
            platform2.collider = 'static';
            
          }
      
        }
  }
  
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 19200);
  } else {
    port.close();
  }

  connectButton.remove();
}

function collect(spr, coin){

  coin.remove();
  coinSound.start();
  score++;

}

function gameOver(){
  ThemeSong.stop();

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
  bossLife = 0;
 
}

function eFire(spr){
  if(bossLife != 0)
  {
    bossFire.start();
    attackE = new Sprite(spr.x, spr.y);
    attackE.moveTowards(ninja.x,ninja.y,0.009);
    attackE.rotateTowards(ninja.x,ninja.y);
    attackE.rotationSpeed = 1;
    attackE.rotationLock = true;

    attackE.h = 1;
    attackE.w = 1;
    attackE.img = eAttackImg;
    attackE.collider = 'none';
    attackE.life = 300;
  }
  
}

function fire(spr){
 attackFire.start();
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
  // else if(spr.y < 0)
  // {
  //   WalkR(spr);
  // }
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

  else if((curLev == 3 && sensor.overlapping(platform2)) && added)
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
  isRetry = true;
  bossLife = 10;
  added = false;
  EndSong.stop();
  loserSong.stop();
  menuSong.start();

}

function defeated(spr){
  enemySound.start();
  spr.remove();
}

function winnerWinner(){
  bossLife = 0; //for testing
  added = true; // for testing
  over = true;
  ThemeSong.stop();
  EndSong.start();
  allSprites.remove();
  background(escaped);

  

  fill('black');
  rect(0,0,300,800);
  rect(900,0,300,800);
  textSize(80)
  textFont(font2);
  fill('white');
  textAlign(CENTER);
  text("YOU FINALLY\n SEE THE LIGHT\n\n\n\n\n\nScore: "+score, width/2, height/2 - 300)
}

function gameStart(){
  if(isRetry)
  {
    
    resetAll();
    isRetry = false;
    
  }
  ThemeSong.start();
  
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
      '                                                            c     c     ',
      '     c  c  c                                                            ',
      '                                                            -  -  -  -  -  -',
      '     -  -  -                                                            ',
      '                                                                        ',
      '                                                -  -  -                 ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                     c                                                ',
      '                                                                        ',
      '                    -  -           -  -                                 ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '                                                                        ',
      '       -  -  -                                                          ',
      '                                                                        ',
      '                                                                        ',
      '                                                 c     c                ',
      '                                                                        ',
      '                                                    c                   ',
      '                                                                        ',
      '                                                 -  -  -                ',
			'-  -                                                                    '
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
			'                                                                         -',
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
  sensor2_1.visible = false; sensor2_2.visible = false;
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
  sensor3_1.visible = false; sensor3_2.visible = false;
  eWalkL(enemyList[1])
  



}

function levelThreeStart(){

  curLev =3;
  currentlevel = 2;
  let animationsEn =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 5}
  };

  enemyList[2] = new Sprite(540,300,90,150);
  enemyList[2].spriteSheet = "Assets/anubis.png";
  enemyList[2].addAnis(animationsEn);
  enemyList[2].layer = 0;
  enemyList[2].rotationLock = true;
  enemyList[2].friction = 0;
  enemyList[2].collider = 'none';
  enemyList[2].changeAni("stand");

  levelTwo.remove();
  enemyList[0].remove();
  enemyList[1].remove();
  ninja.x = 10;
  ninja.y = 700;
  levelThree = new Tiles(
		[
			'                                                                        ',
			'                                 -                                       ',
			'                                                                        ',
			'                                 -                                       ',
			'                                                                        ',
			'                                 -                                       ',
			'                                                                        ',
			'                                 -                                       ',
			'                                                                        ',
      '                                                                        ',
      '                             c  c  c  c                                 ',
      '                                                                         -',
      '                             -  -  -  -                                      ',
      '                                                                         -',
      '                             -        -                                      ',
      '                                                                         -',
      '                                                                             ',
      '                                                                         -',
      '                                                                           ',
      '                                                                         -',
      '                                                                             ',
      '                                                                         -',
      '                   -  -      -        -     -  -                            ',
      '                                                                         -',
      '                             -  -  -  -                                               ',
      '-  -                                                                     -',
      '                                                                        ',
      '                                                            -  -         -',
      '                                                                        ',
      '                                                                         -',
      '                                                                        ',
      '                                                                         -',
      '           -                                -  -  -                     ',
      '                                                                         -',
      '                                                                        ',
      '                                                                         -',
      '                                                                        ',
      '                                                                         -',
			'                                                             -  -  -    ',
      ' -  -                                                                    -',
      '                                                                        ',
      '                                                                         -',
      '                                                                        ',
      '                                                                         -',
      '                                                                        ',
      '                                                                         -',
      '                                                                        ',
      ' -  -  -  -        -  -  -  -           -  -  -  -  -  -  -  -        -  -  - ',
		],
		8,
		8,
		16,
		16
	);

    

}
