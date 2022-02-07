class EnergyJuice {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/energydrink.png");
        this.updateBB();
    };

    updateBB() {
        //this.lastBB = this.BB;
        this.BB = new BoundingBox(575, 150, PARAMS.BLOCKWIDTH*.5, PARAMS.BLOCKHEIGHT*.3);
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 59 ,19 ,141 , 221, 575 - this.game.camera.x, 150, 50, 40 )
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };
}

class Apple {
    constructor(game) {
        this.x = 650;
        this.y = 230;

        this.width = 50;
        this.height = 50;

        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goldApple.png");
        this.updateBB();
    };
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH*.5, PARAMS.BLOCKHEIGHT*.4);
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}