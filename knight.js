class Knight {

    constructor(game) {
      this.game = game;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");
      this.rev_spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightRevSprites.png");

      this.size = 0;
      this.facing = 0; // 0 = right, 1 = left
      this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = jumping/falling, 4 = attacking, 5 = hurting, 6 = dying

      this.lives = 5;
      this.energy = 2;
      this.attackTimer = 2;
      this.hurtTimer = .5;
      
      this.speed = 100;
      this.velocity = {
        x: 0,
        y: 0,
      };

      this.updateBB();

      this.animations = [];
      this.loadAnimations();

      this.animationScales = [1.45, 1.45, 1.34125, 1.34125, 1.264125, 1.264125, 1.264125];

      this.gameOver = false;
      this.winCondition = false;
      this.credits = false;
      };

    loadAnimations() {
        for (var i = 0; i < 7; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]);
            }
        }
        this.lastJump = 0;
        this.timeSinceLastJump = 2;

        // CONSTANTS
        let X_OFFSET = 25;
        let X_OFFSET_2 = 35;
        let X_OFFSET_3 = 23;
        let X_OFFSET_4 = 15;
        let WIDTH = 270;
        let HEIGHT = 105;
        let HEIGHT2 = 110;
        let FRAME_COUNT = 7;
        let ANIMATION_SPEED_1 = 0.15;
        let ANIMATION_SPEED_2 = 0.05;
        let Y_OFFSET_0 = 8;
        let Y_OFFSET_1 = 148;
        let Y_OFFSET_2 = 258;
        let Y_OFFSET_3 = 373;
        let Y_OFFSET_4 = 490;
        let Y_OFFSET_5 = 610;
        let Y_OFFSET_6 = 721;
        let REVERSE = true;
        let NO_REVERSE = false;
        let LOOP = true;
        let NO_LOOP = false;

        //Animation Key = # : 0 = idle, 1 = walk, 2 = run, 3 = jump, 4 = attack, 5 = hurt, 6 = die   
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_0, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, LOOP);        
        this.animations[1][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_1, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, NO_REVERSE, LOOP);
        this.animations[2][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_2, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, NO_REVERSE, LOOP);
        this.animations[3][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_3, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, LOOP);
        this.animations[4][0] = new Animator(this.spritesheet, X_OFFSET_4, Y_OFFSET_4, WIDTH, HEIGHT2, FRAME_COUNT, ANIMATION_SPEED_2, NO_REVERSE, NO_LOOP);
        this.animations[5][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_5, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, NO_REVERSE, NO_LOOP);
        this.animations[6][0] = new Animator(this.spritesheet, X_OFFSET, Y_OFFSET_6, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, NO_REVERSE, NO_LOOP);

        //facing left = 1
        this.animations[0][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_0, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, LOOP);
        this.animations[1][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_1, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, REVERSE, LOOP);
        this.animations[2][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_2, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, REVERSE, LOOP);
        this.animations[3][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_3, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, LOOP);
        this.animations[4][1] = new Animator(this.rev_spritesheet, X_OFFSET_3, Y_OFFSET_4, WIDTH, HEIGHT2, FRAME_COUNT, ANIMATION_SPEED_2, REVERSE, NO_LOOP);
        this.animations[5][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_5, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_2, REVERSE, NO_LOOP);
        this.animations[6][1] = new Animator(this.rev_spritesheet, X_OFFSET_2, Y_OFFSET_6, WIDTH, HEIGHT, FRAME_COUNT, ANIMATION_SPEED_1, REVERSE, NO_LOOP);
    }

  updateBB() {
    this.lastBB = this.BB;

    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * .7,
      PARAMS.BLOCKHEIGHT * .9
    );

    this.lastSpearBB = this.spearBox;
    this.spearBox = new BoundingBox(
      this.x - 70,
      this.y + 20,
      PARAMS.BLOCKWIDTH * 2.5,
      PARAMS.BLOCKHEIGHT * .5
    );
  }

  die() {
    console.log("DEAD");
    this.gameOver = true;
    ASSET_MANAGER.playSFX('./sfx/game_over.wav');
 
  }

  win() {
    console.log("won the game!");
    this.winCondition = true;
  }


  update() {
    // console.log('this.x ' + this.x);

    if (this.lives < 1) {
      this.state = 6;
    }
    
    const TICK = this.game.clockTick;

    // PHYSICS CONSTANTS
    const WALK_SPEED = 300;
    const RUN_SPEED = 500;
    const JUMP_SPEED = -1000;
    const FALL_SPEED = 500;
    const JUMP_COOLDOWN = 0.5;
    const ATTACK_COOLDOWN = 0.1;


    if (this.state === 6) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    } else if (this.state === 4) {
        if (this.animations[this.state][this.facing].isDone()) {
          this.animations[this.state][this.facing].reset();
          this.state = 0;
        }        
    } else if (this.endScript) {
      this.state = 1;
      console.log('changed state to walking')
      this.facing = 0;
      if (this.x < 2125 - (PARAMS.BLOCKWIDTH * .7 / 2)) {
        this.velocity.x = 150;      
      } else {
        this.credits = true;
        this.endScript = false;
        this.creditsScriptIsDone = true;
      }
      this.velocity.y = 100;    
      this.x += this.velocity.x * TICK;
      this.y += this.velocity.y * TICK;
    }
    else if(this.credits) {
      // if past the last credits -> display win screen
      this.state = 0;
      this.facing = 0;
      this.velocity.y = 100;    
      this.velocity.x = 150;      
      this.x += this.velocity.x * TICK;
      this.y += this.velocity.y * TICK;

      if (this.x > 10500) {
        this.endScreen = true;
      }
    }
    else if (this.state === 5) {

        if (this.animations[this.state][this.facing].isDone()) {
          this.animations[this.state][this.facing].reset();
          this.state = 0;
          this.loseHeart();         
        }
        ASSET_MANAGER.playSFX('./sfx/knight_hurt.wav');
   
        } else {
        // update velocity
        // ground physics
        
        if (this.state !== 3) {
          
          if (this.game.keys["left"] && !this.game.keys["right"]) { // move left
            if (this.game.keys["shift"]) {
              this.velocity.x = -RUN_SPEED;
              this.state = 2;
            } else {
              this.velocity.x = -WALK_SPEED;
              this.state = 1;
            }
          } else if (!this.game.keys["left"] && this.game.keys["right"]) { // move right
              if (this.game.keys["shift"]) {
                this.velocity.x = RUN_SPEED;
                this.state = 2;
              } else {
                this.velocity.x = WALK_SPEED;
                this.state = 1;
              }
          
          } 
          else if (this.state == 5) {
            // need to set a timer
            if(this.facing == 0) {
              this.velocity.x = -150;
            }
            else {
              this.velocity.x = 150;
            }
          }
          else {
            this.velocity.x = 0;
            this.state = 0;
          }
          // fall if you step off platform
          this.velocity.y = FALL_SPEED;

          if (this.hurtTimer == undefined) {
            this.hurtTimer = 0;
          } else {
            this.hurtTimer += TICK;
          }

          if (this.attackTimer == undefined) {
            this.attackTimer = 0;
          } else {
            this.attackTimer += TICK;
          }


          if (this.game.keys["attack"]) {
            
            if (this.attackTimer > ATTACK_COOLDOWN) {
              this.state = 4;
              this.attackTimer = undefined;
            }

          }

          if (this.game.keys["up"] && abs(this.lastJump - this.timeSinceLastJump) > JUMP_COOLDOWN) {
            if (this.energy > 0) {
              // jump
              this.velocity.y = JUMP_SPEED;
              this.state = 3;
              this.loseEnergy();
              // start cooldown
              this.lastJump = TICK;
              this.timeSinceLastJump = 0;
            } else {
              this.velocity.y = .8 * JUMP_SPEED;
              this.state = 3;
              this.lastJump = TICK;
              this.timeSinceLastJump = 0;
            }
          }
          else {
            // lower jump cooldown
            this.timeSinceLastJump += TICK;
          }
        }
       else {
        // lower jump cooldown
        this.timeSinceLastJump += TICK;

        // air physics
        // vertical physics
        this.velocity.y += FALL_SPEED * TICK * PARAMS.SCALE;
      
        // horizontal physics
        if (this.game.keys["left"] && !this.game.keys["right"]) { // go left in the air
          if (this.game.keys["shift"]) {
            this.velocity.x = -RUN_SPEED;
          } else {
            this.velocity.x = -WALK_SPEED;
          }
        } else if (!this.game.keys["left"] && this.game.keys["right"]) { // go right in the air
            if (this.game.keys["shift"]) {
              this.velocity.x = RUN_SPEED;
            } else {
              this.velocity.x = WALK_SPEED;
            }
        } else {
            this.velocity.x = 0;
        }
        
    }

    // max speed calculation
    if (this.velocity.y >= FALL_SPEED * 1.5) this.velocity.y = FALL_SPEED;

    // update position
    this.x += this.velocity.x * TICK;
    this.y += this.velocity.y * TICK;

    if (this.velocity.x !== 0 && (this.state === 1 || this.state === 2)) {
      ASSET_MANAGER.playSFX('./sfx/walking.wav');
    }

    this.updateBB();

    // update direction
    if (this.game.keys["right"]) this.facing = 0;
    if (this.game.keys["left"]) this.facing = 1;
  }

    var that = this;
    this.game.entities.forEach(function (entity) {

      if (entity.wallBB && entity.wallBB.collide(that.BB) && entity !== that) {
        that.velocity.x = 0;
        that.x = entity.wallBB.left - that.BB.width;
        console.log('colliding with wallBB');
      }
      if (entity instanceof SignPost && that.BB.collide(entity.BB) && entity !== that){
        entity.display = true;
      }
      if ((entity instanceof Platform)  &&  that.BB.collide(entity.BB) && entity !== that){
        entity.moves = true;
      }
      if ((entity instanceof EndPlatform)  &&  that.BB.collide(entity.BB) && entity !== that){
        if (!that.creditsScriptIsDone) {
          that.endScript = true;
        }
        if (that.creditsScriptIsDone) {
          entity.moves = true;
          that.credits = true;
        }
      }


      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {

        if(entity instanceof CastleGates && that.game.keys["up"]) {
          that.energy++;
        }
        if (entity instanceof Bell){

          entity.puzzlesolved = true;
          entity.belltimer = 0;
        }

        // falling
        if (that.velocity.y > 0) {
          if ((entity.isImpassible || entity.isSpikes || entity.isPlatform) && // landing
            (that.lastBB.bottom <= entity.BB.top)) {
              // was above last tick
              let stopFall = !entity.dropThrough && !entity.dead;

              if (!stopFall) {
                if (!that.game.keys["down"]) {
                  stopFall = true;
                }
              }

              if (stopFall) {
                that.y = entity.BB.top - that.BB.height;
                that.velocity.y = 0;
              } 

              if (entity instanceof MetalSpikesFloor) {
                that.loseHeart();
              }
          } else if (entity instanceof Goblin || entity instanceof Rat) {
            if (that.lastBB.bottom <= entity.BB.top) {
              that.y = entity.BB.top - that.BB.height;
              that.velocity.y = 0;
            }
          }
   
          
          if (that.state == 3 && (entity instanceof Platform || entity instanceof Floor)) {
            ASSET_MANAGER.playSFX('./sfx/hit_ground.wav');
          }
       
          if (entity instanceof Crate && (that.state === 3)) {
            ASSET_MANAGER.playSFX('./sfx/crate_hit.wav');
          }
          
          if (that.state === 3) that.state = 0; // set state to idle

        }
        // Facing right collission
        if (that.facing === 0) {
          if ((entity.isImpassible || entity.isSpikes) 
            && (that.BB.right >= entity.BB.left) && !(that.lastBB.bottom <= entity.BB.top) && !(that.lastBB.top >= entity.BB.bottom)) {
            if (entity instanceof Rat) {
              
            }
            if(entity instanceof Crate) {
            }
            that.x = entity.BB.left - that.BB.width;

            that.velocity.x = 0;
            that.updateBB();
            if (entity instanceof Crate && (that.state === 1 || that.state === 2)) {
              ASSET_MANAGER.playSFX('./sfx/crate_hit.wav');
            }
          } 

        }
        //facing left collssion
        if (that.facing === 1) {
          if ((entity.isImpassible || entity.isSpikes) 
              && (that.BB.left <= entity.BB.right) && !(that.lastBB.bottom <= entity.BB.top) && !(that.lastBB.top >= entity.BB.bottom)) {
            that.x = entity.BB.right;
          console.log('colliding with impassible facing left');

            that.velocity.x = 0;
            that.updateBB();
            if (entity instanceof Crate && (that.state === 1 || that.state === 2)) {
              ASSET_MANAGER.playSFX('./sfx/crate_hit.wav');
            }
            if (entity instanceof Rat) {
              
            }
          }
        
        }

        //Jumping up into objects that we don't move through such as crate, spikes
        if (that.velocity.y < 0) {
          if((entity.isImpassible || entity.isSpikes) && that.lastBB.top >= entity.BB.bottom) {
            if (entity instanceof MetalSpikesCeiling){
              that.loseHeart();
            }
            that.y = entity.BB.bottom;
            that.velocity.y = FALL_SPEED;
          }
        }

        if (entity instanceof EnergyJuice && !entity.dead) {
          entity.removeFromWorld = true;
          that.gainEnergy();
          ASSET_MANAGER.playSFX('./sfx/red_bull.wav');
        }
        if (entity instanceof BluePotion && !entity.dead) {
          entity.removeFromWorld = true;
          that.gainBluePotionEnergy();
          ASSET_MANAGER.playSFX('./sfx/red_bull.wav');
        }

        if (entity instanceof redApple && !entity.dead) {
          entity.removeFromWorld = true;
          that.gainRedAppleEnergy();
          ASSET_MANAGER.playSFX('./sfx/eat_apple.wav');
        }
        if (entity instanceof goldApple && !entity.dead) {
          entity.removeFromWorld = true;
          that.gainGoldAppleEnergy();
          ASSET_MANAGER.playSFX('./sfx/eat_apple.wav');
        }
        
      }

      // Spear / attack hitbox code
      if(entity.BB && that.spearBox.collide(entity.BB) && entity !== that) {

        //Attacking the dragon, setting it to damaged state, logging the current frame of animation for sprite swapping
        if (entity instanceof Dragon && that.state === 4) {
          entity.damaged = true;
          entity.hurtframes = entity.animations[entity.state][entity.facing].currentFrame();
        }


        if((entity instanceof Goblin || entity instanceof Dragon || entity instanceof Rat || entity instanceof Skeleton) && !entity.dead) {
          if((that.lastSpearBB.right <= entity.BB.left || that.lastSpearBB.right >= entity.BB.left + 20)) {
            if(that.state === 4) {
              if (entity instanceof Goblin || entity instanceof Skeleton) {
                entity.bounce();
              }
              console.log(entity.lives);
              entity.loseHeart();
              if (that.goblinHurtTimer === undefined) {
                that.goblinHurtTimer = 0;
              } else {
                that.goblinHurtTimer += that.game.clockTick;
              }
              if (that.goblinHurtTimer > ATTACK_COOLDOWN) {
                entity.loseHeart();
                that.goblinHurtTimer = undefined;
              }
              ASSET_MANAGER.playSFX('./sfx/spear_hit.mp3');
            }
          }
          else if((that.lastSpearBB.left >= entity.BB.Right || that.lastSpearBB.right <= entity.BB.right - 20)) {
            if(that.state === 4) {
              if (entity instanceof Goblin || entity instanceof Skeleton) {
                entity.bounce();
              }
              console.log(entity.lives);
              entity.loseHeart();
              if (that.goblinHurtTimer === undefined) {
                that.goblinHurtTimer = 0;
              } else {
                that.goblinHurtTimer += that.game.clockTick;
              }
              if (that.goblinHurtTimer > ATTACK_COOLDOWN) {
                entity.loseHeart();
                that.goblinHurtTimer = undefined;
              }
              ASSET_MANAGER.playSFX('./sfx/spear_hit.mp3');
            }
          } else {
            entity.hurt = false;
          }
        }
      }  
    });
    that.updateBB();
  }

  loseHeart() {
    //If the timer has accrued more time from ticks than value in seconds we lose a heart when called
    this.hurtTimer+= this.game.clockTick;
    if (this.hurtTimer > .25) {
      this.hurtTimer = 0;
      this.lives--;
    }
  }
  

  loseDragonHeart() { //Dragon hurts us for 2 so a separate function than loseHeart function here
    this.hurtTimer+= this.game.clockTick;
    if (this.hurtTimer > 2) {
      this.hurtTimer = 0;
      this.lives-=2;
    }
  }

  //Items give us energy
  gainEnergy() {
    if (this.energy < 5) {
      this.energy++;
    }
    if(this.lives < 5) {
      this.lives++;;
    }
  }
  
  damagedLeft() {
    this.velocity.x = -1000;
    this.velocity.y = -150;
    this.x += this.velocity.x * this.game.clockTick;
    console.log('damaged left');
    this.y += this.velocity.y * this.game.clockTick;

    this.updateBB();
  }
  damagedRight() {
    this.velocity.x = 1000;
    this.velocity.y = -150;
    this.x += this.velocity.x * this.game.clockTick;
    console.log('damaged right');

    this.y += this.velocity.y * this.game.clockTick;
    
    this.updateBB();
  }

  gainGoldAppleEnergy() {
    this.energy += 200;
    if(this.lives < 5) {
      this.lives = 5;
    }
    this.win();

  }

  gainBluePotionEnergy() {
    this.energy += 1000;
    if(this.lives < 5) {
      this.lives = 5;
    }
  }

  gainRedAppleEnergy() {
      this.energy += 3;
      if (this.energy > 5) this.energy = 5;

      this.lives += 2;
      if (this.lives > 5) this.lives = 5;
  }

  loseEnergy() {
    this.energy--;
  }

  draw(ctx) {
    
    this.animations[this.state][this.facing].drawFrame(
      this.game.clockTick,
      ctx,
      this.x - 110 - this.game.camera.x,
      this.y,
      this.animationScales[this.state]
    );
    if (this.state === 6 && this.animations[this.state][this.facing].isDone()) {
      this.die();
    }

    if (this.endScreen) {
      ctx.drawImage(ASSET_MANAGER.getAsset('./sprites/winscreen.png'), 0, 0, 1200, 800);
    }

    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      ctx.strokeRect(this.spearBox.x - this.game.camera.x, this.spearBox.y, this.spearBox.width, this.spearBox.height);
    }

  }

}