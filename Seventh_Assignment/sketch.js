// let noise = new Tone.Noise({
//   type:"pink",
//   fadeIn : 10,
//   fadeOut: 1}
//   );

// let filter = new Tone.AutoFilter({
//   frequency: 500,
//   type : 'sine',
//   depth: 1,
//   baseFrequency: 200,
//     filter : {
//     type: "lowpass",
//     rolloff: -24,
//     Q: 0}});

let dop = new Tone.AmplitudeEnvelope({ //dop for doppler effect
  attack: 0.7, 
  decay:  0.6, 
  sustain: 0, 
  release: 1 
}).toDestination();

let zoomNoise = new Tone.Noise({
  type:'brown',
  fadeIn:1,
  fadeOut:1}).connect(dop);

let zoomfilter = new Tone.AutoFilter({
  frequency: 500,
    filter : {
    type: "lowpass",
    rolloff: -48,
    Q: 1
    }});

zoomNoise.connect(zoomfilter);
zoomfilter.toDestination();

//zoom sound


// noise.connect(filter);
// filter.toDestination();

let car;

function preload(){
  car = loadImage("Assets/car2.png");
}

function setup() {
  createCanvas(400, 410);
  background('grey');

}

let zoomInt

function mousePressed(){
  
  //noise.start();
  zoomNoise.start();
  zoomInt = setInterval(zoom, 4000); //repeatedly makes the zoom 
  console.log('press');
  
  
}

function zoom(){
  
  dop.triggerAttackRelease(1);

  console.log('zoom');
}

function keyPressed(){
  if(key=='q'){
    clearInterval(zoomInt);
    zoomNoise.stop();
  }
}

function draw() {
  if(mouseIsPressed){
    background(car);
  }
  
  //background("black");
  fill('yellow');
  text("Press anywhere to listen,\n*car zips by you on the highway every 4 seconds*\n(press q to stop)", 10, 372);
}

