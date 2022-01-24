class Goblin {
	constructor(game) {
		this.game = game;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblinSprite.png");
		
		
        this.size = 0;
        this.facing = 0;
        this.state = 0;
        this.dead = false;

        this.x = 600;
        this.y = 200;
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
        //walking right and left
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 0, 194, 64, 54, 7, 0.15);
        //facing left = 1
        this.animations[0][1] = new Animator(this.spritesheet, 0, 67, 64, 54, 7, 0.15);

        //Attacking
        //facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 0, 451, 64, 54, 5, 0.15);
        //facing left = 0
        this.animations[1][1] = new Animator(this.spritesheet, 0, 324, 64, 54, 5, 0.15);

        //Idle
        //this.animation[2][0] = new Animator(this.spritesheet, )
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH*1.2, PARAMS.BLOCKHEIGHT*.95);
    };

    die() {

    };

    update() {
        

        this.velocity.y += this.fallAcc * this.game.clockTick;
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        this.updateBB();

        var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
                    if (entity instanceof Knight) {

                    } else if ((entity instanceof Floor || entity instanceof Platform)
                        && that.lastBB.bottom <= entity.BB.top) {
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH;
                        that.velocity.y = 0;
                        that.updateBB();
                    } else if (entity !== that) {
                        that.velocity.x = -that.velocity.x;
                    }
                };
            });
    };

    draw(ctx) {
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.25);
      
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        
    };
}