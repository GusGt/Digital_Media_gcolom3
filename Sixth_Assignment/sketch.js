let distAmt = new Tone.Distortion(0.5);
let chorus = new Tone.Chorus(4,2.5,0.5);
let freeverb = new Tone.Freeverb();
let synth = new Tone.PolySynth(Tone.Synth);
let pitcher = new Tone.PitchShift();

pitcher.pitch = 0;
synth.connect(freeverb);
freeverb.connect(distAmt);
distAmt.connect(pitcher);
pitcher.connect(chorus);
chorus.toDestination();


let notes = {
  'a' :'C4',
  's' :'D4',
  'd' :'E4',
  'f' :'F4',
  'g' :'G4',
  'h' :'A4',
  'j' :'B4',
  'k' :'C5'
}

synth.toDestination();

function setup() {
  createCanvas(400, 400);
  background("yellow");
  text("Pitch",70,212);
  text("Distortion",50, 234);
  text("Keys A-K in ascending order, headphone warning for high pitch\nand distortion", 20, 380);
  textSize(18);
  text("WELCOME TO MC SOMETHING PART TWO",20,70)

  pitch = createSlider(-12, 12, 0, 0.1); //pitch down -12, pitch up 12, starting point is 0
  pitch.position (100, 200);
  pitch.mouseMoved(()=> pitcher.pitch = pitch.value());

  dist = createSlider(0,1,0,0.1); //distortion
  dist.position(100,220);
  dist.mouseMoved(() => distAmt.distortion = dist.value());

  // core = createSlider(0,1,0,0.1);
  // core.position(100,240);
  // core.mouseMoved(() => chorus.Chorus.value() = core.value()); not affecting anything

}

function keyPressed(){
  let play = notes[key];
  synth.triggerAttack(play);
}

function keyReleased(){
  let play = notes[key];
  synth.triggerRelease(play,'+0.03');
}

function draw() {
  //background(220);
}
