class Controls {
  constructor() {
    // --- Control Flags ---
    // These properties act as flags to know which key is currently pressed.
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    // Call the private method to add keyboard listeners
    // The # indicates it's a private method, meant to be used only inside this class.
    this.#addKeyboardListeners();
  }

  // Private method to handle keyboard events
  #addKeyboardListeners() {
    // --- Key Down Event ---
    // This function is triggered whenever a key is pressed down.
    document.onkeydown = (event) => {
      // A switch statement to check which key was pressed.
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
      // Optional: Useful for debugging to see the state of controls.
      // console.table(this);
    };

    // --- Key Up Event ---
    // This function is triggered whenever a key is released.
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
      // Optional: Useful for debugging.
      // console.table(this);
    };
  }
}