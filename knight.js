class Knight {
    constructor(game) {
        this.game = game;
        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/KnightSprites.png");
        this.animator = new Animator(this.spritesheet, 0, 0, 99, 70, 6, 0.15);

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
        for (var i = 0; i < 6; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]);
            }
        }
        //idle
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //facing left = 0
        this.animations[0][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //walking
        //facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //facing left = 0
        this.animations[1][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //Running
        //facing right = 0
        this.animations[2][0] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //facing left = 0
        this.animations[2][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //Jumping
        //facing right = 0
        this.animations[3][0] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //facing left = 0
        this.animations[3][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //attacking
        //facing right = 0
        this.animations[4][0] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);

        //facing left = 0
        this.animations[4][1] = new Animator(this.spritesheet, 99, 0, 99, 70, 6, 0.15);
    }
    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 768) this.x = 0;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
};
