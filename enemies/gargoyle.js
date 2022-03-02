class Gargoyle {
    constructor(game, x, y, size) {
      Object.assign(this, { game, x, y, size });
  
      this.velocity = { x: 0, y: 0 };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/gargoyle.png");
  
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
      let WIDTH = 63;
      let HEIGHT = 70;
      let FRAME_COUNT1 = 1;
      let FRAME_COUNT2 = 4;
      let ANIMATION_SPEED_1 = 0.1;
      let Y_OFFSET_0 = 16;
      let REVERSE = true;
      let NO_REVERSE = false;
      let LOOP = true;
      let NO_LOOP = false;
      
      

      // standing still
      this.animations[0][0] = new Animator(
        this.spritesheet,
        X_OFFSET,
        Y_OFFSET_0,
        WIDTH,
        HEIGHT,
        FRAME_COUNT1,
        ANIMATION_SPEED_1,
        NO_REVERSE,
        LOOP
      );

      // idle
      this.animations[1][0] = new Animator(
        this.spritesheet,
        X_OFFSET,
        Y_OFFSET_0,
        WIDTH,
        HEIGHT,
        FRAME_COUNT2,
        ANIMATION_SPEED_1,
        NO_REVERSE,
        LOOP
      );
      
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        PARAMS.BLOCKWIDTH * .8,
        PARAMS.BLOCKHEIGHT * .9
      );

      this.lastActivationBB = this.activationBB;

      const activationBBWidth = this.BB.width * 5;
      this.activationBB = new BoundingBox(
          this.x - floor(activationBBWidth / 2),
          this.y,
          activationBBWidth,
          this.BB.height
      );
    }
  
    die() {}
  
    update() {
      
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
        

      if (this.activationBB.collide(this.game.camera.knight.BB)) {
        this.state = 1;
      } else if (!this.activationBB.collide(this.game.camera.knight.BB)) {
          if (this.becomeStillTimer === undefined) {
              this.becomeStillTimer = 0;
          } else {
              this.becomeStillTimer += this.game.clockTick;
          }
          if (this.becomeStillTimer > 1) {
              this.state = 0;
              this.becomeStillTimer = undefined;
          }
      }
    }
  
    loseHeart() {
      this.lives--;
    }
  
    draw(ctx) {
  
        this.animations[this.state][this.facing].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        this.size
        );
      
     
        if (this.game.options.debugging) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = "White";
            ctx.strokeRect(this.activationBB.x - this.game.camera.x, this.activationBB.y, this.activationBB.width, this.activationBB.height);
        }
    }


  }