class Lives {
    constructor(game, lives) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/heart.png");
        

    };
    update() {

    };
    draw(ctx) {
        //TODO: Figure out how to send variable lives to this class in order to update heart count

        //if(lives = 5) {
            ctx.drawImage(this.spritesheet, 26 ,33 ,572, 96, 5, 5, 250, 50 )
        //}

        /*else if (lives = 4) {
            ctx.drawImage(this.spritesheet, 26 ,145 ,572, 96, 5, 5, 250, 50 )
        }*/
        /*else if (lives = 3) {
            ctx.drawImage(this.spritesheet, 26 ,256 ,572, 96, 5, 5, 250, 50 )
        }*/
        /*else if (lives = 2) {
            ctx.drawImage(this.spritesheet, 26 ,366 ,572, 96, 5, 5, 250, 50 )
        }*/
        /*else if ( lives = 1) {
            //ctx.drawImage(this.spritesheet, 26 ,477 ,572, 96, 5, 5, 250, 50 )
        }*/
    };

};