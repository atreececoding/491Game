class EnergyJuice {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/energydrink.png");
        this.updateBB();
    };

    updateBB() {
        //this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH*.5, PARAMS.BLOCKHEIGHT*.3);
    };

    update() {

    };

    draw(ctx) {
<<<<<<< HEAD
        ctx.drawImage(this.spritesheet, 59, 19, 141, 221, this.x- this.game.camera.x, this.y, 50, 40 )
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
=======
        ctx.drawImage(this.spritesheet, 59, 19, 141, 221, this.x, this.y, 50, 40 )
        if (this.game.options.debugging) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
>>>>>>> main
    };
}

class Apple {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size });

        this.width = 50;
        this.height = 50;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goldApple.png");
        this.updateBB();
    };
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH*.5, PARAMS.BLOCKHEIGHT*.4);
    };
    update() {

    };

    draw(ctx) {
<<<<<<< HEAD
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
=======
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if (this.game.options.debugging) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
>>>>>>> main
    }
}