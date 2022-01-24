const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Images
ASSET_MANAGER.queueDownload("./sprites/KnightSprites.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");
ASSET_MANAGER.queueDownload("./sprites/goblinSprite.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/Platform1.png");

// Music
ASSET_MANAGER.queueDownload("./music/AstralAcademy.mp3");

ASSET_MANAGER.downloadAll(() => {	
	ASSET_MANAGER.autoRepeat("./music/AstralAcademy.mp3");
	ASSET_MANAGER.playAsset("./music/AstralAcademy.mp3");
	const canvas = document.getElementById("gamecanvas");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Knight(gameEngine));
	gameEngine.addEntity(new Goblin(gameEngine));
	
	gameEngine.addEntity(new Floor(this.game, 0, 550, 800));
	gameEngine.addEntity(new Platform(this.game, 415, 314, 270, 250));
	
	gameEngine.addEntity(new Background(this.game, 1, 1));

	gameEngine.init(ctx);

	gameEngine.start();
});