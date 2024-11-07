let particles = [];
let centerX, centerY;
let startTime;
let snowflakes = [];
let snowStopped = false;
let radius = 10;

function setup() {
  createCanvas(displayWidth, displayHeight); //canvas is screen sized 
  startTime = millis(); //assigns amount of milliseconds to startTime
  centerX = displayWidth / 2; //finds the center of screen on the x-axis
  centerY = displayHeight / 2; //finds the center of screen on the y-axis
}

function draw() {
  let elapsedTime = millis() - startTime; //finds the net time change
  if (elapsedTime > 9000) { //if over 9 sec have passed...
    noStroke(); //no outlines
    let opacity = map(elapsedTime - 9000, 0, 3000, 0, 180); //fades for 3 sec to 180 opacity
    opacity = constrain(opacity, 0, 180); //fades from 0 opacity to 180 opacity
    background(opacity); //sets the background to fade according to opacity's parameters
    rect(0, centerY + 100, displayWidth, displayHeight); //makes the ground
  } else {
    background(0); //makes background black when elapsedTime is greater than 9 sec
  }
  particles.push(new Ring(centerX, centerY)); //puts Ring particles into an array at ceter of x-axis and y-axis
  for (let i = particles.length - 1; i >= 0; i--) { //loops through the array
    noStroke(); 
    particles[i].update(); //transforms Ring particle
    particles[i].show(); //displayes transformed Ring particle
    if (particles[i].alpha <= 0) { //blocks fully transparent particles from displaying
      particles.splice(i, 1);
    }
  }
  if (elapsedTime > 9000) {
    let opacity = map(elapsedTime - 9000, 0, 3000, 0, 255); //fades in house in 3 sec
    opacity = constrain(opacity, 0, 255); 
    fill(220, opacity); 
    rect(centerX - 100, centerY - 50, 200, 150); //house
    triangle(centerX - 125, centerY - 50, centerX, centerY - 150, centerX + 125, centerY - 50); //house roof
  }
  if (elapsedTime > 9000) {
    let opacity = map(elapsedTime - 9000, 0, 5000, 0, 255); //fades in ground in 5 sec
    opacity = constrain(opacity, 0, 255); 
    fill(200, opacity); 
    rect(0, centerY + 100, width, height); //ground
  }
  if (elapsedTime > 17000) {
    fill(0); 
    ellipse(centerX, centerY, radius * 2, radius * 2); // draws a circle at center of display
    radius += 3; // increses radius by 3 for each frame
  }
  //flashlight
  if (elapsedTime > 29000) { 
    let opacity = map(elapsedTime - 29000, 0, 20000, 0, 255); 
    opacity = constrain(opacity, 0, 255);
    for (let x = 0; x < width; x += 10) { //double for loop calculates a grid of the entire display with each unit 10px sq
      for (let y = 0; y < height; y += 10) {
        let distance = dist(x, y, mouseX, mouseY); //finds distance from cursor
        let maxDistance = centerX; //starting size of light
        let intensity = map(distance, 0, maxDistance, 255, 0); //ombre with dimmer light the further away a unit is from the cursor
        let r = map(intensity, opacity, 255, 0, opacity); //assigns the rgb value to each unit but decreases intesity over time
        let g = map(intensity, opacity, 255, 5, opacity);
        let b = map(intensity, opacity, 255, 5, opacity);
        fill(r, g, b);
        rect(x, y, 10, 10);
      }
    }
    //makes black house
    fill(0); 
    stroke(0);
    strokeWeight(2);
    rect(centerX - 100, centerY - 50, 25, 150);
    rect(centerX - 75, centerY - 50, 30, 75);
    rect(centerX - 45, centerY - 50, 50, 150);
    rect(centerX + 5, centerY - 50, 50, 50);
    rect(centerX + 5, centerY + 50, 50, 50);
    rect(centerX + 55, centerY - 50, 45, 150);
    line(centerX + 30, centerY + 50, centerX + 30, centerY - 50);
    line(centerX + 5, centerY + 25, centerX + 55, centerY + 25);
    triangle(centerX - 125, centerY - 50, centerX, centerY - 150, centerX + 125, centerY - 50);
  }
  if (elapsedTime > 6000) {
    noStroke();
    fill(111, 124, 140, 80);
    let t = frameCount / 60; //60 frames per sec
    if (t > 22) { //if 22 sec have passes...
      snowStopped = true; //flags snowStopped
    }
    if (!snowStopped) { //if NOT snowStopped...
      for (let i = 0; i < random(5); i++) { //loops randomly between 0 and 5 times. Adds a new snowflake per loop
        snowflakes.push(new snowflake());
      }
    }
    for (let flake of snowflakes) {
      flake.update(t);
      flake.display();
    }
  }
}

class Ring {
  constructor(x, y) {
    this.angle = -1.5; //starting point of ring
    this.radius = 300; //radius of ring
    this.rotationSpeed = random(0.01, 0.03); //random movement speed between 0.01 and 0.03
    this.alpha = 255; //fully opaque
    this.size = random(20, 30); //random size between 20 and 30
    this.auraSize = this.size * 3; //adds an aura around particle 3 times bigger than it
  }
  update() {
    this.angle += this.rotationSpeed; //changes angle of particles to make it look like the ring is spining
    this.alpha -= 0.5; //particles fade over time
  }
  show() {
    let x = centerX + cos(this.angle) * this.radius; //location of particle
    let y = centerY + sin(this.angle) * this.radius;
    noStroke();
    fill(251, 251, 251, 3); //blueish-gray at 3 opacity
    ellipse(x, y, this.auraSize); //displays aura 
    fill(251, 251, 251, this.alpha);
    ellipse(x, y, this.size); //displays particle
  }
}

function snowflake(){
  this.posX = 0; //left side of display
  this.posY = random(-50, 0); //random location between -50 and 0 for height
  this.initialangle = random(0, 2 * PI); //angle the snowflake appears on display
  this.size = random(5, 10); //random snowflake size between 5 and 10
  this.radius = sqrt(random (pow (centerX, 2))); //sworlls the snowflake along x-axis
  this.update = function(time) {
    let movement = 0.6; //how fidgetty the snowflake is
    let angle = movement * time + this.initialangle; //changes snowflake's movement over time
  	this.posX = centerX + this.radius * sin(angle); //sways snowflake left to right depending on the sin of the angle
    this.posY += pow(this.size, 0.5); //adds grvity physics: the bigget the snowflake, the faster it falls
    if(this.posY > height) { //removes the snowflakes past the display on the y-axis
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  }
  this.display = function() {
    ellipse(this.posX, this.posY, this.size); //displays snowflake 
  }
}