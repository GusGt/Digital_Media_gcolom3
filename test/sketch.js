let sus;
let idle, walk, die;
let walker;


function preload(){
  sus = createSprite(100, 100)

  walker = loadAnimation('Assets/Base/Walk1.png','Assets/Base/Walk8.png')
  sus.addAni(walker)
  sus.scale = 0.5
  


sus.changeAni(walker)
}

function setup() {
	createCanvas(800,800)


}

function draw(){
  clear();
  background(0);
  
 walker.draw(mouseX,mouseY)

 
  if     (kb.pressing('d')) WalkR()
  else if(kb.pressing('a')) WalkL()
  else if(kb.pressing('w')) WalkU()
  else if(kb.pressing('s')) WalkD()
  else Stop()


  if(sus.x + 20 > width){
    WalkL();
  }
  else if(sus.x - 20 < 0){
    WalkR();
  }
  else if(sus.y - 20 < 0)
  {
    WalkD();
  }
  else if (sus.y  + 20 > height){
    WalkU();
  }

}


function WalkU(){ //walk up 
  sus.changeAni('up')
  sus.vel.y = -1;
}

function WalkD(){ //walk down
  sus.changeAni('down')
  sus.vel.y = 1;
}

function WalkR(){ //walk right
  sus.changeAnimation('walk')
  sus.scale.x = 1;
  sus.vel.x = 1;
}

function WalkL(){ //walk left
  sus.changeAni('walk')
  sus.scale.x = -1;
  sus.vel.x = -1;
}

function Stop(){
  sus.changeAni('stand')
  sus.vel.x = 0;
  sus.vel.y = 0;
}
