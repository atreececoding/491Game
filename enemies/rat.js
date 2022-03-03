
class Rat {
    constructor(game, x, y, size) {
      Object.assign(this, { game, x, y, size});
  
      this.velocity = { x: -50, y: 0 };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ratAndBat.png");
      this.spritesheetRev = ASSET_MANAGER.getAsset("./sprites/ratAndBatRev.png");
  
      this.size = 0;
      this.facing = 0;
      this.state = 0; // 0 = idle, 1 = walking, 2 = dying
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
    let X_OFFSET = 7;
    let WIDTH = 32;
    let HEIGHT = 18;
    let HEIGHT2 = 22;
    let FRAME_COUNT = 10;
    let ANIMATION_SPEED_1 = 0.1;
    let Y_OFFSET_0 = 22;
    let Y_OFFSET_1 = 86;
    let Y_OFFSET_2 = 148;
    let REVERSE = true;
    let NO_REVERSE = false;
    let LOOP = true;
    let NO_LOOP = false;

      // hovering right (directions are flipped because of sprite sheet)
      this.animations[0][0] = new Animator(
        this.spritesheet,
        X_OFFSET, Y_OFFSET_0, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, LOOP
      );
      
      this.animations[0][1] = new Animator(
        this.spritesheet,
        X_OFFSET, Y_OFFSET_0, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, LOOP
      );
  
      this.animations[1][0] = new Animator(
        this.spritesheet,
        X_OFFSET, Y_OFFSET_1, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, LOOP
      );
  
      this.animations[1][1] = new Animator(
        this.spritesheetRev,
        X_OFFSET, Y_OFFSET_1, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, LOOP
      );
  
      this.animations[2][0] = new Animator(
        this.spritesheet,
        X_OFFSET, Y_OFFSET_2, WIDTH, HEIGHT2, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, NO_LOOP
      );
  
      this.animations[2][1] = new Animator(
        this.spritesheetRev,
        X_OFFSET, Y_OFFSET_2, WIDTH, HEIGHT2, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, NO_LOOP
      );
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y,
        PARAMS.BLOCKWIDTH * 0.6,
        PARAMS.BLOCKHEIGHT * 0.3
      );
  
      this.lastRunBB = this.runBB;
      this.runBB = new BoundingBox(
        this.x - 200,
        this.y - PARAMS.BLOCKHEIGHT,
        PARAMS.BLOCKWIDTH * 5,
        PARAMS.BLOCKHEIGHT * 2
      );
    }
  
    die() {}
  
    update() {
 
          this.velocity.y += 100;
          this.y += this.game.clockTick * this.velocity.y;
      var that = this;
      this.game.entities.forEach(function (entity) {
        if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
          
          if (
            (entity instanceof Floor || entity instanceof Platform) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 0.3;
            that.velocity.y = 0;
          }
        }
        
        if(that.state !== 2) {
          if (entity.BB && that.runBB.collide(entity.BB) && entity !== that) {
            if (entity instanceof Knight && !(that.BB.collide(entity.BB))) {
              if(entity.BB.x > that.x) {
                that.facing = 1;
                that.state = 1;
                that.velocity.x = 100;
                
              }
              else if(entity.BB.x < that.x) {
                that.facing = 0;
                that.state = 1;
                that.velocity.x = -100;
              }
              that.x += that.game.clockTick * that.velocity.x;
            }
          }
        }
      });
  
      
      
      this.updateBB();
    }
  
    loseHeart() {
      this.lives--;
      ASSET_MANAGER.playSFX('./sfx/rat_hurt.wav');
      

    //   console.log(this.lives);
      if(this.lives <= 0) {
        this.state = 2;
      }
    }
  
    draw(ctx) {
      if(this.lives > 0) {
        this.animations[this.state][this.facing].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        5
        );
      } else if(this.lives <= 0 && (this.facing === 0 || this.facing === 1)) {
        this.velocity.x = 0;
        this.animations[this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y,
          5
        );
        if(this.animations[this.state][this.facing].isDone()) {
          this.dead = true;
        }
        if(this.dead === true) {
          this.removeFromWorld = true;
        }
      }
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = "White";
        ctx.strokeRect(this.runBB.x - this.game.camera.x, this.runBB.y, this.runBB.width, this.runBB.height);
      }
    }
  }