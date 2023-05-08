//"Visuals of engagement" 
// 16.01.2023
// Julia Stamm
// Operational menue: 
//The code visualizes engagement as a derivative of brain activity whilst watching a lifeperformance of contemporary dance. The Neurolife project (based at Goldsmiths)
// researches what is special about life performance and how we as an audience physio- and neurologically participate in the continuous dialouge between performer and viewer. 
//

// codes I have cited from and want to reference:
//
//https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ 
//https://editor.p5js.org/codingtrain/sketches/6WL2O4vq0
//https://youtu.be/EpgB3cNhKPM
//https://editor.p5js.org/codingtrain/sketches/MkLraatd 
//https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html




// the A array are the first 30 seconds of analysis and the compl. are 5 minutes of the spectral power density.

let a = [11.411, 55.762, 57.182, 53.219, 40.276, 43.492, 38.739, 33.278];
let compl = [
  0.0,
  11.411,
  55.762,
  57.182,
  53.219,
  40.276,
  43.492,
  38.739,
  33.278,
  33.142,
  29.708,
  35.176,
  34.883,
  33.972,
  31.086,
  31.53,
  35.893,
  35.313,
  30.424,
  35.774,
  36.336,
  34.695,
  35.817,
  38.327,
  39.734,
  33.363,
  33.311,
  37.435,
  36.931,
  29.72,
  31.711,
  29.7,
  28.718,
  31.196,
  28.954,
  28.016,
  26.71,
  31.36,
  30.309,
  29.545,
  26.96,
  25.779,
  28.837,
  30.17,
  34.318,
  30.579,
  28.044,
  29.442,
  27.18,
  27.953,
  27.47,
  28.441,
  26.326,
  25.873,
  26.043,
  27.927,
  28.342,
  26.025,
  27.084,
  26.969,
  25.531,
  23.788,
  23.913,
  22.75,
];
let movers = [];
let attractors = [];
let signal;

function setup() {
  createCanvas(1500, 600);

  noiseDetail(0.8);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(50, 150);
    movers[i] = new Mover(x, y, m);
  }
  let a = new Attractor(0, 300, 50, 50);
  attractors.push(a);
  frameCount = 10;
  background(20);
  smooth();
}

function draw() {
  //calling the particles and attractors: this is refrenced from Daniel Shifman
  for (let mover of movers) {
    mover.show();
    mover.update();

    for (let attractor of attractors) {
      attractor.attract(mover);
    }
  }
  for (let attractor of attractors) {
    attractor.show();
// here I include the values from the EEG analysis to be a signal infulencing the attractor
    for (let j = 0; j < a.length; j++) {
      let x = j * 4;
      let h = a[j] * 2;
      let sig = point(x, h + 200);
      attractor.update(sig);
    }
  }
  for (let k = 0; k < compl.length; k++) {
    stroke(255);
    strokeWeight(2);
    let space = width / compl.length;
    let xo = k * space;
    let h = compl[k] * 2;
    let spectralDensity = point(xo, h + 220);
  }
}

// press any key to export the drawing
function keyPressed(){
  save("img.png");  
}