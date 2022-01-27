class Lives {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/heart.png");
        this.instanceOfKnight = new Knight();
        console.log(this.instanceOfKnight.lives);
        this.lifeCount = (this.instanceOfKnight.lives);
        

    };
    update() {

    };
    draw(ctx) {
        //TODO: Figure out how to send variable lives to this class in order to update heart count
        
        if(this.lifeCount == 5) {
            ctx.drawImage(this.spritesheet, 26 ,33 ,572, 96, 5, 5, 250, 50 )
        }
        else if (this.lifeCount == 4) {
            ctx.drawImage(this.spritesheet, 26 ,145 ,572, 96, 5, 5, 250, 50 )
        }
        else if (this.lifeCount ==3) {
            ctx.drawImage(this.spritesheet, 26 ,256 ,572, 96, 5, 5, 250, 50 )
        }
        else if (this.lifeCount == 2) {
            ctx.drawImage(this.spritesheet, 26 ,366 ,572, 96, 5, 5, 250, 50 )
        }
        else if (this.lifeCount == 1) {
            ctx.drawImage(this.spritesheet, 26 ,477 ,572, 96, 5, 5, 250, 50 )
        }   
    };

};