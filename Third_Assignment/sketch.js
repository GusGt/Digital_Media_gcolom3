let spelunky;
let pos;

function preload(){

  //spl = loadAni('Assets/Sprite_Stand')
  //spelunky = new sprite(10,10,80,80);
  sheet = loadSpriteSheet("Assets/Sprite_Stand.png", 80, 80);
  //los = loadImage("Assets/Sprite_Stand.png");
  spelunky = loadAnimation();

  spelunky.addAnis({

    stand: {row: 0, frames: 1},
    run: {row: 1, col: 1,frames: 8}

  });

  spelunky.changeAni('run');

}

function setup() {
	createCanvas(400,400);
  //background('black')

}

function WalkU(){ //walk up 
  spelunky.changeAni('stand')
  spelunky.vel.y = 1;
}

function WalkD(){ //walk down
  spelunky.changeAni('stand')
}

function WalkR(){ //walk right
  spelunky.changeAni('stand')
}

function WalkL(){ //walk left
  spelunky.changeAni('stand')
}

function draw(){

  clear();
  animation(spelunky,80,80)

  //image(los,0,0,80,80);

  if(kb.presses('d')) WalkR()
  if(kb.presses('a')) WalkL()
  if(kb.presses('w')) WalkU()
  if(kb.presses('s')) WalkS()


}
