
  // global misc. constants
  const VELOCITY_X = 0;
  const VELOCITY_Y = 0;
  const FACING = {
    RIGHT: 0,
    LEFT: 0,
  };
  const STATE = {
    IDLE: 0,
    PATROL: 1,
    ATTACK: 2,
  };
  
  
  // // dragon final boss class
  class Dragon {
    constructor(game, x, y, size) {
      // game engine
      Object.assign(this, { game, x, y, size });
  
        this.originX = this.x;
        this.size = 0;
        this.facing = 1;
        this.state = 0; // 0 = walking, 1 = attacking
        this.dead = false;
      // default spritesheet for the dragon
      if(this.facing === 0)
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Dragon2.png");
      
      else
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DragonRev2.png");
  
      this.lives = 20;
  
      // velocity
      this.velocity = {
        x: VELOCITY_X,
        y: VELOCITY_Y,
      };
  
      // initialize bounding box
      this.updateBB();
  
      // 2d array of animations based on [state][facing]
      this.animations = [];
      this.loadAnimations();
    }
  
    loadAnimations() {
      for (let i = 0; i < 4; i++) {
        this.animations.push([]);
        for (let j = 0; j < 2; j++) {
          this.animations[i].push([]);
        }
      }
  
      // idle
      // facing right = 0
      this.animations[0][0] = new Animator(
        this.spritesheet,
        146,
        0,
        80.02,
        112,
        13,
        0.3,
        false,
        true
      );
  
      this.animations[0][1] = new Animator(
        this.spritesheet,
        17,
        0,
        80.0,
        113,
        13,
        0.2,
        true,
        true
      );
  
      this.animations[1][0] = new Animator(
        this.spritesheet,
        6,
        602,
        134,
        106,
        4,
        0.15,
        false,
        false
      );
      
      this.animations[1][1] = new Animator(
        this.spritesheet,
        726,
        598,
        140,
        115,
        4,
        0.2,
        true,
        true
      );
      
      this.animations[2][0] = new Animator(
        this.spritesheet,
        8,
        739,
        116,
        126,
        5,
        0.2,
        false,
        false
      );
  
      this.animations[2][1] = new Animator(
        this.spritesheet,
        0,
        733,
        120,
        126,
        5,
        0.3,
        false,
        false
      );
  
      this.animations[3][0] = new Animator(
        this.spritesheet,
        479,
        812,
        97,
        32,
        1,
        123,
        false,
        true
      );
  
      this.animations[3][1] = new Animator(
        this.spritesheet,
        479,
        812,
        97,
        32,
        1,
        123,
        false,
        true
      );
  
      
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y + 70,
        PARAMS.BLOCKWIDTH * 4,
        PARAMS.BLOCKWIDTH * 4.8
      );
  
      this.lastFireBox = this.fireBB;
      this.fireBB = new BoundingBox(
        this.x,
        this.y + 20,
        PARAMS.BLOCKWIDTH * 5.5,
        PARAMS.BLOCKWIDTH * 5.2
      )
    }
  
    die() {}
  
    update() {

  
      this.velocity.y += 1;
      //this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
  
      var that = this;

      this.game.entities.forEach(function (entity) {
        if(entity.BB && that.BB.collide(entity.BB) && entity !== that) {
          if (
            (entity instanceof Floor || entity instanceof Platform) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 3.967;
            that.velocity.y = 0;
            //console.log("collided with floor");
  
          } 
        }
        if(that.state !== 3 && that.state !== 2) {
          if (entity.BB && that.fireBB.collide(entity.BB) && entity !== that) {
            if (entity instanceof Knight) {

              that.state = 1;
              that.lastAttack = that.game.clockTick;
                that.timeSinceLastAttack = 0;

            } 
            if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
    
                that.state = 0;
                that.lastAttack = undefined;
            } else {
   
              that.timeSinceLastAttack += that.game.clockTick;
            }

          }
        }
      });
      
      that.updateBB();
    }
  
    loseHeart() {
      this.lives--;
      console.log(this.lives);
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
      } else if(this.lives <= 0 && (this.facing === 0 || this.facing === 1) && !this.dead) {
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
        
      }
      if(this.dead === true) {

        this.state = 3;
        this.animations[this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y + 400,
          5
        );
      }
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeRect(this.fireBB.x - this.game.camera.x, this.fireBB.y, this.fireBB.width, this.fireBB.height);
      }
    }
  }