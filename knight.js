class Knight {
    constructor(game) {
        this.game = game;
        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");

        this.size = 0;
        this.facing = 0;
        this.state = 0;
        this.dead = false;

        this.x = 0;
        this.y = 415;
        this.speed = 100;

        this.fallAcc = 560;

        this.animations = [];
        this.loadAnimations();
        
    };

    loadAnimations() {
        for (var i = 0; i < 7; i++) { //states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]); //facing left or right
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
    update() {
        
        

        if(this.game.right) {
            if (this.x > 768) this.x = 0;
            this.x += this.speed * 4 * this.game.clockTick;
        }
    };

    draw(ctx) {
        //this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if(!this.game.right && !this.game.left && !this.game.up && !this.game.down && !this.game.attack) {
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        }
        if(this.game.right) {
            this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.85);
        }
       // this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
};
