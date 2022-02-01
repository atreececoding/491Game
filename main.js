const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Images
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/KnightSprites.png");
ASSET_MANAGER.queueDownload("./sprites/KnightRevSprites.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");
ASSET_MANAGER.queueDownload("./sprites/goblinSprite.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/Platform1.png");
ASSET_MANAGER.queueDownload("./sprites/energydrink.png");
ASSET_MANAGER.queueDownload("./sprites/goldApple.png");
ASSET_MANAGER.queueDownload("./sprites/heart.png");
ASSET_MANAGER.queueDownload("./sprites/energy.png");
ASSET_MANAGER.queueDownload("./sprites/goldenergy.png")
ASSET_MANAGER.queueDownload("./sprites/dragon-attack.png");
ASSET_MANAGER.queueDownload("./sprites/ratAndBat.png");

// Music
ASSET_MANAGER.queueDownload("./music/AstralAcademy.mp3");

ASSET_MANAGER.downloadAll(() => {
  ASSET_MANAGER.autoRepeat("./music/AstralAcademy.mp3");

  const canvas = document.getElementById("gamecanvas");
  const ctx = canvas.getContext("2d");

  gameEngine.init(ctx);
  new SceneManager(gameEngine);
  gameEngine.start();
});
