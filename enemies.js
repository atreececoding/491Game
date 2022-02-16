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
      let X_OFFSET_2 = 27;
      let WIDTH = 32;
      let HEIGHT = 15;
      let FRAME_COUNT = 10;
      let ANIMATION_SPEED_1 = 0.1;
      let ANIMATION_SPEED_2 = 0.05;
      let Y_OFFSET_0 = 172;
      let Y_OFFSET_1 = 148;
      let Y_OFFSET_2 = 258;
      let Y_OFFSET_3 = 373;
      let Y_OFFSET_4 = 500;
      let Y_OFFSET_5 = 620;
      let Y_OFFSET_6 = 721;
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
        console.log("got left");
        this.x = this.patLeft;
        this.velocity.x = 100 * scale;
        //this.facing = 0;
      } 
      if (this.x >= this.patRight /*&& this.facing === 0*/) {
        console.log("got right");
        this.x = this.patRight;
        this.velocity.x = -100 * scale;
        //this.facing = 1;
      }
      if (this.y <= this.upPat) {
        //this.y = this.patUp;
        this.velocity.y = 100 * scale;
        console.log(this.velocity.y);
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

class Rat {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size});

    this.velocity = { x: -50, y: 0 };
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ratAndBat.png");
    this.spritesheetRev = ASSET_MANAGER.getAsset("./sprites/ratAndBatRev.png");

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
    // hovering right (directions are flipped because of sprite sheet)
    this.animations[0][0] = new Animator(
      this.spritesheet,
      0,
      22,
      32,
      18,
      10,
      0.1,
      false,
      true
    );
    
    this.animations[0][1] = new Animator(
      this.spritesheet,
      0,
      22,
      32,
      18,
      10,
      0.1,
      true,
      true
    );

    this.animations[1][0] = new Animator(
      this.spritesheet,
      0,
      86,
      31,
      18,
      10,
      0.1,
      true,
      true
    );

    this.animations[1][1] = new Animator(
      this.spritesheetRev,
      0,
      86,
      31,
      18,
      10,
      0.1,
      false,
      true
    )
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x + 35,
      this.y,
      PARAMS.BLOCKWIDTH * 0.8,
      PARAMS.BLOCKHEIGHT * 0.3
    );

    this.lastRunBB = this.runBB;
    this.runBB = new BoundingBox(
      this.x - 150,
      this.y,
      PARAMS.BLOCKWIDTH * 5,
      PARAMS.BLOCKHEIGHT
    );
  }

  die() {}

  update() {
    // this is hardcoded need to fix
    // let scale = 1 + Math.random();
    // if (this.x <= 350 && this.facing === 1) {
    //   this.velocity.x = 100 * scale;
    //   this.facing = 0;
    // } 
    // if (this.x >= 550 && this.facing === 0) {
    //   this.velocity.x = -100 * scale;
    //   this.facing = 1;
    // }
    // if (this.y <= 30) {
    //   this.velocity.y = 50 * scale;
    // } 
    // if (this.y >= 60) {
    //   this.velocity.y = -50 * scale;
    // }
    // if(this.x > this.Knight.x) {
    //   this.velocity.x = -70
    // }
    // if(this.x < ) {
    //   this.velocity.x = 70
    // }


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
    });

    
    
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
      ctx.strokeRect(this.runBB.x - this.game.camera.x, this.runBB.y, this.runBB.width, this.runBB.height);
    }
  }
}

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
    // this.state = STATE.IDLE;
    // this.facing = FACING.LEFT;
      

    // this.dead = false;

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
    for (let i = 0; i < 2; i++) {
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
      105,
      0,
      80,
      112,
      13,
      0.3,
      true,
      true
    );

    // //death
    // // facing right = 0;
    // this.animations[1][0] = new Animator(
    //   this.spritesheet,
    //   279,
    //   771,
    //   180,
    //   90,
    //   5,
    //   0.2,
    //   false,
    //   false
    // );

    // //death
    // // facing left = 1;
    // this.animations[1][1] = new Animator(
    //   this.spritesheet,
    //   279,
    //   771,
    //   180,
    //   90,
    //   5,
    //   0.2,
    //   true,
    //   false
    // );
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
      this.x - 150,
      this.y + 20,
      PARAMS.BLOCKWIDTH * 5.5,
      PARAMS.BLOCKWIDTH * 5.2
    )
  }

  die() {}

  update() {
    // // Patrolling is hardcoded need to fix
    // if (this.x <= 300 && this.facing === 1) {
    //   this.x = 300;
    //   this.velocity.x = 75;
    //   this.facing = 0;
    // } 
    // if (this.x >= 600 && this.facing === 0) {
    //   this.x = 600;
    //   this.velocity.x = -75;
    //   this.facing = 1;
    // }

    this.velocity.y += 1;
    //this.x += this.game.clockTick * this.velocity.x;
    this.y += this.game.clockTick * this.velocity.y;
    this.updateBB();

    var that = this;
    // this.game.entities.forEach(function (entity) {
    //   if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
    //     if (entity instanceof Knight) {
    //       that.state = 1;
    //       that.velocity.x = 0;
    //       if (that.facing === 1) {
    //         that.x = entity.BB.left + PARAMS.BLOCKWIDTH;
    //       }
    //       else {
    //         that.x = entity.BB.left - PARAMS.BLOCKWIDTH;
    //       }
    //       that.lastAttack = that.game.clockTick;
    //       that.timeSinceLastAttack = 0;
    //       entity.loseHeart();
    //     } else if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
    //         that.velocity.x = 0;
    //         if (that.facing === 0) {
    //           that.velocity.x = 75;
    //           that.lastAttack = undefined;
    //         } 
    //         if (that.facing === 1) {
    //           that.velocity.x = -75;
    //           that.lastAttack = undefined;
    //         }
    //       that.state = 0;
    //     } else {
    //       that.timeSinceLastAttack += that.game.clockTick;
    //     }

        

    //   }
    // });
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
      if (entity.BB && that.fireBB.collide(entity.BB) && entity !== that) {
        if (entity instanceof Knight) {
          console.log("fire now");
          that.state = 1;
          that.lastAttack = that.game.clockTick;
            that.timeSinceLastAttack = 0;
            //entity.loseHeart();
        } 
        if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
            console.log("been 2 seconds");
            that.state = 0;
            that.lastAttack = undefined;
        } else {
          console.log("counting");
          that.timeSinceLastAttack += that.game.clockTick;
        }
        // if(that.animations[that.state][that.facing].isDone()) {
        //   that.state = 0;
        // } 
      }
    });
    that.updateBB();
  }

  loseHeart() {
    this.lives--;
    console.log(this.lives);
    if(this.lives <= 0) {
      this.state = 1;
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
      ctx.strokeRect(this.fireBB.x - this.game.camera.x, this.fireBB.y, this.fireBB.width, this.fireBB.height);
    }
  }
}

