class Energy {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/energy.png");

    };

    update() {

    };
    draw(ctx) {
        this.state = this.game.camera.knight.energy;

        if(this.state > 100) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goldenergy.png");
            ctx.drawImage(this.spritesheet, 20 ,40 ,360, 40, this.x, this.y, 250, 50 );
        }
        if(this.state >= 5 && this.game.camera.knight.energy < 100) {
            ctx.drawImage(this.spritesheet, 20 ,40 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 4) {
            ctx.drawImage(this.spritesheet, 20 ,102 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 3) {
            ctx.drawImage(this.spritesheet, 20 ,165 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 2) {
            ctx.drawImage(this.spritesheet, 20 ,226,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 1) {
            ctx.drawImage(this.spritesheet, 20 ,350 ,360, 40, this.x, this.y, 250, 50 )
        }   
        else if (this.state == 0) {
            ctx.drawImage(this.spritesheet, 20 ,288 ,360, 40, this.x, this.y, 250, 50 )
        }   
    };
}