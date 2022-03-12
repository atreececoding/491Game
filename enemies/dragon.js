
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
  const FIRE_PREP = 3;
  
  
  
  // // dragon final boss class
  class Dragon {
    constructor(game, x, y, size) {
      // game engine
      Object.assign(this, { game, x, y, size });
  
        this.originX = this.x;
        this.size = 0;
        this.facing = 1;
        this.state = 0; // 0 = idle, 1 = low attack, dying, dead, mid attack, high attack
        this.damaged = false;
        this.hurtframes = 0;
        this.dead = false;

      // spritesheets for the dragon
      
      this.spritesheetUpperAttack = ASSET_MANAGER.getAsset("./sprites/DragonUpperAttack.png");
      this.spritesheetMidAttack = ASSET_MANAGER.getAsset("./sprites/DragonMidAttack.png")
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/DragonRev2.png");
      this.spritesheetUpperAttackDamaged = ASSET_MANAGER.getAsset("./sprites/DragonUpperAttackDamaged.png");
      this.spritesheetMidAttackDamaged = ASSET_MANAGER.getAsset("./sprites/DragonMidAttackDamaged.png")
      this.spritesheetDamaged = ASSET_MANAGER.getAsset("./sprites/DragonRev2Damaged.png");
  
      this.lives = 1000;
  
      // velocity
      this.velocity = {
        x: VELOCITY_X,
        y: VELOCITY_Y,
      };
      this.fireTimer = 0;
      this.timeSinceLastFire = 2;

      this.lowTimed = false;
      this.midTimed = false;
      this.upperTimed = false;

      this.fireTimed = false;
      //this.fireStart = false;
      
      this.GRAVITY = 1;
      // initialize bounding box
      
      this.updateBB();
  
      // 2d array of animations based on [state][facing]
      this.animations = [];
      this.loadAnimations();
    }
  
    loadAnimations() {
      for (let i = 0; i < 10; i++) {
        this.animations.push([]);
        for (let j = 0; j < 2; j++) {
          this.animations[i].push([]);
        }
      }
  
      // 0 = idle, 1 = lower attack, 2 = dying, 3 = dead, 4 = mid, 5 = upper
      // facing right = 0

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

      this.animations[4][1] = new Animator(
        this.spritesheetMidAttack,
        0,
        0,
        400,
        200,
        6,
        0.15,
        false,
        true
      );

      this.animations[5][1] = new Animator(
        this.spritesheetUpperAttack,
        0,
        0,
        400,
        200,
        7,
        0.15,
        false,
        true
      );


      this.animations[6][1] = new Animator (
        this.spritesheetDamaged,
        17,
        0,
        80.0,
        113,
        this.animations[0][1].frameCount,
        this.animations[0][1].frameDuration,
        true,
        true
      );

      this.animations[6][1].elapsedTime = this.animations[0][1].elapsedTime;
      this.animations[6][1].totalTime = this.animations[0][1].totalTime;
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x,
        this.y + 70,
        PARAMS.BLOCKWIDTH *  4,
        PARAMS.BLOCKWIDTH * 4.8
      );
  
      this.lastUpperBB = this.upperBB;
      this.upperBB = new BoundingBox(
        this.x-150,
        this.y - 200 ,
        PARAMS.BLOCKWIDTH * 2,
        PARAMS.BLOCKWIDTH * 3
      );

      this.lastLowerBB = this.lowerBB; 
      this.lowerBB = new BoundingBox(
        this.x-150,
        this.y + 350,
        PARAMS.BLOCKWIDTH * 2,
        PARAMS.BLOCKWIDTH * 5.2
      );

      this.lastMidBB = this.midBB;
      this.midBB = new BoundingBox(
        this.x-150,
        this.y + 150,
        PARAMS.BLOCKWIDTH * 2,
        PARAMS.BLOCKWIDTH * 2
      );
      this.wallBB = new BoundingBox (
        this.x + this.BB.width,
        this.y - this.BB.height,
        PARAMS.BLOCKWIDTH * 2,
        PARAMS.BLOCKWIDTH * 12
      );


    }
  
    die() {}
  
    update() {


      if (this.state === 1 || this.state === 4 || this.state === 5) {
        ASSET_MANAGER.playSFX('./sfx/dragon_attack.wav');
      }
  
      this.velocity.y += this.GRAVITY;
      //this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      if (!this.dead) {
        this.updateBB();
      }
      
  
      var that = this;
      const TICK = that.game.clockTick;
      this.game.entities.forEach(function (entity) {
       
        if(entity.BB && that.BB && that.BB.collide(entity.BB) && entity !== that) {
          if (
            (entity instanceof Floor) &&
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 3.967;
            that.velocity.y = 0;
          } 
        }
        if(that.state !== 3 && that.state !== 2) {
          if (entity.BB && that.lowerBB.collide(entity.BB) && entity !== that && !that.midTimed && !that.upperTimed) {
            if (entity instanceof Knight) {
              if (entity.BB.right >= that.lowerBB.right) {
                entity.x = that.lowerBB.right - entity.BB.width;
              }
              that.lowTimed = true;
            }

          }
          
          else if (entity.BB && that.midBB.collide(entity.BB) && entity !== that && !that.upperTimed && !that.lowTimed) {
            if (entity instanceof Knight) {
              if (entity.BB.right >= that.midBB.right) {
                entity.x = that.midBB.right - entity.BB.width;
              }
              that.midTimed = true;
              
            } 

          }
          
          else if (entity.BB && that.upperBB.collide(entity.BB) && entity !== that && !that.midTimed && !that.lowTimed) {
            if (entity instanceof Knight) {
              if (entity.BB.right >= that.upperBB.right) {
                entity.x = that.upperBB.right - entity.BB.width;
              }
              that.upperTimed = true;
              
            } 
          }
         
          if(entity.BB && (that.lowerBB.collide(entity.BB) || that.upperBB.collide(entity.BB) || that.midBB.collide(entity.BB)) && entity !== that) {
            if(entity instanceof Knight) {
              that.fireTimed = true;
            }
          }
         
          if (that.fireTimed) {
              that.fireTimer += that.game.clockTick;
              //console.log("got here " + that.fireTimer);
              console.log(that.fireTimer);
          }

          if (that.fireTimer > 100) {
            console.log("fire");
            if(that.lowTimed && that.state !== 4 && that.state !== 5) {
              that.state = 1;
            }
            else if (that.midTimed && that.state !== 1 && that.state !== 5) {
              that.state = 4;
            }
            else if (that.upperTimed && that.state !== 1 && that.state !== 4) {
              that.state = 5;
            }
            that.lastAttack = that.game.clockTick;
            that.timeSinceLastAttack = 0;
            if(entity.BB && that.lowTimed && !that.midTimed && !that.upperTimed && that.lowerBB.collide(entity.BB) && entity !== that && that.state === 1 && that.state !== 4 && that.state !== 5) {
              if(entity instanceof Knight)
                entity.loseDragonHeart();
            }
            else if(entity.BB && that.midTimed && !that.lowTimed && !that.upperTimed && that.midBB.collide(entity.BB) && entity !== that && that.state === 4 && that.state !== 5 && that.state !== 1) {
              if(entity instanceof Knight)
                entity.loseDragonHeart();
            }
            else if(entity.BB && that.upperTimed && !that.lowTimed && !that.midTimed && that.upperBB.collide(entity.BB) && entity !== that && that.state === 5 && that.state !== 4 && that.state !== 1) {
              if(entity instanceof Knight) {
                console.log("lost heart");
                entity.loseDragonHeart();
              }
            }
            if(that.fireTimer > 200) {
              that.fireTimed = false;
              that.fireTimer = 0;
              console.log("reset");
              if(that.lowTimed) {
                that.lowTimed = false;
              }
              else if (that.midTimed) {
                that.midTimed = false;
              }
              else if (that.upperTimed) {
                that.upperTimed = false;
              }
            }
          }

          if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
                
            that.state = 0;
            that.lastAttack = undefined;
            that.fireTimer = 0;
          } else {
            that.timeSinceLastAttack += that.game.clockTick;
          }

          // else if (entity instanceof Knight && !that.lowerBB.collide(entity.BB) && !that.midBB.collide(entity.BB) && !that.upperBB.collide(entity.BB)  && entity != that) {
          //   that.lowtimer = 0;
          //   that.midtimer = 0;
          //   that.uppertimer = 0;
          // }
        }
        
      });
      if (!that.dead) {
        that.updateBB();
      }
    }
  
    loseHeart() {
      this.lives--;
      ASSET_MANAGER.playSFX('./sfx/dragon_hurt.wav');

      console.log(this.lives);
      if(this.lives <= 0) {
        this.state = 2;
        
      }
    }
    clearBoundingBoxes() {
      this.lastBB = undefined;
      this.BB = undefined;
      this.lastLowerBB = undefined;
      this.lowerBB = undefined;
      this.lastMidBB = undefined;
      this.midBB = undefined;
      this.lastUpperBB = undefined;
      this.upperBB = undefined;
      
      this.wallBB = undefined;
    }
  
    draw(ctx) {
      // ctx.fillStyle = "white";
      // ctx.font = '40px monospace';
      // ctx.fillText("Current frame #: " + this.animations[this.state][this.facing].currentFrame(), this.x, this.y);
      if(this.lives > 0) {

        if(this.state === 1) {
            this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x - 300,
            this.y - 100,
            9
            );
        }
        else if(this.state === 5) {
          this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x - 350,
            this.y - 150,
            9
            );
        }
        //If we are not attacking in any of the 3 attack areas we are "idle"
        else if (this.state === 4){
          this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x - 1200,
            this.y - 475,
            9
            );
        }
        //If we are damaged while idle we are damaged and show the damaged spritesheet
        //We check what frame we are on and set our damaged = false after 3 frames
        else {
          if (this.damaged && this.animations[this.state][this.facing].currentFrame() - this.hurtframes <= 1){
            this.animations[6][this.facing].drawFrame(
              this.game.clockTick,
              ctx,
              this.x - this.game.camera.x,
              this.y,
              9
              );
              this.animations[0][1].elapsedTime = this.animations[6][1].elapsedTime;
          }
          else{
            this.damaged = false;
            this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y,
            9
            );
            this.animations[6][1].elapsedTime = this.animations[0][1].elapsedTime;
          }
        }
      } else if(this.lives <= 0 && !this.dead) {
        this.velocity.x = 0;
        this.animations[this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y,
          9
        );
        if(this.animations[this.state][this.facing].isDone()) {
          this.dead = true;
          console.log("died");
          var dragonDieSoundPath = './sfx/dragon_die.wav';
          if (!(ASSET_MANAGER.getAsset(dragonDieSoundPath).currentTime > 0)) {
            ASSET_MANAGER.playAsset(dragonDieSoundPath);
          }
          this.clearBoundingBoxes();
          this.GRAVITY = 0;
        }
        
      }
      if(this.dead === true) {
        this.state = 3;
        this.animations[this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y + 800,
          9
        );
      }
      if (this.game.options.debugging && this.BB && this.upperBB && this.midBB && this.lowerBB && this.wallBB) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeRect(this.upperBB.x - this.game.camera.x, this.upperBB.y, this.upperBB.width, this.upperBB.height);
        ctx.strokeStyle = "Blue";
        ctx.strokeRect(this.lowerBB.x - this.game.camera.x, this.lowerBB.y, this.lowerBB.width, this.lowerBB.height);
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.midBB.x - this.game.camera.x, this.midBB.y, this.midBB.width, this.midBB.height);
        ctx.strokeStyle = "Black";
        ctx.strokeRect(this.wallBB.x - this.game.camera.x, this.wallBB.y, this.wallBB.width, this.wallBB.height);
      }
    }
  }