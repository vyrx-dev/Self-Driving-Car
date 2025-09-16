class Road {
  constructor(x, width, laneCount = 5) {
    this.x = x; // The center x-coordinate of the road
    this.width = width; // The total width of the road
    this.laneCount = laneCount; // Number of lanes

    // Calculate the left and right edges of the road
    this.left = x - width / 2;
    this.right = x + width / 2;

    // Use a very large number to simulate an infinitely long road
    const infinity = 1000000;
    this.top = -infinity; // Top y-coordinate (negative for upward)
    this.bottom = infinity; // Bottom y-coordinate

    // Define the four corners of the road for drawing borders
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    // Store the border lines as pairs of points
    this.borders = [
      [topLeft, bottomLeft], // Left border
      [topRight, bottomRight] // Right border
    ];
  }

  // Helper function to find the center x-coordinate of a specific lane
  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    // Calculate the center of the lane, ensuring the index is valid
    return this.left + laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth;
  }

  // Draws the road on the canvas
  draw(ctx) {
    ctx.lineWidth = 5; // Set the thickness of the lines
    ctx.strokeStyle = "cyan"; // Set the color of the lines

    // --- Draw Lane Lines ---
    // Loop to draw the dashed lines between lanes
    for (let i = 1; i <= this.laneCount - 1; i++) {
      // Use lerp to find the x-position for each lane line
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount
      );

      // Use a dashed line effect
      ctx.setLineDash([20, 20]);

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    // --- Draw Road Borders ---
    ctx.setLineDash([]); // Reset to solid lines
    this.borders.forEach(border => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y); // Start of the border line
      ctx.lineTo(border[1].x, border[1].y); // End of the border line
      ctx.stroke();
    });
  }
}
