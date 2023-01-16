//based on 2D Water ripples by Dan Shiffman: https://editor.p5js.org/codingtrain/sketches/tYXtzNSl

let cols;
let rows;
let current;
let previous;
let dampening = 1;
let x;
let y;
let test;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  // colorMode(HSB, 360, 100, 100, 100);
  cols = width;
  rows = height;
  current = new Array(cols).fill(100).map(n => new Array(rows).fill(100));
  previous = new Array(cols).fill(100).map(n => new Array(rows).fill(100));
}

function mousePressed(){
  previous[mouseX][mouseY] = 5000;
}
function draw() {
  background(0);
  loadPixels();
  
  //2d array for ripples
  for (let i = 1; i < cols - 1; i++){
    for (let j = 1; j < rows - 1; j++){
    
      current[i][j] = 
        (previous[i - 1][j] + previous[i + 1][j] + previous[i][j - 1] + previous[i][j + 1])/ 2 - current[i][j];
        current[i][j] = current[i][j] * dampening;
      let index = (i +  j * cols) * 4;
      // pixels[index + 0] = current[i][j];
      pixels[index + 0] = 100;
      pixels[index + 1] = current[i][j];
      pixels[index + 2] = 100;
    }
  }

  updatePixels();

  //swap buffers
  let temp = previous;
  previous = current;
  current = temp;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
