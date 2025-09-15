const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

// Create a new Road object centered on the canvas
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// Create a new Car object
// Places it in the 2nd lane (index 1) and 100 pixels from the top
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// Start the animation loop
animate();

// The main animation loop function
function animate() {
  // Update the car's position and angle
  car.update();

  // Resize canvas to fill the window height (also clears the canvas)
  canvas.height = window.innerHeight;

  // --- Camera and Drawing ---
  // Save the current canvas state (before moving the camera)
  ctx.save();
  // Translate the canvas vertically to create a camera-following effect
  // This keeps the car in the lower 70% of the screen
  ctx.translate(0, -car.y + canvas.height * 0.7);

  // Draw the road and the car in their new positions
  road.draw(ctx);
  car.draw(ctx);

  // Restore the canvas to its original state (removes the camera translation)
  ctx.restore();

  // Request the browser to call animate() again for the next frame
  // This creates a smooth, continuous animation
  requestAnimationFrame(animate);
}
