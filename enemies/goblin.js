
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
    this.lives = 250;

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
    
    // Patrolling is hardcoded need to fix
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
    this.velocity.y += this.fallAcc * this.game.clockTick;
    this.x += this.game.clockTick * this.velocity.x;
    this.y += this.game.clockTick * this.velocity.y;
    this.updateBB();

    var that = this;
    this.game.entities.forEach(function (entity) {
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
          if (that.hurtTimer === undefined) {
            that.hurtTimer = 0;
          } else {
            that.hurtTimer += that.game.clockTick;
          }
          if (that.hurtTimer > 1) {
            entity.loseHeart();
            that.hurtTimer = undefined;
          }
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

        if (
          (entity instanceof Floor || entity instanceof Platform) &&
          that.lastBB.bottom <= entity.BB.top
        ) {
          that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 0.93;
          that.velocity.y = 0;

        } 
      }
      else if (entity.BB && that.runBB.collide(entity.BB) && entity !== that) {
        if (entity instanceof Knight && !(that.BB.collide(entity.BB))) {
          if(entity.BB.x > that.x) {
            that.facing = 0;
            //that.state = 1;
            that.velocity.x = 100;
            
          }
          else if(entity.BB.x < that.x) {
            that.facing = 1;
            //that.state = 1;
            that.velocity.x = -100;
          }
          //that.x += that.game.clockTick * that.velocity.x;
        }
      }
    });
    that.updateBB();
  }
  loseHeart() {
    this.lives--;
    var hurtSoundPath = './sfx/goblin_hurt.wav';
    if (!(ASSET_MANAGER.getAsset(hurtSoundPath).currentTime > 0)) {
      ASSET_MANAGER.playAsset(hurtSoundPath);
    }
    var attackSoundPath = './sfx/spear_hit.mp3';
    if (!(ASSET_MANAGER.getAsset(attackSoundPath).currentTime > 0)) {
      ASSET_MANAGER.playAsset(attackSoundPath);
    }
    // console.log(this.lives);
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
      2.45
      );
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
