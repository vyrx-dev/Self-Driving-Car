class Car {
  constructor(x, y, width, height) {
    // --- Car's Physical Properties ---
    this.x = x; // Initial x-position (horizontal)
    this.y = y; // Initial y-position (vertical)
    this.width = width; 
    this.height = height; 

    // --- Movement Dynamics ---
    this.speed = 0; // Current speed
    this.acceleration = 0.2; // How fast the car speeds up
    this.maxSpeed = 3; // The maximum forward speed
    this.friction = 0.05; // Force that slows the car down
    this.angle = 0; // The car's current angle (0 is facing up)

    //load car image
    this.img = new Image();
    this.img.src = "images/car.png";
    
    this.sensor=new Sensor(this);
    this.controls = new Controls();

    
  }

  update() {
    this.#move();
    this.sensor.update();
  }

  #move() {
    // --- Acceleration and Reversing ---
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    // --- Speed Limiting ---
    // Cap the forward speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    // Cap the reverse speed (at half the max forward speed)
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // --- Friction ---
    // Apply friction to slow down the car when moving forward
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    // Apply friction when moving in reverse
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    // Stop the car completely if the speed is very low
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // --- Turning Logic ---
    // Only allow turning if the car is actually moving
    if (this.speed != 0) {
      // Flip the turning direction when reversing
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    // --- Position Update ---
    // Update the car's x and y position based on its angle and speed
    // Uses trigonometry (sin and cos) to calculate horizontal and vertical movement
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  // Draws the car on the canvas
  draw(ctx) {
    // Save the current canvas context
    ctx.save();
    // Translate the canvas to the car's position
    ctx.translate(this.x, this.y);
    // Rotate the canvas to the car's angle
    ctx.rotate(-this.angle);

    // Draw the car as a rectangle
    // The rectangle is drawn centered at the new (0,0) coordinates
    // ctx.beginPath();
    // ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.fillStyle = ("yellow");
    // ctx.fill();

    //Draw the image instead of rectangle
    ctx.drawImage(
      this.img,
      -this.width / 2
      , -this.height / 2,
      this.width,
      this.height
    );
    // Restore the canvas to its original state (before translate/rotate)
    ctx.restore();
    this.sensor.draw(ctx);
  }
}
