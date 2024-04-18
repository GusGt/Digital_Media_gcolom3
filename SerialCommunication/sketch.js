let port;
let connectButton;
let button;
let isOn;
let str;
let val;


function setup() {
  port = createSerial();
  createCanvas(400, 400);

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  button = createButton('Turn On/Off');
  button.position(10, 10);
  button.mousePressed(turnOnLED);
  
}

function draw() {
  
  str = port.readUntil("\n");
  let back = map(str,0,913,0,255);
  console.log("val",  back);

  if(back != 0){
  background(back, back *3, back * 9);
  }
  
}

function connect()
{
  if(!port.opened())
  {
    port.open('Arduino', 9600);
  }
  else{
    port.close();
  }
}

function turnOnLED() {
  // Send '1' to Arduino
  if(isOn)
  {
    port.write('0'); //turn off
    isOn = false;
  }
  else{
    port.write('1');
    isOn = true;
  }
  
}