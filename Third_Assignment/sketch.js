let spelunky;
let pos;

function preload(){

  spelunky = loadImage("Assets/Sprite_Stand.png");

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  
  image(spelunky,pos,0,5000,5000)

}


function keyPressed(){

  if (value == "RIGHT"){

  }

}
