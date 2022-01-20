class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background.png");

    };
    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 768, 600);
    
    };
};
