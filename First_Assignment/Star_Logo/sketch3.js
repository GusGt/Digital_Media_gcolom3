function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(40,0,255);
  noStroke()
  fill('white')
  circle(190,200,200)
  fill('green')
  circle(190,200,190)

  frameRate(12);
  text("X: "+mouseX, 0, height/4);
  text("Y: "+mouseY, 0, height/2);

  beginShape()
  stroke(255,255,255) //outline of star
  strokeWeight(4)
  fill('red')
  vertex(190,95) //top of star
  vertex(160,175) //indent TL
  vertex(90,175) //left point
  vertex(145,210) //indent BL
  vertex(130,285) //BL point
  vertex(190,240) //bottom vertex
  vertex(250,285)
  vertex(235,210)
  vertex(290,175)
  vertex(220,175)
  endShape(CLOSE)
  

  
}
