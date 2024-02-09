let spelunky;


function preload(){
  spelunky = new Sprite(200,200,80,80);
  spelunky.spriteSheet = 'Assets/Sprite_Stand.png';

  let animations =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 8},
    up:   {row:5,col:0,frames:6},
    down: {row:5,col:7,frames:5}
  };

  spelunky.anis.frameDelay = 8;

  spelunky.addAnis(animations);
  spelunky.changeAni('stand');

}

function setup() {
	createCanvas(400,400)

}

function draw(){
  clear();
  background(0);
 
  if(kb.pressing('d')) WalkR()
  else if(kb.pressing('a')) WalkL()
  else if(kb.pressing('w')) WalkU()
  else if(kb.pressing('s')) WalkD()
  else Stop()


  if(spelunky.x + 20 > width){
    WalkL();
  }
  else if(spelunky.x - 20 < 0){
    WalkR();
  }
  else if(spelunky.y - 20 < 0)
  {
    WalkD();
  }
  else if (spelunky.y  + 20 > height){
    WalkU();
  }

}





function WalkU(){ //walk up 
  spelunky.changeAni('up')
  spelunky.vel.y = -1;
}

function WalkD(){ //walk down
  spelunky.changeAni('down')
  spelunky.vel.y = 1;
}

function WalkR(){ //walk right
  spelunky.changeAni('run')
  spelunky.scale.x = 1;
  spelunky.vel.x = 1;
}

function WalkL(){ //walk left
  spelunky.changeAni('run')
  spelunky.scale.x = -1;
  spelunky.vel.x = -1;
}

function Stop(){
  spelunky.changeAni('stand')
  spelunky.vel.x = 0;
  spelunky.vel.y = 0;
}
