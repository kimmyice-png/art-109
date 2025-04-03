function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('sketch-container'); // Attach the canvas to the container div


  colorMode(HSB);

  // Set angle mode so that atan2() returns angles in degrees
  angleMode(DEGREES);

  describe('Two eyes that follow the cursor.');
  
}

function draw() {
  background(0);

  // Draw left eye

  let leftX = windowWidth/2 -200;
  let leftY = windowHeight/2;

  // Calculate angle between left eye and mouse
  let leftAngle = atan2(mouseY - leftY, mouseX - leftX);

  push();
  translate(leftX, leftY);
  fill(255);
  ellipse(0, 0, 200, 200);
  rotate(leftAngle);
  fill(0);
  ellipse(25, 0, 100, 100);
  fill(255);
  pop();

  // Draw right eye

  let rightX = windowWidth/2 +200;
  let rightY = windowHeight/2;

  // Calculate angle between right eye and angle
  let rightAngle = atan2(mouseY - rightY, mouseX - rightX);

  push();
  translate(rightX, rightY);
  fill(255);
  ellipse(0, 0, 200, 200);
  rotate(rightAngle);
  fill(0);
  ellipse(25, 0, 100, 100);
  pop();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}