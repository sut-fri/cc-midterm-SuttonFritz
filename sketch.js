// My code is very broken at the moment. It is not going how I planned, and I am unsure if I should start over with a new idea for my adjective




// let rControl;
// let gControl;
// let bControl;

function setup(){
    createCanvas(windowWidth, windowHeight); //dimentions
    background(250);
}

function draw(){

  // const m = 110;
  
  // const topR = rControl * noise(frameCount / m);
  // const topG = 255 * noise(1000 + frameCount / m);
  // const topB = 255 * noise(2000 + frameCount / m);
  // const bottomR = 255 * noise(4000 + frameCount / m);
  // const bottomG = gControl * noise(5000  + frameCount / m);
  // const bottomB = 255 * noise(6000 + frameCount / m);

  // const topColor = color(topR, topG, topB);
  // const bottomColor = color(bottomR, bottomG, bottomB);
  
  // rControl = map(mouseX, 0, windowWidth/2, 0, 255);
  // gControl = map(mouseY, 0, windowHeight/2, 0, 255);
  // bControl = map(mouseX * mouseY, 0, windowHeight + windowWidth, 0, 255);
  
  // for(let y = 0; y < height; y++) {
  //   const lineColor = lerpColor(topColor, bottomColor, y / height);
  //   stroke(lineColor);
  //   line(0, y, windowWidth, y);
  // }

  for (let x = 0; x <= width - 0; x += 175) { 
    for (let y = 0; y <= height - 0; y += 260) {
      building(x, y);
    }
  }
}

function building(x, y) {
  strokeWeight(0);
  rect(x, y, 75, height); //vertical
  rect(x, y, width, 75); //horizontal
  fill("#5e676e");
}

// function draw() {


//   for (let x = 0; x <= width - 0; x += 175) { 
//     for (let y = 0; y <= height - 0; y += 260) {
//         building(x, y);
//       }
//     }
//   for (let x = 75; x <= width - 75; x += 175) { 
//     for (let y = 60; y <= height - 60; y += 260) {
//         view(x, y);
//       }
//     }
// }

// //make rect grid
// function view(x, y) {
//   strokeWeight(3);
//   strokeCap(SQUARE);
//   noFill();
//   // stroke(black);
//   rect(x, y, 100, 160); 
  
//   depth(x, y);
//   // pane(x, y);
// }



// function depth(x, y) {
//   strokeWeight(15); 
//   strokeCap(SQUARE);
//   // stroke(black);
//   line(x-7, y+160, x+100, y+160);
//   line(x, y, x, y+160);
  
// }