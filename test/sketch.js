// let sus;
// let idle, walk, die;
// let walker;


// function preload(){
//   sus = createSprite(100, 100)

//   walker = loadAnimation('Assets/Base/Walk1.png','Assets/Base/Walk8.png')
//   sus.addAni(walker)
//   sus.scale = 0.5
  


// sus.changeAni(walker)
// }

// function setup() {
// 	createCanvas(800,800)


// }

// function draw(){
//   clear();
//   background(0);
  
//  walker.draw(mouseX,mouseY)

 
//   if     (kb.pressing('d')) WalkR()
//   else if(kb.pressing('a')) WalkL()
//   else if(kb.pressing('w')) WalkU()
//   else if(kb.pressing('s')) WalkD()
//   else Stop()


//   if(sus.x + 20 > width){
//     WalkL();
//   }
//   else if(sus.x - 20 < 0){
//     WalkR();
//   }
//   else if(sus.y - 20 < 0)
//   {
//     WalkD();
//   }
//   else if (sus.y  + 20 > height){
//     WalkU();
//   }

// }


// function WalkU(){ //walk up 
//   sus.changeAni('up')
//   sus.vel.y = -1;
// }

// function WalkD(){ //walk down
//   sus.changeAni('down')
//   sus.vel.y = 1;
// }

// function WalkR(){ //walk right
//   sus.changeAnimation('walk')
//   sus.scale.x = 1;
//   sus.vel.x = 1;
// }

// function WalkL(){ //walk left
//   sus.changeAni('walk')
//   sus.scale.x = -1;
//   sus.vel.x = -1;
// }

// function Stop(){
//   sus.changeAni('stand')
//   sus.vel.x = 0;
//   sus.vel.y = 0;
// }


let sprite;
let characters = [];
let animal;

function preload() {
  let animations = {
    run: { row: 0, frames: 2}
  //  walkRight: {row: 0, col: 1, frames: 8},
   // walkUp: {row: 5, frames: 6},
   // walkDown: {row: 5, col: 6, frames: 6}
  };

   characters.push(new Character(100,100,100,100,'Assets/roach2.png',animations)); // makes all roaches


 // characters.push(new Character(100,100,80,80,'Assets/Sprite_Stand.png',animations));
  // characters.push(new Character(200,200,80,80,'assets/cyclops.png',animations));

}

function setup() {
  createCanvas(400, 400); 
  
  let animals = ['🦁', '🐯', '🐻'];
  animal = random(animals);

  
  
}

function draw() {
  background(0);

  text(animal, 50, 50);
  
  characters.forEach((character) => {

    

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

    if (character.sprite.x + character.sprite.width/4 > width) {
      character.walkLeft();
    } else if (character.sprite.x - character.sprite.width/4 < 0) {
      character.walkRight();
    }
  })
}

class Character {
  constructor(x,y,width,height,spriteSheet,animations) {
    this.sprite = new Sprite(x,y,width,height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('run');
  }

  stop() {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    //this.sprite.changeAni('stand');
  }
  
  walkRight() {
    //this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
  }
  
  walkLeft() {
    //this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
    this.sprite.vel.y = 0;
  }
  
  walkUp() {
   // this.sprite.changeAni('walkUp');
    this.sprite.vel.y = -1;
    this.sprite.vel.x = 0;
  }
  
  walkDown() {
   // this.sprite.changeAni('walkDown');
    this.sprite.vel.y = 1;
    this.sprite.vel.x = 0;
  }
}
