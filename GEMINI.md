# Project Overview

This project is a simple self-driving car simulation created entirely with vanilla JavaScript and HTML5 Canvas. It demonstrates basic concepts of 2D graphics, physics, and user input handling in a web browser. The project has no external library dependencies.

## Key Technologies

*   **HTML5 Canvas:** Used for rendering the car and the environment.
*   **JavaScript (ES6):** The core logic of the simulation is written in modern JavaScript.

## Architecture

The project is structured into the following files:

*   `index.html`: The main entry point of the application.
*   `style.css`: Defines the visual style of the simulation.
*   `car.js`: Implements the `Car` class, which encapsulates the car's properties (position, speed, angle) and behavior (movement, drawing).
*   `controls.js`: Implements the `Controls` class, which handles keyboard input for controlling the car.
*   `main.js`: Initializes the simulation, creates the car object, and runs the main animation loop.

# Building and Running

This is a simple web project with no build process. To run the simulation, you just need to open the `index.html` file in a web browser.

You can use a simple HTTP server to serve the files. For example, if you have Python installed, you can run the following command in the project's root directory:

```bash
python -m http.server
```

Then, open your web browser and navigate to `http://localhost:8000`.

# Development Conventions

The code is written in a simple, object-oriented style.

*   **Classes:** The `Car` and `Controls` classes are used to organize the code.
*   **No Libraries:** The project intentionally avoids using any external libraries or frameworks.
*   **Animation:** The `requestAnimationFrame` API is used for the main animation loop, which ensures smooth rendering.
