function setup() {
  createCanvas(1000, 1000);
  background('pink');
  let x;
  let y;
  let k; //color of brush
  
}

function draw() {
  
  fill('red')
  square(0,0,25)
  fill('blue')
  square(0,25,25)
  fill('yellow')
  square(0,50,25)

  x = mouseX
  y = mouseY

}

function mouseDragged(){
  fill(k)
  circle(x,y,10)
}

function mousePressed(){
  if(x <=25 && y < 25 ) {
    k = 'red'
    circle(100,100,100)
  }
  if(x <= 25 && 25 < y && y <50) {
    k = 'blue'
  
    square(100,100,100)
  }
  if(x <= 25 && 50 < y && y < 75) {
    k = 'yellow'
    circle(200,200,200)
  }
}

function keyPressed(){
  if(keyCode == ENTER){
    background("pink")
  }

}

