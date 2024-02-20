let sprite;
const amount = [];

function preload(){

  let animations = {
    run: {row:0 , frames: 2},
    die: {row:1, frames: 1}
  };

  for(let i = 1, y = 200; i < 3 < i++;){
    amount.push(new roach(100,100,100,100,'Assets/roach2.png',animations)); // makes all roaches
  y += 100;
}

}

function setup() {

  createCanvas(1024,1024);

}

function draw() {
  background(235);

  
  amount.forEach((character) => {


    if (kb.pressing('d')) {
      character.walkRight();
    } 
    else if (kb.pressing('a')) {
      character.walkLeft();
    } 
    else if (kb.pressing('w')) {
      character.walkUp();
    }
    else if (kb.pressing('s')) {
      character.walkDown();
    }
    else {
      //character.stop();
    }

    if (character.sprite.x + 20 > width) {
      character.walkLeft();
    } 
    else if (character.sprite.x - 20 < 0) {
      character.walkRight();
    }
    else if (character.sprite.y - 20 < 0 ){
      character.walkDown();
    }
    else if (character.sprite.y + 20 > height){
      character.WalkUp();
    }

  })
}


class roach {

  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('run');
    
}

  

walkRight() {
  //this.sprite.changeAni('walkRight');
  this.sprite.vel.x = 1;
  this.sprite.scale.x = 1;
  this.sprite.vel.y = 0;
  this.sprite.rotateTo(90,25)
}

walkLeft() {
  //this.sprite.changeAni('walkRight');
  this.sprite.vel.x = -1;
  this.sprite.scale.x = -1;
  this.sprite.vel.y = 0;
  this.sprite.rotateTo(270,25)
}

walkUp() {
 // this.sprite.changeAni('walkUp');
  this.sprite.vel.y = -1;
  this.sprite.vel.x = 0;
  this.sprite.rotateTo(0,25)
}

walkDown() {
 // this.sprite.changeAni('walkDown');
  this.sprite.vel.y = 1;
  this.sprite.vel.x = 0;
  this.sprite.rotateTo(180,25)
}



}



