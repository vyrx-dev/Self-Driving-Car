# Self-Driving Car - How It Works

---

## Instructions for AI Agents

When working on this project:

1. **Read this file first** to understand the codebase structure
2. **Update this file** whenever you add new features, files, or functions
3. Keep explanations short and simple - no fluff
4. Document new properties/methods under the relevant file section
5. If you add a new file, create a new section for it
6. If you add a new concept (like neural network later), add a "How X Works" section

---

## Files Overview

### main.js
Entry point. Sets up canvas, creates road and car, runs the animation loop.

- `animate()` - runs every frame, updates car position, moves camera to follow car, draws everything

### car.js
The main car class with physics and collision.

**Properties:**
- `x, y` - position on canvas
- `width, height` - car dimensions
- `speed` - current speed (positive = forward, negative = reverse)
- `acceleration` - how fast it speeds up (0.2)
- `maxSpeed` - speed cap (3)
- `friction` - slows car down when not pressing gas (0.05)
- `angle` - rotation in radians (0 = facing up)
- `damaged` - true if car hit a border

**Methods:**
- `update(roadBorders)` - called every frame, moves car and checks collision
- `#move()` - handles acceleration, friction, turning, updates x/y position
- `#createPolygon()` - creates 4 corner points of car for collision detection
- `#assessDamage(roadBorders)` - checks if car polygon intersects with any border
- `draw(ctx)` - renders car on canvas (gray if damaged, black if ok)

**Physics explained:**
```
speed += acceleration  (when pressing up)
speed -= friction      (always, to slow down)
x -= sin(angle) * speed
y -= cos(angle) * speed
```
The sin/cos converts angle + speed into x/y movement.

### controls.js
Handles keyboard input.

**Properties:**
- `forward, reverse, left, right` - booleans, true when key is held

**How it works:**
- `onkeydown` sets the flag to true
- `onkeyup` sets it back to false
- car.js reads these flags in `#move()` to decide what to do

### road.js
Creates and draws the road with lanes.

**Properties:**
- `x` - center of road
- `width` - total road width
- `laneCount` - number of lanes (default 5)
- `left, right` - x coordinates of edges
- `top, bottom` - y coordinates (uses big numbers for "infinite" road)
- `borders` - array of line segments for collision [[topLeft, bottomLeft], [topRight, bottomRight]]

**Methods:**
- `getLaneCenter(laneIndex)` - returns x position of a lane's center
- `draw(ctx)` - draws dashed lane dividers and solid borders

### sensor.js
Raycasting sensor attached to car. Detects distance to obstacles.

**Properties:**
- `car` - reference to the car it's attached to
- `rayCount` - number of rays (30)
- `rayLength` - how far rays reach (150px)
- `raySpread` - angle spread in radians (PI/2 = 90 degrees)
- `rays` - array of ray line segments [start, end]
- `readings` - array of intersection points (null if ray didn't hit anything)

**Methods:**
- `update(roadBorders)` - casts rays and checks what they hit
- `#castRays()` - creates ray lines spread across the front of car
- `#getReading(ray, roadBorders)` - finds closest intersection point for a ray
- `draw(ctx)` - yellow line = clear path, red line = blocked

### utils.js
Helper math functions.

**Functions:**
- `lerp(A, B, t)` - linear interpolation. Returns value between A and B based on t (0-1)
  - `lerp(0, 100, 0.5)` returns 50
  - used for smooth transitions and finding positions

- `getIntersection(A, B, C, D)` - finds where line AB crosses line CD
  - returns `{x, y, offset}` if they intersect, null if not
  - offset = how far along line AB the intersection is (0-1)

- `polysIntersect(poly1, poly2)` - checks if two polygons overlap
  - loops through all edges of both polygons
  - returns true if any edges cross

## How Collision Detection Works

1. Car is represented as a polygon (4 corner points)
2. Road borders are line segments
3. Every frame, check if any car edge intersects any border edge
4. If yes, set `damaged = true` and car stops moving

## How Sensors Work

1. Create rays spreading from car's front (like a flashlight cone)
2. For each ray, check if it intersects any road border
3. Store the closest intersection point
4. Yellow = safe distance, Red = obstacle detected
5. This data will later feed into a neural network for self-driving

## The Animation Loop

```
animate() {
  car.update()      // move car, check collision
  canvas.height = window.innerHeight  // clear canvas
  
  ctx.save()
  ctx.translate(0, -car.y + canvas.height * 0.7)  // camera follows car
  
  road.draw()
  car.draw()
  
  ctx.restore()
  requestAnimationFrame(animate)  // loop
}
```
