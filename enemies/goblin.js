
class Goblin {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size });

    this.velocity = { x: 0, y: 0 };
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblinSprite.png");

    this.patLeft = this.x - 250;
    this.patRight = this.x;
    this.size = 0;
    this.facing = 0;
    this.state = 0; // 0 = walking, 1 = attacking, 2 = dying
    this.dead = false;
    this.lives = 50;
    this.flicker = true;
    this.speed = 100;

    this.fallAcc = 560;

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
     let X_OFFSET = 9;
     let X_OFFSET2 = 0;
     let WIDTH = 64;
     let WIDTH2 = 65;
     let HEIGHT = 54;
     let HEIGHT2 = 50;
     let FRAME_COUNT = 7;
     let FRAME_COUNT2 = 5;
     let ANIMATION_SPEED_1 = 0.15;
     let Y_OFFSET_0 = 194;
     let Y_OFFSET_1 = 67;
     let Y_OFFSET_2 = 451;
     let Y_OFFSET_3 = 324;
     let Y_OFFSET_4 = 515;
     let REVERSE = true;
     let NO_REVERSE = false;
     let LOOP = true;
     let NO_LOOP = false;

    //walking right and left
    //facing right = 0
    this.animations[0][0] = new Animator(
      this.spritesheet,
      X_OFFSET, Y_OFFSET_0, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, LOOP
    );
    //facing left = 1
    this.animations[0][1] = new Animator(
      this.spritesheet,
      X_OFFSET, Y_OFFSET_1, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, LOOP
    );

    //Attacking
    //facing right = 0
    this.animations[1][0] = new Animator(
      this.spritesheet,
      X_OFFSET2, Y_OFFSET_2, WIDTH, HEIGHT, FRAME_COUNT2, ANIMATION_SPEED_1, NO_REVERSE, LOOP
    );
    //facing left = 1
    this.animations[1][1] = new Animator(
      this.spritesheet,
      X_OFFSET2, Y_OFFSET_3, WIDTH, HEIGHT, FRAME_COUNT2, ANIMATION_SPEED_1, REVERSE, LOOP
    );


    this.animations[2][0] = new Animator(
      this.spritesheet,
      X_OFFSET2, Y_OFFSET_4, WIDTH2, HEIGHT2, FRAME_COUNT2, ANIMATION_SPEED_1, NO_REVERSE, NO_LOOP
    );

    this.animations[2][1] = new Animator(
      this.spritesheet,
      X_OFFSET2, Y_OFFSET_4, WIDTH2, HEIGHT2, FRAME_COUNT2, ANIMATION_SPEED_1, NO_REVERSE, NO_LOOP
    );

  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * .9,
      PARAMS.BLOCKHEIGHT * 0.93
    );
    this.lastRunBB = this.runBB;
      this.runBB = new BoundingBox(
        this.x - 175,
        this.y,
        PARAMS.BLOCKWIDTH * 5,
        PARAMS.BLOCKHEIGHT
      );
  }

  die() {}

  
  update() {
    
    //Patrolling is hardcoded need to fix
    // if (this.x <= this.patLeft && this.facing === 1) {
    //   this.x = this.patLeft;
    //   this.velocity.x = 75;
    //   this.facing = 0;
    // } 
    // if (this.x >= this.patRight && this.facing === 0) {
    //   this.x = this.patRight;
    //   this.velocity.x = -75;
    //   this.facing = 1;
    // }
    
    // this.velocity.y += this.fallAcc * this.game.clockTick;
    // //this.patrol();
    // this.x += this.game.clockTick * this.velocity.x;
    // this.y += this.game.clockTick * this.velocity.y;
    // this.updateBB();

    if (this.hurt) {
      if (this.hurtTimer === undefined) {
        this.hurtTimer = 0;
      } else {
        this.hurtTimer += this.game.clockTick;
      }
      const GOBLIN_KNOCKBACK_TIME = .1;
      if (this.hurtTimer > GOBLIN_KNOCKBACK_TIME) {
        this.hurt = false;
        this.hurtTimer = 0;
      }
      this.velocity.x = this.facing === 0 ? -75 : 75;
      this.velocity.y += this.fallAcc * this.game.clockTick;
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
    } else {
      // Patrolling is hardcoded need to fix
      //this.patrol();
      this.velocity.y += this.fallAcc * this.game.clockTick;
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
    }
    var that = this;
    // that.patLeft = that.x - 250;
    // that.patRight = that.x;
    this.game.entities.forEach(function (entity) {
      if(that.state !== 2) {
        if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
          if (entity instanceof Knight && that.state != 2) {
            that.state = 1;
            that.velocity.x = 0;
            // TO STOP THE KNIGHT FROM GOING THROUGH THE GOBLIN
            if (that.facing === 1) {
              that.x = entity.BB.right ;
            }
            else {
              that.x = entity.BB.left - that.BB.width;
            }
            /////////////////////////////////////////////////////
            that.lastAttack = that.game.clockTick;
            that.timeSinceLastAttack = 0;
            
            entity.state = 5;
          
          } else if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
              that.velocity.x = 0;
              if (that.facing === 0) {
                that.velocity.x = 75;
                that.lastAttack = undefined;
              } 
              if (that.facing === 1) {
                that.velocity.x = -75;
                that.lastAttack = undefined;
              }
            that.state = 0;
          } else {
            that.timeSinceLastAttack += that.game.clockTick;
          }
        }
      }
      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
        if (
          
          (entity instanceof Floor || entity instanceof Platform) &&
          that.lastBB.bottom <= entity.BB.top
        ) {
          that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 0.93;
          that.velocity.y = 0;

        } 
      }
      else if (entity.BB && that.runBB.collide(entity.BB) && entity !== that) {
        if (entity instanceof Knight && !(that.BB.collide(entity.BB)) ) {
          if(entity.BB.x > that.x) {
            that.facing = 0;
            //that.state = 1;
            that.velocity.x = 100;
          
            that.patRight = that.x + 250;
            that.patLeft = that.x;
            
          }
          else if(entity.BB.x < that.x) {
            that.facing = 1;
            //that.state = 1;
            that.velocity.x = -100;
            that.patLeft = that.x - 250;
            that.patRight = that.x;
            
          }
          //that.x += that.game.clockTick * that.velocity.x;
        }
        // that.patLeft = that.x - 250;
        // that.patRight = that.x;
      }
      else {
        
        that.velocity.y += that.fallAcc * that.game.clockTick;
        that.patrol();
        // that.x += that.game.clockTick * that.velocity.x;
        // that.y += that.game.clockTick * that.velocity.y;
        // that.updateBB();
      }
      
    });
    that.updateBB();
  }
  loseHeart() {
    this.lives--;
    console.log(this.lives);
    this.hurt = true;
    ASSET_MANAGER.playSFX('./sfx/goblin_hurt.wav');
    
    // console.log(this.lives);
    if(this.lives <= 0) {
      this.state = 2;
    }
  }
  bounce() { //Goblin jumpback
    if(this.facing == 0) {
      //console.log("working");
      this.velocity.x = -250;
      this.velocity.y = -100;
      this.x += this.velocity.x * this.game.clockTick;
      this.y += this.velocity.y * this.game.clockTick;

      this.updateBB();
    }
    else {
      //console.log("working");
      this.velocity.x = 250;
      this.velocity.y = -100;
      this.x += this.velocity.x * this.game.clockTick;
      this.y += this.velocity.y * this.game.clockTick;

    this.updateBB();
    }
  }
  patrol() {
    if (this.x <= this.patLeft && this.facing === 1) {
      this.x = this.patLeft;
      this.velocity.x = 75;
      this.facing = 0;
    } 
    if (this.x >= this.patRight && this.facing === 0) {
      this.x = this.patRight;
      this.velocity.x = -75;
      this.facing = 1;
    }
  }

  draw(ctx) {
    
    if(this.lives > 0) {
      if (this.flicker || !this.hurt) {
        this.animations[this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y,
          2.45
          );
      }
      if (this.flickerTimer === undefined) {
        this.flickerTimer = 0;
      } else {
        this.flickerTimer += this.game.clockTick;
      }
      if (this.flickerTimer > 0.2) {
        this.flicker = !this.flicker;
        this.flickerTimer = undefined;
      }
    } else if(this.lives <= 0 && (this.facing === 0 || this.facing === 1)) {
      this.velocity.x = 0;
      this.animations[this.state][this.facing].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        2.45
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
