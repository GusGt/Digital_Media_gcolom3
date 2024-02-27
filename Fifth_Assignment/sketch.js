let sounds;
let chor, dist;
let distAmt = new Tone.Distortion(0.5);
let feedAmt = new Tone.FeedbackDelay("4n", 0.5);

let soundN = ['gong','choir','drum','airhorn'];
let buttons = [];

  sounds = new Tone.Players({

    gong : "Assets/gong.mp3",
    choir : "Assets/Choir.mp3",
    drum : "Assets/drum.mp3",
    airhorn : "Assets/airhorn.mp3"

  })


sounds.connect(distAmt);
distAmt.connect(feedAmt); //chain with effects included
feedAmt.toDestination();

function setup() {
  createCanvas(400,400);

  //each slider named on what they control
  dist = createSlider(0,1,0,0.1); //distortion
  dist.position(100,220);
  dist.mouseMoved(() => distAmt.distortion = dist.value());

  feed = createSlider(0,1,0,0.2); //feedback
  feed.position(100,240);
  feed.mouseMoved(() => feedAmt.feedback.value = feed.value());

  soundN.forEach((name, i) => { //creates a button for each name

    buttons[i] = createButton(name);
    buttons[i].position(100, 100 + i * 22);
    buttons[i].mousePressed(() => sounds.player(name).start());

  })

}



function draw() {
  background('Red')
  textSize(18);
  text("Welcome to MC-DJ something.. idk..",20,30)

  textSize(12);
  text("Distortion",40,232)
  text("Feedback",40,252)
  text("All sounds from pixabay.com",240,390)
  textSize(14);
  text("Buttons make sounds!",100,90);
}
