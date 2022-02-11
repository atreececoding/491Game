class Knight {

    constructor(game) {
      this.game = game;

      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");
      this.rev_spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightRevSprites.png");
      this.lives = 5;
      this.energy = 2;

      this.size = 0;
      this.facing = 0; // 0 = right, 1 = left
      this.state = 4; // 0 = idle, 1 = walking, 2 = running, 3 = skidding, 4 = jumping/falling, 5 = ducking
      this.dead = false;

      this.lives = 5;
      this.energy = 3;

      this.x = 0;
      this.y = 0;
      this.speed = 100;
      this.velocity = {
        x: 0,
        y: 0,
      };

      this.updateBB();

      this.animations = [];
      this.loadAnimations();
      this.timer = 0;
      this.gameOver = false;
      };

    loadAnimations() {
        for (var i = 0; i < 7; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]);
            }
        }
        
        //Animation Key = # : 0 = idle, 1 = walk, 2 = run, 3 = jump, 4 = attack, 5 = hurt, 6 = die   
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 0, 20, 270, 106, 7, 0.25, false, true);        
        this.animations[1][0] = new Animator(this.spritesheet, 0, 140, 270, 110, 7, 0.15, false, true);
        this.animations[2][0] = new Animator(this.spritesheet, 0, 250, 270, 110, 7, 0.15, false, true);
        this.animations[3][0] = new Animator(this.spritesheet, 0, 365, 270, 110, 7, 0.15, false, true);
        this.animations[4][0] = new Animator(this.spritesheet, 0, 490, 270, 110, 7, 0.15, false, true);
        this.animations[5][0] = new Animator(this.spritesheet, 0, 610, 270, 110, 7, 0.15, false, false);
        this.animations[6][0] = new Animator(this.spritesheet, 0, 730, 270, 110, 7, 0.15, false, false);

        //facing left = 1
        this.animations[0][1] = new Animator(this.rev_spritesheet, 0, 20, 270, 110, 7, 0.15, true, true);
        this.animations[1][1] = new Animator(this.rev_spritesheet, 0, 140, 265, 110, 7, 0.15, true, true);
        this.animations[2][1] = new Animator(this.rev_spritesheet, 0, 250, 270, 110, 7, 0.15, true, true);
        this.animations[3][1] = new Animator(this.rev_spritesheet, 0, 365, 270, 110, 7, 0.15, true, true);
        this.animations[4][1] = new Animator(this.rev_spritesheet, 0, 490, 270, 110, 7, 0.15, true, true);
        this.animations[5][1] = new Animator(this.rev_spritesheet, 0, 610, 270, 110, 7, 0.15, true, true);
        this.animations[6][1] = new Animator(this.rev_spritesheet, 0, 730, 270, 110, 7, 0.15, true, true);
    }
  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x + 20,
      this.y,
      PARAMS.BLOCKWIDTH,
      PARAMS.BLOCKHEIGHT
    );
    this.lastSpearBB = this.spearBox;
    this.spearBox = new BoundingBox(
      this.x - 70,
      this.y,
      PARAMS.BLOCKWIDTH * 2.8,
      PARAMS.BLOCKHEIGHT
    );
  }

  die() {
    console.log("DEAD");
  }


  update() {
    const TICK = this.game.clockTick;

    // PHYSICS CONSTANTS
    const WALK_SPEED = 200;
    const RUN_SPEED = 300;
    const JUMP_SPEED = -1000;
    const FALL_SPEED = 500;

    this.timer += 2;

    if (this.dead) {
      this.y += FALL_SPEED;
    } else {
        // update velocity
        // ground physics
        if (this.state < 4) {
          if (this.game.keys["left"] && !this.game.keys["right"]) {
            if (this.game.keys["shift"]) {
              this.velocity.x = -RUN_SPEED;
            } else {
              this.velocity.x = -WALK_SPEED;
            }
          } else if (!this.game.keys["left"] && this.game.keys["right"]) {
              if (this.game.keys["shift"]) {
                this.velocity.x = RUN_SPEED;
              } else {
                this.velocity.x = WALK_SPEED;
              }
          } else {
            this.velocity.x = 0;
          }

          this.velocity.y = FALL_SPEED;

          if (this.game.keys["up"]) {
            if (this.energy > 0) {
              // jump
              this.velocity.y = JUMP_SPEED;
              this.state = 4;
              if (this.energy > 0) this.loseEnergy();
            }
          }
        }
       else {
        // air physics
        // vertical physics
        this.velocity.y += FALL_SPEED * TICK * PARAMS.SCALE;
      

        // horizontal physics
        if (this.game.keys["left"] && !this.game.keys["right"]) {
          if (this.game.keys["shift"]) {
            this.velocity.x = -RUN_SPEED;
          } else {
            this.velocity.x = -WALK_SPEED;
          }
        } else if (!this.game.keys["left"] && this.game.keys["right"]) {
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
    if (this.game.keys["left"]) this.facing = 1;
    if (this.game.keys["right"]) this.facing = 0;

    // need to add in if we fall off the map, we die
    if (this.timer > 1) this.timer = 0;
  }

    var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
        if (that.velocity.y > 0) {
          // falling
          if (
            (entity instanceof Floor || entity instanceof Platform) && // landing // TODO: may add more entities in here later
            that.lastBB.bottom <= entity.BB.top
          ) {
            // was above last tick
            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT;
            that.velocity.y = 0;
          }


          if (
            entity instanceof Goblin &&
            that.lastBB.bottom <= entity.BB.top && // was above last tick
            !entity.dead
          ) {
            that.velocity.y = 0; // bounce up
            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT;
          }

          if (that.state === 4) that.state = 0; // set state to idle

        }

        if (that.velocity.y < 0) {
          // TODO: handle enemy collision from bottom
        }

        // TODO: handle side collision here
        if (that.velocity.x >= 0) {
          if (
            entity instanceof Goblin && // collision with enemies or obstacles, TODO: may have to add more in later
            !entity.dead &&
            that.lastBB.right <= entity.BB.left
          ) {
            that.x = entity.BB.left - PARAMS.BLOCKWIDTH * 1.7;
            that.velocity.y = -240; // bounce up
            that.velocity.x = -240; // bounce to the left
          }

                    // if (entity instanceof Platform || entity instanceof Floor
          //     && (that.BB.right < entity.BB.left)
          //     && (that.BB.bottom < entity.BB.top)) {
          //     that.x = entity.BB.left - PARAMS.BLOCKWIDTH;
          //     that.velocity.x = 0;
          //     that.updateBB();
          // }
        }

        if (that.velocity.x <= 0) {
          if (
            entity instanceof Goblin && // collision with enemies or obstacles, TODO: may have to add more in later
            !entity.dead &&
            that.lastBB.left >= entity.BB.right
          ) {
            that.x = entity.BB.right;
            that.velocity.y = -240; // bounce up
            that.velocity.x = 240; // bounce to the left
          }

          // if (entity instanceof Platform || entity instanceof Floor
          //     && (that.BB.left > entity.BB.right)
          //     && (that.BB.bottom < entity.BB.top)) {
          //     that.x = entity.BB.left + PARAMS.BLOCKWIDTH;
          //     that.velocity.x = 0;
          //     that.updateBB();
          // }
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
          if (entity instanceof Apple && !entity.dead) {
            entity.removeFromWorld = true;
            if (that.game.options.debugging) print("Hit apple");
            that.gainAppleEnergy();
            if (that.game.options.debugging) print(that.energy);
          }
        }
      }
      if(entity.BB && that.spearBox.collide(entity.BB) && entity !== that) {
        if(entity instanceof Goblin && !entity.dead) {
          if((that.lastSpearBB.right <= entity.BB.left || that.lastSpearBB.right >= entity.BB.left + 20)) {
            if(that.game.keys["attack"]) {
              entity.loseHeart();
              console.log("got here");
            }
          }
          else if((that.lastSpearBB.left >= entity.BB.Right || that.lastSpearBB.right <= entity.BB.right - 20)) {
            if(that.game.keys["attack"]) {
              entity.loseHeart();
              console.log("got here");
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

  gainAppleEnergy() {
    this.energy += 200;
    if(this.lives < 5) {
      this.lives = 5;
    }
  }

  loseEnergy() {
    this.energy--;
  }

  draw(ctx) {

    if (this.lives <= 0){
      let flag = false;
      console.log("DEAD");
      this.animations[6][0].drawFrame(
        this.game.clockTick,
        ctx,
        this.x - 110 - this.game.camera.x,
        this.y,
        1.34125
      );
      if(this.animations[6][0].isDone()) {
        flag = true;
      }

      if(flag) {
        this.dead = true;
        this.gameOver = true;
      }
    }
    else {
      if (this.facing === 0 && this.velocity.x === 0 && !this.game.keys["up"] && !this.game.keys["attack"])
          this.animations[0][0].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - 110 - this.game.camera.x,
            this.y,
            1.45
          );
        else if (this.facing === 1 && this.velocity.x === 0 && !this.game.keys["up"] && !this.game.keys["attack"])
          this.animations[0][1].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - 110 - this.game.camera.x,
            this.y,
            1.45
          );
      if (this.game.keys["right"] && !this.game.keys["up"] && !this.game.keys["attack"] || this.velocity.x > 0 && !this.game.keys["up"] && !this.game.keys["attack"]) {
        this.animations[2][0].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - 110 - this.game.camera.x,
          this.y,
          1.34125
        );
        this.facing = 0;
      }else if (this.game.keys["left"] && !this.game.keys["up"] && !this.game.keys["attack"]|| this.velocity.x < 0 && !this.game.keys["up"] && !this.game.keys["attack"]) {
        this.animations[2][1].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - 110 - this.game.camera.x,
          this.y,
          1.34125
        );
        this.facing = 1;
      } 

      if(this.game.keys["attack"] && this.facing === 0) {
        console.log("Inside of if this.attack");
        this.animations[4][0].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - 110 - this.game.camera.x,
          this.y,
          1.34125
        );
      }
      else if(this.game.keys["attack"] && this.facing === 1) {
        console.log("Inside of if this.attack");
        this.animations[4][1].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - 110 - this.game.camera.x,
          this.y,
          1.34125
        );
      }

      if (this.game.keys["up"] && !this.game.keys["attack"]) {
        if (this.facing === 0 || (this.facing === 0 && this.velocity.x > 0)) {
          this.animations[3][0].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - 110 - this.game.camera.x,
            this.y,
            1.34125
          );
          }
          else if (this.facing === 1 || (this.facing === 0 && this.velocity.x < 0)){
            this.animations[3][1].drawFrame(
              this.game.clockTick,
              ctx,
              this.x - 110 - this.game.camera.x,
              this.y,
              1.34125
            );
          }
      } 
    }

    
    

    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      ctx.strokeRect(this.spearBox.x - this.game.camera.x, this.spearBox.y, this.spearBox.width, this.spearBox.height);
    }


  }
}