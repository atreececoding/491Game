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
        ctx.drawImage(this.spritesheet, 59 ,19 ,141, 221, 575, 150, 50, 40 )
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}