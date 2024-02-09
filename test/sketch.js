let sprite;

function setup(){

	createCanvas(400,400);
	sprite = new Sprite(200,200);
	sprite.color = 'blue';



}


function draw(){

	background(220);
	sprite.rotation++;

}