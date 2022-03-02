class GameEngine {
  constructor(options) {
    // What you will use to draw
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = null;

    // Everything that will be updated and drawn each frame
    this.entities = [];

    // Information on the input
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.keys = {};

    // THE KILL SWITCH
    this.running = false;

    // Options and the Details
    this.options = options || {
      prevent: {
        contextMenu: true,
        scrolling: true,
      },
      debugging: false,
    };
  }

  init(ctx) {
    this.ctx = ctx;
    this.startInput();
    this.timer = new Timer();
  }

  start() {
    this.running = true;
    const gameLoop = () => {
      this.loop();
      if (this.running) {
        requestAnimFrame(gameLoop, this.ctx.canvas);
      }
    };
    gameLoop();
  }


  inputToggle(onOrOff) {
    var that = this;
    // EVENT LISTENERS
      
    function leftClick(e) {
      // e.preventDefault();
      // if (that.options.debugging) console.log("LEFT_CLICK");
      that.keys["click"] = true;
    }

    window.addEventListener(
      "mousedown",
      function(e) {
          switch (e.button) {
            case 0:
            that.attack = true;
            // if (that.options.debugging) console.log("Click clicked");
            that.keys["attack"] = true;
            break;
          }
        },
        false
    );

    window.addEventListener(
      "mouseup",
      function(e) {
        // e.preventDefault();
          switch (e.button) {
            case 0:
            that.attack = false;
            // if (that.options.debugging) console.log("Click unclicks");
            that.keys["attack"] = false;
            break;
          }
        },
        false
    );

    function keyDown(e) {
      // e.preventDefault();
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          that.keys["left"] = true;
          // if (that.options.debugging) console.log("Left/A pressed");
          break;
        case "ArrowRight":
        case "KeyD":
          that.keys["right"] = true;
          // if (that.options.debugging) console.log("Right/D pressed");
          break;
        case "ArrowUp":
        case "KeyW":
          that.keys["up"] = true;
          // if (that.options.debugging) console.log("Up/W pressed");
          break;
        case "ArrowDown":
        case "KeyS":
          that.keys["down"] = true;
          // if (that.options.debugging) console.log("Down/S pressed");
          break;
        case "Digit1":
          that.keys["one"] = true;
          // if (that.options.debugging) console.log("Down/S pressed");
          break;
        case "Digit2":
          that.keys["two"] = true;
          // if (that.options.debugging) console.log("Down/S pressed");
          break;
        case "Digit3":
          that.keys["three"] = true;
          // if (that.options.debugging) console.log("Down/S pressed");
          break;
        case "Space":
          that.keys["space"] = true;
          // if (that.options.debugging) console.log("Space pressed");
          break;
        case "ShiftLeft":
          that.keys["shift"] = true;
          // if (that.options.debugging) console.log("Shift pressed");
          break;
      }
    }

    function keyUp(e) {
      e.preventDefault();
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          that.keys["left"] = false;
          // if (that.options.debugging) console.log("Left/A released");
          break;
        case "ArrowRight":
        case "KeyD":
          that.keys["right"] = false;
          // if (that.options.debugging) console.log("Right/D released");
          break;
        case "ArrowUp":
        case "KeyW":
          that.keys["up"] = false;
          // if (that.options.debugging) console.log("Up/W released");
          break;
        case "ArrowDown":
        case "KeyS":
          that.keys["down"] = false;
          // if (that.options.debugging) console.log("Down/S released");
          break;
        case "Space":
          that.keys["space"] = false;
          // if (that.options.debugging) console.log("Space released");
          break;
        case "ShiftLeft":
          that.keys["shift"] = false;
          // if (that.options.debugging) console.log("Shift released");
          break;
      }
    }


    if (onOrOff === "start") {
      that.clickListener = leftClick;
      that.keyDownListener = keyDown;
      that.keyUpListener = keyUp;
      that.ctx.canvas.addEventListener("click", that.clickListener);
      that.ctx.canvas.addEventListener("keydown", that.keyDownListener);
      that.ctx.canvas.addEventListener("keyup", that.keyUpListener);
      if (that.options.debugging) console.log("INPUT STARTED!");
    } else if (onOrOff === "stop") {
      that.ctx.canvas.removeEventListener("click", that.clickListener);
      that.ctx.canvas.removeEventListener("keydown", that.keyDownListener);
      that.ctx.canvas.removeEventListener("keyup", that.keyUpListener);
      for (const [key, value] of Object.entries(that.keys)) {
        that.keys[key] = false;
      }
      if (that.options.debugging) console.log("INPUT DISABLED!");
    } else {
      throw new Error("ERROR: WRONG USAGE OF inputToggle(), please pass in 'start' or 'stop'");
    }
  }

  startInput() {
    this.inputToggle("start");
  }

  pauseInput() {
    this.inputToggle("stop");
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  draw() {
    // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Draw latest things first
    for (let i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].draw(this.ctx, this);
    }
    this.camera.draw(this.ctx);
  }

  update() {
    let entitiesCount = this.entities.length;

    for (let i = 0; i < entitiesCount; i++) {
      let entity = this.entities[i];

      if (!entity.removeFromWorld) {
        entity.update();
      }
    }
    this.camera.update();

    for (let i = this.entities.length - 1; i >= 0; --i) {
      if (this.entities[i].removeFromWorld) {
        this.entities.splice(i, 1);
      }
    }
  }

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
  }
}
