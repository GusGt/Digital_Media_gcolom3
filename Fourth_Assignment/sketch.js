function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}


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


function WalkU(spr){ //walk up 
  spr.changeAni('up')
  spr.vel.y = -1;
//pine
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