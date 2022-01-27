class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.lives = 5;

        this.gameOver = false;
        this.title = true;
        this.level = null;

        this.knight = new Knight(gameEngine, this.lives);
        
    };
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {
        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;
        this.underground = level.underground;
        
        // if(transition) {
        //     this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        // } else {

            if(!this.title) {
                ASSET_MANAGER.playAsset("./music/AstralAcademy.mp3");
            };
            gameEngine.addEntity(this.knight);
	
            gameEngine.addEntity(new Floor(this.game, 0, 550, 800));
            gameEngine.addEntity(new Platform(this.game, 415, 314, 270, 250));
            gameEngine.addEntity(new Goblin(gameEngine));
            
            gameEngine.addEntity(new Lives(gameEngine));
            gameEngine.addEntity(new Background(this.game, 1, 1));
        //};
    }; 

    draw(ctx) {
        if(this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), 0, 0, 768, 600);
        };
    };
    update() {
        if(this.title && this.game.click) {
            this.title = false;
            this.loadLevel(1, 1, 1, true, false);
        }
    }
};