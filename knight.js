class Knight {

    constructor(game) {
      this.game = game;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");
      this.rev_spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightRevSprites.png");

      this.size = 0;
      this.facing = 0; // 0 = right, 1 = left
      this.state = 3; // 0 = idle, 1 = walking, 2 = running, 3 = jumping/falling, 4 = attacking, 5 = hurting, 6 = dying

      this.lives = 5;
      this.energy = 3;

      this.x = 5000;
      this.y = 0;
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
        let Y_OFFSET_0 = 24;
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
        //TODO: CHANGE ATTACK TO NOT LOOP
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
    // if (this.BBtimer === undefined) {
    //   this.BBtimer = 0;
    // } else {
    //   this.BBtimer += this.game.clockTick;
    // }
    // if((this.lastBB !== undefined) && this.BBtimer > 1) console.log('lastBB ' + this.lastBB.x + ", " + this.lastBB.y);
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * .7,
      PARAMS.BLOCKHEIGHT * .9
    );
    // if((this.lastBB !== undefined) && this.BBtimer > 1) console.log('thisBB ' + this.BB.x + ", " + this.BB.y);
    // if (this.BBtimer > 1) {
    //   this.BBtimer = undefined;
    // }
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
  }

  win() {
    console.log("won the game!");
    this.winCondition = true;
  }


  update() {
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

    if (this.state === 6) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    } else if (this.state === 4) {
        if (this.animations[this.state][this.facing].isDone()) {
          this.animations[this.state][this.facing].reset();
          this.state = 0;
        }
    } else if (this.state === 5) {
        if(this.facing == 0) {
          console.log("working");
          this.velocity.x = -250;
          this.velocity.y = -150;
          this.x += this.velocity.x * TICK;
          this.y += this.velocity.y * TICK;

          this.updateBB();
        }
        else {
          console.log("working");
          this.velocity.x = 250;
          this.velocity.y = -150;
          this.x += this.velocity.x * TICK;
          this.y += this.velocity.y * TICK;

        this.updateBB();
        }
        if (this.animations[this.state][this.facing].isDone()) {
          this.animations[this.state][this.facing].reset();
          this.state = 0;
          this.loseHeart();         
        }
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
          } else {
            this.velocity.x = 0;
            this.state = 0;
          }
          
          // fall if you step off platform
          this.velocity.y = FALL_SPEED;

          if (this.game.keys["attack"]) {
            this.state = 4;
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
      }
      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
        if (that.velocity.y > 0) {
          // falling
          if (
            (entity instanceof Floor || entity instanceof Platform || entity instanceof Crate ) && // landing // TODO: may add more entities in here later // need to fix crate side collision
            that.lastBB.bottom <= entity.BB.top
          ) {
            // was above last tick
            that.y = entity.BB.top - that.BB.height;
            that.velocity.y = 0;
          }
          

          if (
            entity instanceof Goblin && Rat &&
            that.lastBB.bottom <= entity.BB.top && // was above last tick
            !entity.dead
          ) {
            that.velocity.y = 0; // bounce up
            that.y = entity.BB.top - that.BB.height;
          }
          // move this line into the conditional blocks if we don't want jump reset on collision
          if (that.state === 3) that.state = 0; // set state to idle

        }

   
        // TODO: handle side collision here
        if (that.facing === 0) {
          // if (
          //   entity instanceof Goblin && Rat &&// collision with enemies or obstacles, TODO: may have to add more in later
          //   !entity.dead &&
          //   that.lastBB.right <= entity.BB.left
          // ) {
          //   console.log("collided left");
          //   //that.x = entity.BB.left - that.BB.width;
          //   //that.state = 5;
      
          // }

          if (entity instanceof Crate && (that.BB.right > entity.BB.left) && !(that.lastBB.bottom <= entity.BB.top) && !(that.lastBB.top >= entity.BB.bottom)) {
            that.x = entity.BB.left - that.BB.width; // MAY NEED TO ADJUST FOR SIDESCROLLING
            that.velocity.x = 0;
            that.updateBB();
        }

        }
        //facing left
        if (that.facing === 1) {
          // if (
          //   entity instanceof Goblin && Rat &&// collision with enemies or obstacles, TODO: may have to add more in later
          //   !entity.dead &&
          //   that.lastBB.left >= entity.BB.right
          // ) {
          //   console.log("collided right");
          //   that.x = entity.BB.right;
          //   //that.state = 5;

          // }

         
          if (entity instanceof Crate && (that.BB.right >= entity.BB.left) && !(that.lastBB.bottom <= entity.BB.top) && !(that.lastBB.top >= entity.BB.bottom)) {
            that.x = entity.BB.right;
            that.velocity.x = 0;
            that.x += 1; // bounce to the right
            that.updateBB();
          }
        
        }
        if (that.velocity.y < 0) {
          // TODO: handle enemy collision from bottom
          if(entity instanceof Crate && that.lastBB.top >= entity.BB.bottom) {
            that.y = entity.BB.bottom;
            that.velocity.y = FALL_SPEED;
          }
        }

        if (that.velocity.x < 0 || that.velocity.x > 0) {
          if (entity instanceof EnergyJuice && !entity.dead) {
            entity.removeFromWorld = true;
            if (that.game.options.debugging) print("Hit energy drink");
            that.gainEnergy();
            if (that.game.options.debugging) print(that.energy);
          }
        }
        if (that.velocity.x < 0 || that.velocity.x > 0 || that.velocity.x > 0 || that.velocity.y > 0) {
          if (entity instanceof redApple && !entity.dead) {
            entity.removeFromWorld = true;
            if (that.game.options.debugging) print("Hit red apple");
            that.gainRedAppleEnergy();
            if (that.game.options.debugging) print(that.energy);
          }
          if (entity instanceof goldApple && !entity.dead) {
            entity.removeFromWorld = true;
            if (that.game.options.debugging) print("Hit gold apple");
            that.gainGoldAppleEnergy();
            if (that.game.options.debugging) print(that.energy);
          }
        }
      }
      if(entity.BB && that.spearBox.collide(entity.BB) && entity !== that) {
        if((entity instanceof Goblin || entity instanceof Dragon || entity instanceof Rat) && !entity.dead) {
          if((that.lastSpearBB.right <= entity.BB.left || that.lastSpearBB.right >= entity.BB.left + 20)) {
            if(that.state === 4) {
              entity.loseHeart();
              // if (that.game.options.debugging) console.log("got here");
            }
          }
          else if((that.lastSpearBB.left >= entity.BB.Right || that.lastSpearBB.right <= entity.BB.right - 20)) {
            if(that.state === 4) {
              entity.loseHeart();
              // if (that.game.options.debugging) console.log("got here");
            }
          }
        }
      }
      
    });
    that.updateBB();
  }

  loseHeart() {
    this.lives--;
  }

  gainEnergy() {
    if (this.energy < 5) {
      this.energy++;
    }
    if(this.lives < 5) {
      this.lives++;;
    }
  }

  gainGoldAppleEnergy() {
    this.energy += 200;
    if(this.lives < 5) {
      this.lives = 5;
    }
    this.win();

  }

  gainRedAppleEnergy() {
    if (this.energy < 5) {
      this.energy += 5;
    }
    if(this.lives < 5) {
      this.lives = 5;
    }
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

    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      ctx.strokeRect(this.spearBox.x - this.game.camera.x, this.spearBox.y, this.spearBox.width, this.spearBox.height);
    }

  }

}