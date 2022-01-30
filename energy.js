class Energy {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/energy.png");
        
        this.game.camera.knight.energy

    };
    update() {

    };
    draw(ctx) {
        if(this.game.camera.knight.energy >= 5) {
            ctx.drawImage(this.spritesheet, 20 ,40 ,360, 40, 5, 60, 250, 50 )
        }
        else if (this.game.camera.knight.energy == 4) {
            ctx.drawImage(this.spritesheet, 20 ,102 ,360, 40, 5, 60, 250, 50 )
        }
        else if (this.game.camera.knight.energy == 3) {
            ctx.drawImage(this.spritesheet, 20 ,165 ,360, 40, 5, 60, 250, 50 )
        }
        else if (this.game.camera.knight.energy == 2) {
            ctx.drawImage(this.spritesheet, 20 ,226,360, 40, 5, 60, 250, 50 )
        }
        else if (this.game.camera.knight.energy == 1) {
            ctx.drawImage(this.spritesheet, 20 ,350 ,360, 40, 5, 60, 250, 50 )
        }   
        else if (this.game.camera.knight.energy == 0) {
            ctx.drawImage(this.spritesheet, 20 ,288 ,360, 40, 5, 60, 250, 50 )
        }   
    };
}