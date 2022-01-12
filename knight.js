class Knight {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        
    };

    update() {

    };

    draw(ctx) {
<<<<<<< HEAD
        ctx.drawImage(this.spritesheet, 200, 0, 400, 400);
=======
        ctx.drawImage(this.spritesheet, 0, 0, 400, 400);
>>>>>>> GlennBranch
    };
};