class Goblin {
    constructor(game, x, y, size) {
      Object.assign(this, { game, x, y, size });
  
      this.velocity = { x: 0, y: 0 };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblinSprite.png");
  
      this.patLeft = this.x - 300;
      this.patRight = this.x;
      this.size = 0;
      this.facing = 0;
      this.state = 0; // 0 = walking, 1 = attacking
      this.dead = false;
      this.lives = 3;
  
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
      //walking right and left
      //facing right = 0
      this.animations[0][0] = new Animator(
        this.spritesheet,
        0,
        194,
        64,
        54,
        7,
        0.15,
        false,
        true
      );
      //facing left = 1
      this.animations[0][1] = new Animator(
        this.spritesheet,
        0,
        67,
        64,
        54,
        7,
        0.15,
        true,
        true
      );
  
      //Attacking
      //facing right = 0
      this.animations[1][0] = new Animator(
        this.spritesheet,
        0,
        451,
        64,
        54,
        5,
        0.15,
        false,
        true
      );
      //facing left = 1
      this.animations[1][1] = new Animator(
        this.spritesheet,
        0,
        324,
        64,
        54,
        5,
        0.15,
        true,
        true
      );

      //this.animations[2][0] = new Animator(this.spritesheet, 0, 511, 65, 50, 5, 0.15, false, false);

      this.animations[2][0] = new Animator(
        this.spritesheet,
        0,
        511,
        65,
        50,
        5,
        0.15,
        false,
        false
      );

      this.animations[2][1] = new Animator(
        this.spritesheet,
        0,
        511,
        65,
        50,
        5,
        0.15,
        false,
        false
      );
  
      //Idle
      //this.animation[2][0] = new Animator(this.spritesheet, )
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x - this.game.camera.x,
        this.y,
        PARAMS.BLOCKWIDTH * 1.2,
        PARAMS.BLOCKHEIGHT * 0.93
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
          if (entity instanceof Knight) {
            that.state = 1;
            that.velocity.x = 0;
            // if (that.facing === 1) {
            //   that.x = entity.BB.left + entity.BB.width;
            // }
            // else {
            //   that.x = entity.BB.left - entity.BB.width;
            // }
            that.lastAttack = that.game.clockTick;
            that.timeSinceLastAttack = 0;
            // entity.loseHeart();
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
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
      }
    }
  }
  