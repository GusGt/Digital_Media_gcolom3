let sprite;
let amount = [];
let spritesheet;
let vars = []
let timeLeft = 30;
let count = 25;
let score = 0;
let speed = 2;
let startButton;
let resetButton;
let end = false;
let start = false;

//sounds
let squishS = new Tone.Player("Assets/squish.wav").toDestination();
squishS.loop = false;
let ThemeSong = new Tone.Player("Assets/theme.mp3").toDestination();
ThemeSong.loop = true;
let EndSong = new Tone.Player("Assets/endSong.mp3").toDestination();
EndSong.loop = true;
let loserSong = new Tone.Player("Assets/gameOver.mp3").toDestination();
loserSong.loop = true;


function preload(){

   spritesheet = loadImage("Assets/roach2.png")

}

function setup() {

  createCanvas(800,800);
  
  startButton = createButton('Start Game');
  startButton.size(200,50)
  startButton.position(width/2-100,height/2);
  startButton.mousePressed(() => {    
  startButton.remove(); //remove button

  GameStart();
  ThemeSong.start();
  amount.forEach((character) => {
    
    character.move();
   
  })
  
})

}

function mousePressed(){
  
  for(let i = 0; i < count; i++){
      let dead = amount[i].contains(mouseX, mouseY);
      if(dead){
        amount[i].squish();
      }

  }

}

function GameStart(){
  start = true;
  let animations = {
    run: {row:0 , frames: 2},
    die: {row:1, frames: 1}
  };

  for(i = 0; i < count; i++){
    amount[i] = (new roach(random(1,800),random(1,800),100,100,spritesheet,animations));
  }

}

function time(){
  if((frameCount % 60 == 0) && timeLeft >= 0){
    timeLeft--;
    // console.log(timeLeft);
  }
  return timeLeft;
}

function draw() {
  background('orange');
  
  if(!start){
    textSize(30);
    text("Welcome to Bug Squisher, your only goal,\n squash those bugs, your score depends on it.\n                             -_-", 100,200)
  }
  else if(start){
    timeLeft = time();
    textSize(30);
    rect(0,1,180,80)
    text("Score " + score,3,30);
    text("Time Left: " + timeLeft,3,65);
  }

  if(timeLeft == 0) {
    rectMode(CENTER);
    square(width/2, height/2, 400);
    textSize(30);
    text("GAME OVER", width/2-80, height/2);
    text("refresh to try again!", width/2-80, height/2+100); //for the life of me reset button would not work
    text("You scored: "+ score , width/2-80, height/2 -45);
    if(score == 0){
      text("Really? Not even one?" , width/2-120, height/2 -85); //funny potential cue
    }
    end = true;
    }
    else if(score ==count){
    rectMode(CENTER);
    square(width/2, height/2, 400);
    textSize(30);
    text("ALL ENEMIES CRUSHED", width/2-175, height/2);
    text("refresh to try again!", width/2-80, height/2+100);
    text("You scored: "+ score , width/2-80, height/2 -45);
    end = true;
    }

    if(end){
      ThemeSong.stop();
      if(score == 0){
        loserSong.start();
      }
      else{
        EndSong.start();
      }
    }
  
  amount.forEach((character) => {

    if (character.sprite.x + 20 > width) {
      character.walkLeft();
    } 
    else if (character.sprite.x - 20 < 0 || (character.sprite.x -20 < 190 && character.sprite.y < 90)) {
      character.walkRight();
    }
    else if (character.sprite.y - 20 < 0 || (character.sprite.y -20 < 80 && character.sprite.x < 170) ){
      character.walkDown();
    }
    else if (character.sprite.y + 20 > height){
      character.walkUp();
    }
    else if(end ){
      character.remove();
    }

  })

}


class roach {

  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.addAnis(animations);
    this.sprite.changeAni('run');
    this.checked = false;
    
}

  walkRight() {
  this.sprite.vel.x = speed;
  this.sprite.scale.x = 1;
  this.sprite.vel.y = 0;
  this.sprite.rotateTo(90,25)
}

walkLeft() {
  this.sprite.vel.x = -speed;
  this.sprite.scale.x = -1;
  this.sprite.vel.y = 0;
  this.sprite.rotateTo(270,25)
}

walkUp() {
  this.sprite.vel.y = -speed;
  this.sprite.vel.x = 0;
  this.sprite.rotateTo(0,25)
}

walkDown() {
  this.sprite.vel.y = speed;
  this.sprite.vel.x = 0;
  this.sprite.rotateTo(180,25)
}

squish(){
  this.sprite.vel.y = 0;
  this.sprite.vel.x = 0;
  this.sprite.changeAni('die')
  squishS.start();

  if(!this.checked){
    score++;
    this.checked = true;
    speed++;  //increases speed of each bug once hitting wall
    ThemeSong.playbackRate +=  0.01; //makes songs faster 
  }
}

stop(){
  this.sprite.vel.y = 0;
  this.sprite.vel.x = 0;
}

  contains(){

        let insideX = mouseX >= this.sprite.x - 40 && mouseX <= this.sprite.x + 40;
        let insideY = mouseY >= this.sprite.y - 40 && mouseY <= this.sprite.y + 40;

        return insideX && insideY;
  }

  move(){

    let num = Math.floor(Math.random() * 4) +1 ; //creates random movement

    switch(num){
      case 1: this.walkUp();
        break;
      case 2: this.walkDown();
        break;
      case 3: this.walkRight();
        break;
      case 4: this.walkLeft();
        break;
    }
  }

  
}
