function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
  }
  
  function draw() {
  
      normalMaterial();
    strokeWeight(1);
    stroke(255);
    orbitControl(5, 5);
    sphere(mouseX);
  
    fill(90, 10, 10);
      square(mouseX, mouseY, 50);
    
  
    
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }