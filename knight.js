class Knight {
    constructor(game) {
        this.game = game;
        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");
        this.rev_spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightRevSprites.png");

        this.size = 0;
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = skidding, 4 = jumping/falling, 5 = ducking
        this.dead = false;

        this.lives = 5;

        this.x = 0;
        this.y = 0;
        this.speed = 100;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.fallAcc = 560;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();


        
    };

    loadAnimations() {
        for (var i = 0; i < 7; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]);
            }
        }
        //idle
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 0, 20, 101, 65, 7, 0.15, false, true);
        //facing left = 0
        this.animations[0][1] = new Animator(this.rev_spritesheet, 48, 20, 101, 65, 7, 0.15, true, true);

        //walking
        //facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 2, 98, 101.55, 61, 7, 0.15, false, true);
        //facing left = 0
       // this.animations[1][1] = new Animator(this.spritesheet, 99, 0, 99, 60, 6, 0.15);

        //Running
        //facing right = 0
        this.animations[2][0] = new Animator(this.spritesheet, 4, 160, 99, 70, 7, 0.15, false, true);
        //facing left = 0
       this.animations[2][1] = new Animator(this.rev_spritesheet, 50, 160, 99, 70, 7, 0.15, true , true);

       //Make individual frames? for changing widths
        //Jumping
        //facing right = 0
        //list = [110, 202, 284, 382, 480, 587, 703];
        this.animations[3][0] = new Animator(this.spritesheet, 4, 234, 112, 89, 7, 0.15, false, true);

        //facing left = 0
       // this.animations[3][1] = new Animator(this.spritesheet, 99, 0, 99, 90, 6, 0.15);

        //attacking
        //facing right = 0
        this.animations[4][0] = new Animator(this.spritesheet, 0, 0, 117, 401, 7, 0.15, false, true);
        //facing left = 0
       // this.animations[4][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH*1.7, PARAMS.BLOCKHEIGHT);
    };

    die() {

    };

    update() {

       
        const TICK = this.game.clockTick;
        // physics constants grabbed from chris's super marriott brothers
        const MIN_WALK = 4.453125;
        const MAX_WALK = 250;
        const MAX_RUN = 300;
        const ACC_WALK = 200;
        const ACC_RUN = 600;
        const DEC_REL = 800;
        const DEC_SKID = 500;
        const MIN_SKID = 33.75;

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        const RUN_FALL = 2025;
        const STOP_FALL_A = 450;
        const WALK_FALL_A = 421.875;
        const RUN_FALL_A = 562.5;


        const MAX_FALL = 500;

        if (this.dead) {
            this.velocity.y += RUN_FALL * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        } else {
            
            // update velocity


            if (this.state < 4) { // not jumping
                // ground physics
                if (abs(this.velocity.x) < MIN_WALK) { // slower than a walk // starting, stopping or turning around
                    this.velocity.x = 0;
                    this.state = 0;
                    if (this.game.left) {
                        this.velocity.x -= MIN_WALK;
                    }

                    if (this.game.right) {
                        this.velocity.x += MIN_WALK;
                    }
                }

                else if (abs(this.velocity.x) >= MIN_WALK) { // faster than a walk // accelerating or decelerating
                    if (this.facing === 0) {
                        if (this.game.right && !this.game.left) {
                            if (this.game.shift) {
                                this.velocity.x += ACC_RUN * TICK;
                                
                            }
                            else {
                                this.velocity.x += ACC_WALK * TICK;
                            }

                        }
                        
                        else if (this.game.left && !this.game.right) {
                            this.velocity.x -= DEC_SKID * TICK;
                            this.state = 3;
                            if(this.velocity.x < 0) {
                                this.velocity.x = 0;
                            }
                        }

                        else {
                            this.velocity.x -= DEC_REL * TICK;
                            if(this.velocity.x < 0) {
                                this.velocity.x = 0;
                            }
                        }
                    }

                    else if (this.facing === 1) {
                        if (this.game.left && !this.game.right) {
                            if (this.game.shift) {
                                this.velocity.x -= ACC_RUN * TICK;
                            }
                            else {
                                this.velocity.x -= ACC_WALK * TICK;
                            }
                        }

                        else if (this.game.right && !this.game.left) {
                            this.velocity.x += DEC_SKID * TICK;
                            this.state = 3;

                            if(this.velocity.x > 0) {
                                this.velocity.x = 0;
                            }
                        }

                        else {
                            this.velocity.x += DEC_REL * TICK;

                            if(this.velocity.x > 0) {
                                this.velocity.x = 0;
                            }
                        }
                    }
                }

                this.velocity.y += this.fallAcc * TICK;

                if (this.game.up) { // jump
                    if (abs(this.velocity.x) < 16) {
                        this.velocity.y = -1000;
                        this.fallAcc = STOP_FALL;
                    }

                    else if (abs(this.velocity.x) < 40) {
                        this.velocity.y = -1000;
                        this.fallAcc = WALK_FALL;
                    }

                    else {
                        this.velocity.y = -1000;
                        this.fallAcc = RUN_FALL;
                    }
                    this.state = 4;
                }

            }

            else {
                // air physics

                // vertical physics
                if (this.velocity.y < 0 && this.game.up) { // holding A while jumping jumps higher
                    if (this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                    if (this.fallAcc === WALK_FALL) this.velocity.y -= (WALK_FALL - WALK_FALL_A) * TICK;
                    if (this.fallAcc === RUN_FALL) this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
                }
                this.velocity.y += this.fallAcc * TICK;

                // horizontal physics
                if (this.game.right && !this.game.left) {
                    if (abs(this.velocity.x) > MAX_WALK) {
                        this.velocity.x += ACC_RUN * TICK;
                    }
                    else {
                        this.velocity.x += ACC_WALK * TICK;
                    }
                }

                else if (this.game.left && !this.game.right) {
                    if (abs(this.velocity.x) > MAX_WALK) {
                        this.velocity.x -= ACC_RUN * TICK;
                    }
                    else {
                        this.velocity.x -= ACC_WALK * TICK;
                    }
                }

                else {
                    // do nothing
                }
            }

            // max speed calculation 
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

            if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
            if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
            if (this.velocity.x >= MAX_WALK && !this.game.shift) this.velocity.x = MAX_WALK;
            if (this.velocity.x <= -MAX_WALK && !this.game.shift) this.velocity.x = -MAX_WALK;
            

            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;

            // NOTE: temporary code to make him stay on the screen
            if (this.x > 768) this.x = 0;
            if (this.x < 0) this.x = 768;
            //if (this.y > 422) this.velocity.y = 0; this.y = 422; this.state = 0;
            this.updateBB();

            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;


            // need to add in if we fall off the map, we die
        }
        
        // old code
        // if(this.game.right) {
        //     if (this.x > 768) this.x = 0;
        //     this.x += this.speed * 4 * this.game.clockTick;
        // }



        // TODO: before we can uncomment the collision handling, we need to implement the physics because it includes velocity
        // collision handling
    
        var that  = this;
        this.game.entities.forEach(function (entity) {
            // NOTE: may need to add a if (entity !== that) wrapper to not compare collision with self
            if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
                if (that.velocity.y > 0) { // falling
                    if ((entity instanceof Floor || entity instanceof Platform) // landing // TODO: may add more entities in here later
                        && (that.lastBB.bottom <= entity.BB.top)) { // was above last tick
                        that.y = entity.BB.top - PARAMS.BLOCKHEIGHT; 
                        that.velocity.y = 0; // NOTE: not sure why Chris uses === to assign velocity here, may be a bug
                    } 

                    if(that.state === 4) that.state = 0; // set state to idle
                    that.updateBB(); 

                    if ((entity instanceof Goblin) // collision with enemies or obstacles, TODO: may have to add more in later
                        && (that.lastBB.bottom <= entity.BB.top) // was above last tick
                        && !entity.dead) { // entity was already dead
                        // that.loseHeart(); // lose a heart when you collide with an enemy or obstacle
                        that.velocity.y = -240; // bounce up
                        that.velocity.x = -240; // bounce to the left
                        print('hit top collision of goblin');
                        
                    }
                }

                if (that.velocity.y < 0) {
<<<<<<< HEAD
                    if ((entity instanceof Floor || Platform)
                        && (that.lastBB.top >= entity.BB.bottom)) { // was below last tick
                        that.y = entity.BB.bottom;
                        that.velocity.y = 0;
                        that.updateBB(); 
                        print('hit bottom collision of floor');
                        } 
=======
                  
>>>>>>> main
                    // TODO: handle enemy collision from bottom
                }

                // TODO: handle side collision here
                if (that.velocity.x > 0) {
                    if ((entity instanceof Goblin) // collision with enemies or obstacles, TODO: may have to add more in later
                    && !entity.dead) {
                        that.x = entity.BB.left - PARAMS.BLOCKWIDTH; 
                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.x = 0;
                        that.y = 0;
                        that.updateBB(); 
                        print('hit side collision goblin');
                        that.loseHeart();
                    }

                    // if (entity instanceof Platform || entity instanceof Floor
                    //     && (that.BB.right < entity.BB.left)
                    //     && (that.BB.bottom < entity.BB.top)) {
                    //     that.x = entity.BB.left - PARAMS.BLOCKWIDTH; 
                    //     that.velocity.x = 0;
                    //     that.updateBB(); 
                    // }
                }

                if (that.velocity.x < 0) {
                    if ((entity instanceof Goblin) // collision with enemies or obstacles, TODO: may have to add more in later
                    && !entity.dead) {
                        that.x = entity.BB.left + PARAMS.BLOCKWIDTH; 
                        that.velocity.x = 0;
                        that.velocity.y = 0;
                        that.updateBB(); 
                        print('hit side collision goblin 2');
                    }

                    // if (entity instanceof Platform || entity instanceof Floor
                    //     && (that.BB.left > entity.BB.right)
                    //     && (that.BB.bottom < entity.BB.top)) {
                    //     that.x = entity.BB.left + PARAMS.BLOCKWIDTH; 
                    //     that.velocity.x = 0;
                    //     that.updateBB(); 
                    // }
                }
                
     
            }
        });
        
    };

    loseHeart() {
        this.lives--;
        print(this.lives);
    };


    draw(ctx) {
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if(!this.game.right && !this.game.left/* && !this.game.left && !this.game.up && !this.game.down && !this.game.attack*/) {
            if (this.facing === 0) this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
            else if (this.facing === 1) this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        }
        if(this.game.right) {
            this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.85);
        }
        else if(this.game.left) {
            this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.85);
        }

        // this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};
