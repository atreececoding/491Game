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

class Floor {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png")
    };

    update() {
        
    };

    draw(ctx) {
        for (var i = 0; i <= 702; i+= 78) {
            ctx.drawImage(this.spritesheet, i, 550, 78, 77);
        };
    };
};
