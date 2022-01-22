class Knight {
    constructor(game) {
        this.game = game;
        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");

        this.size = 0;
        this.facing = 0;
        this.state = 0;
        this.dead = false;

        this.x = 0;
        this.y = 422;
        this.speed = 100;

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
        this.animations[0][0] = new Animator(this.spritesheet, 0, 20, 101, 65, 7, 0.15);
        //facing left = 0
        //this.animations[0][1] = new Animator(this.spritesheet, 99, 0, 99, 60, 7, 0.15);

        //walking
        //facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 2, 98, 101.55, 61, 7, 0.15);
        //facing left = 0
       // this.animations[1][1] = new Animator(this.spritesheet, 99, 0, 99, 60, 6, 0.15);

        //Running
        //facing right = 0
        this.animations[2][0] = new Animator(this.spritesheet, 4, 160, 99, 70, 7, 0.15);
        //facing left = 0
       // this.animations[2][1] = new Animator(this.spritesheet, 99, 0, 99, 65, 6, 0.15);

       //Make individual frames? for changing widths
        //Jumping
        //facing right = 0
        //list = [110, 202, 284, 382, 480, 587, 703];
        this.animations[3][0] = new Animator(this.spritesheet, 4, 234, 112, 89, 7, 0.15);

        //facing left = 0
       // this.animations[3][1] = new Animator(this.spritesheet, 99, 0, 99, 90, 6, 0.15);

        //attacking
        //facing right = 0
        this.animations[4][0] = new Animator(this.spritesheet, 0, 0, 117, 401, 7, 0.15);
        //facing left = 0
       // this.animations[4][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    die() {

    };

    update() {
        
        

        if(this.game.right) {
            if (this.x > 768) this.x = 0;
            this.x += this.speed * 4 * this.game.clockTick;
        }

        // TODO: need to call updateBB(); somewhere in here after we update his x and y positions

        // TODO: before we can uncomment the collision handling, we need to implement the physics because it includes velocity
        // collision handling
        /*
        var that  = this;
        this.game.entities.forEach(function (entity) {
            // NOTE: may need to add a if (entity !== that) wrapper to not compare collision with self
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // falling
                    if ((entity instanceof Platform) // landing // TODO: may add more entities in here later
                        && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH; 
                        that.velocity.y === 0; // NOTE: not sure why Chris uses === to assign velocity here, may be a bug
                    } 
                    // TODO: update state here (ex. if(that.state === 4) that.state = 0;)
                    that.updateBB();

                    if ((entity instanceof Goblin || entity instanceof Bat) // collision with enemies or obstacles, TODO: may have to add more in later
                        && (that.lastBB.bottom) <= entity.BB.top // was above last tick
                        && !entity.dead) { // entity was already dead
                        loseHeart(); // lose a heart when you collide with an enemy or obstacle
                        that.velocity.y = -240; // bounce up
                        that.velocity.x = -240; // bounce to the left
                    }
                }

                if (that.velocity.y < 0) {
                    if ((entity instanceof Platform)
                        && (that.lastBB.top) >= entity.BB.bottom) { // was below last tick
                        that.velocity.y = 0;
                        } 
                    // TODO: handle enemy collision from bottom
                }

                // TODO: handle side collision here

                
                
            }
        });
        //*/
    };

    loseHeart() {

    };


    draw(ctx) {
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if(!this.game.right && !this.game.left && !this.game.up && !this.game.down && !this.game.attack) {
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        }
        if(this.game.right) {
            this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.85);
        }
        this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
};
