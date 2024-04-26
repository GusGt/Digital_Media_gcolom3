let spelunky;
let viking;
let eskimo;


function preload(){
  spelunky = new Sprite(200,200,80,80);
  viking = new Sprite(100,200,80,80)
  eskimo = new Sprite(300,200,80,80)
  spelunky.spriteSheet = 'Assets/Sprite_Stand.png';
  viking.spriteSheet = 'Assets/viking.png';
  eskimo.spriteSheet = 'Assets/eskimo.png';

  let animations =  {
    stand: {row: 0, frames: 1},
    run:  {row: 0, col: 1,frames: 8},
    up:   {row:5,col:0,frames:6},
    down: {row:5,col:7,frames:5}
  };



  


  spelunky.collider = 'none'; //so they dont rotate around eachother
  viking.collider = 'none';
  eskimo.collider = 'none';

  spelunky.addAnis(animations);
  spelunky.changeAni('stand');
  viking.addAnis(animations);
  viking.changeAni('stand');
  eskimo.addAnis(animations);
  eskimo.changeAni('stand');

}

function setup() {
	createCanvas(windowWidth,windowHeight)

}

function draw(){
  clear();
  background(0);
  fill('white')
  textAlign(CENTER)
  text("AWSD for spelunky, arrows for viking, FTGH for eskimo",height/2,390)
 
  if(kb.pressing('d')) WalkR(spelunky)
  else if(kb.pressing('a')) WalkL(spelunky)
  else if(kb.pressing('w')) WalkU(spelunky)   //spelunky controls
  else if(kb.pressing('s')) WalkD(spelunky)
  else Stop(spelunky)

  if(kb.pressing(keyCode = RIGHT_ARROW)) WalkR(viking)
  else if(kb.pressing(keyCode = LEFT_ARROW)) WalkL(viking)
  else if(kb.pressing(keyCode = UP_ARROW)) WalkU(viking)  //viking controls
  else if(kb.pressing(keyCode = DOWN_ARROW)) WalkD(viking)
  else Stop(viking)

  if(kb.pressing('h')) WalkR(eskimo)
  else if(kb.pressing('f')) WalkL(eskimo)
  else if(kb.pressing('t')) WalkU(eskimo)   //eskimo controls
  else if(kb.pressing('g')) WalkD(eskimo)
  else Stop(eskimo)

  bounds(spelunky);
  bounds(viking);
  bounds(eskimo);  //constanlty checking if in bounds



function bounds(spr){
  if(spr.x + 20 > width){
    WalkL(spr);
  }
  else if(spr.x - 20 < 0){
    WalkR(spr);
  }
  else if(spr.y - 20 < 0)
  {
    WalkD(spr);
  }
  else if (spr.y  + 20 > height){
    WalkU(spr);
  }

}  

}

function WalkU(spr){ //walk up 
  spr.changeAni('up')
  spr.vel.y = -1;

}

function WalkD(spr){ //walk down
  spr.changeAni('down')
  spr.vel.y = 1;
}

function WalkR(spr){ //walk right
  spr.changeAni('run')
  spr.scale.x = 1;
  spr.vel.x = 1;
}

function WalkL(spr){ //walk left
  spr.changeAni('run')
  spr.scale.x = -1;
  spr.vel.x = -1;
}

function Stop(spr){
  spr.changeAni('stand')
  spr.vel.x = 0;
  spr.vel.y = 0;
}