const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/knight.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gamecanvas");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(new Knight(this.game, 1, 1));

	gameEngine.addEntity(new Background(this.game, 1, 1));

	gameEngine.start();
});