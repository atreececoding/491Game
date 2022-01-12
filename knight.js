class Knight {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knight.png");
        
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 300, 0, 400, 400);
    };
};
