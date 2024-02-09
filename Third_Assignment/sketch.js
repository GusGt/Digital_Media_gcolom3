let spelunky;


function preload(){
  spelunky = new Sprite(200,200,80,80);
  spelunky.spriteSheet = 'Assets/Sprite_Stand.png';

  let animations =  {
    stand: {row: 0, frames: 1},
    run:  {row: 1, col: 1,frames: 8},
    up:   {row:2,col:2,frames:8},
    down: {row:3,col:3,frames:8}
  };

  spelunky.anis.frameDelay = 8;
  spelunky.anis.offset.x = 2;
  spelunky.addAnis(animations);
  spelunky.changeAni('run');

}

function setup() {
	createCanvas(400,400)

}

function draw(){
  clear();
  background(0);

  spelunky.x = 200
  spelunky.y = 200
 
  // if(kb.presses('d')) WalkR()
  // if(kb.presses('a')) WalkL()
  // if(kb.presses('w')) WalkU()
  // if(kb.presses('s')) WalkD()


}

// function WalkU(){ //walk up 
//   spelunky.changeAni('stand')
//   //spelunky.vel.y = 1;
// }

// function WalkD(){ //walk down
//   spelunky.changeAni('stand')
// }

// function WalkR(){ //walk right
//   spelunky.changeAni('stand')
// }

// function WalkL(){ //walk left
//   spelunky.changeAni('stand')
// }
