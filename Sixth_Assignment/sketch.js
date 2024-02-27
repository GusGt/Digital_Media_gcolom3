let synth = new Tone.PolySynth(Tone.Synth);

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
  background(220);
}
