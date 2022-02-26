class Bat {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size });

    this.velocity = { x: 0, y: -10 };
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ratAndBat.png");


    this.downPat = this.y;
    this.upPat = this.y - 500;
    this.patRight = this.x + 200;
    this.patLeft = this.x;
    this.size = 0;
    this.facing = 0;
    this.state = 0;
    this.dead = false;
    this.lives = 1;

    this.updateBB();

    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    for (var i = 0; i < 7; i++) {
      this.animations.push([]);
      for (var j = 0; j < 2; j++) {
        this.animations.push([i]);
      }
    }

    // CONSTANTS
    let X_OFFSET = 0;
    let WIDTH = 32;
    let HEIGHT = 15;
    let FRAME_COUNT = 10;
    let ANIMATION_SPEED_1 = 0.1;
    let Y_OFFSET_0 = 172;
    let REVERSE = true;
    let NO_REVERSE = false;
    let LOOP = true;
    let NO_LOOP = false;

    //hovering right (directions are flipped because of sprite sheet)
    this.animations[0][0] = new Animator(
      this.spritesheet,
      X_OFFSET,
      Y_OFFSET_0,
      WIDTH,
      HEIGHT,
      FRAME_COUNT,
      ANIMATION_SPEED_1,
      NO_REVERSE,
      LOOP
    );
    
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x + 35,
      this.y - 10,
      PARAMS.BLOCKWIDTH * 0.8,
      PARAMS.BLOCKHEIGHT * 0.3
    );
  }

  die() {}

  update() {
    // this is hardcoded need to fix
    let scale = 1 + Math.random();
    if (this.x <= this.patLeft /*&& this.facing === 1*/) {
      // console.log("got left");
      this.x = this.patLeft;
      this.velocity.x = 100 * scale;
      //this.facing = 0;
    } 
    if (this.x >= this.patRight /*&& this.facing === 0*/) {
      // console.log("got right");
      this.x = this.patRight;
      this.velocity.x = -100 * scale;
      //this.facing = 1;
    }
    if (this.y <= this.upPat) {
      //this.y = this.patUp;
      this.velocity.y = 100 * scale;
      // console.log(this.velocity.y);
    } 
    if (this.y >= this.downPat) {
      //this.y = this.patDown;
      this.velocity.y = -100 * scale;
    }
    this.x += this.game.clockTick * this.velocity.x;
    this.y += this.game.clockTick * this.velocity.y;
    this.updateBB();
  }

  loseHeart() {
    this.lives--;
    console.log(this.lives);
    if(this.lives <= 0) {
    this.state = 2;
  }
  }

  draw(ctx) {

    this.animations[this.state][this.facing].drawFrame(
    this.game.clockTick,
    ctx,
    this.x - this.game.camera.x,
    this.y,
    5
    );
    
      // if(this.animations[this.state][this.facing].isDone()) {
      //   this.dead = true;
      // }
      // if(this.dead === true) {
      //   this.removeFromWorld = true;
      // }
    
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
  }
}