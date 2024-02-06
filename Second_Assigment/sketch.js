let selected;
let stack;

function setup() {
  createCanvas(1000, 1000);
  background('white');
  let x;
  let y;
  selected = color('white') //default color

  stack = [
    new Buttons('red',0),
    new Buttons('orange',27),
    new Buttons('yellow',54),
    new Buttons('lime',81),
    new Buttons('cyan',108),
    new Buttons('blue',135),
    new Buttons('magenta',162),
    new Buttons('brown',189),
    new Buttons('white',216),
    new Buttons('black',243)
  ];

  
  
  
}

function draw() {
  
 

    for(let i=0; i < stack.length; i++){
      stack[i].draw();
      
    }
    

}

function mouseDragged(){

  

  fill(selected)
  //circle(mouseX,mouseY,20) leaves cuts
  strokeWeight(20)
  stroke(selected)
  line(mouseX,mouseY,pmouseX,pmouseY)
   
}

function mousePressed(){
  let isIn = false;
  for(let i = 0; i < stack.length; i++){
    if(stack[i].contains(mouseX,mouseY)){
      selected = stack[i].color;
      isIn = true;
      
    }
  
  }
  console.log("color " + selected);
  console.log("color" + isIn);
}

function keyPressed(){
  if(keyCode == ENTER){
    background("white")

    for(let i=0; i < stack.length; i++){  //redraws selection of colors
      stack[i].draw();
    }

  }

}

class Buttons{
  constructor(color,y){
    this.color = color;
    this.y = y;
  }
  draw(){
    noStroke();
    fill(this.color);
    square(2,this.y,25)
  }

  contains(x,y){

    let inX = x >= 0 && x <= 25;
    let inY = y >= this.y && y <= this.y +27;

    //console.log(inX + " " + inY + " "+ x + " " + y + " " + this.y+"") //debugging for contains without this.x

    return inX && inY;

  }
}

