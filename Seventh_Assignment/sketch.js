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
  attack: 0.3, 
  decay:  0.1, 
  sustain: 0, 
  release: 0.8 
}).toDestination();

let zoomNoise = new Tone.Noise({
  type:'brown',
  fadeIn:1,
  fadeOut:1}).connect(dop);

let zoomfilter = new Tone.AutoFilter({
  frequency: 500,
    filter : {
    type: "lowpass",
    rolloff: -24,
    Q: 4
    }});

zoomNoise.connect(zoomfilter);
zoomfilter.toDestination();

//zoom sound


// noise.connect(filter);
// filter.toDestination();



function preload(){
  car = loadImage("Assets/car2.png");
}

function setup() {
  createCanvas(400, 400);
}
let zoomInt

function mousePressed(){
  //noise.start();
  zoomNoise.start();
  zoomInt = setInterval(zoom, 4000); //repeatedly makes the zoom 
  console.log('press');
  
}

function zoom(){

  for(let i = 0; i <= 3;i++){
  dop.triggerAttackRelease(+i);
  }
 
  //saw.triggerAttackRelease(300, "2n")
  console.log('zoom');
}

function keyPressed(){
  if(key=='q'){
    //noise.stop();
    clearInterval(zoomInt);
    zoomNoise.stop();
  }
}

function draw() {
  background(car);
  fill('yellow')
  text("Press anywhere to listen,\ncar zips by you on the highway every 4 seconds", 10, 370)
}

