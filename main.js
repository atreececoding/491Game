const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Images
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/winscreen.png");
ASSET_MANAGER.queueDownload("./sprites/KnightSprites.png");
ASSET_MANAGER.queueDownload("./sprites/KnightRevSprites.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");
ASSET_MANAGER.queueDownload("./sprites/goblinSprite.png");
ASSET_MANAGER.queueDownload("./sprites/skeletons.png");
ASSET_MANAGER.queueDownload("./sprites/skeletonsRev.png");
ASSET_MANAGER.queueDownload("./sprites/Dragon2.png");
ASSET_MANAGER.queueDownload("./sprites/DragonRev2.png");
ASSET_MANAGER.queueDownload("./sprites/dragon2_grid.png");
ASSET_MANAGER.queueDownload("./sprites/DragonDead.png");
ASSET_MANAGER.queueDownload("./sprites/DragonMidAttack.png");
ASSET_MANAGER.queueDownload("./sprites/DragonUpperAttack.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");
ASSET_MANAGER.queueDownload("./sprites/floorLevelTwo.png");
ASSET_MANAGER.queueDownload("./sprites/Platform1.png");
ASSET_MANAGER.queueDownload("./sprites/energydrink.png");
ASSET_MANAGER.queueDownload("./sprites/goldApple.png");
ASSET_MANAGER.queueDownload("./sprites/redApple.png");
ASSET_MANAGER.queueDownload("./sprites/health_bar.png");
ASSET_MANAGER.queueDownload("./sprites/hunger_bar.png");
ASSET_MANAGER.queueDownload("./sprites/goldenergy.png")
ASSET_MANAGER.queueDownload("./sprites/dragon-attack.png");
ASSET_MANAGER.queueDownload("./sprites/ratAndBat.png");
ASSET_MANAGER.queueDownload("./sprites/ratAndBatRev.png");
ASSET_MANAGER.queueDownload("./sprites/cloud.png");
ASSET_MANAGER.queueDownload("./sprites/crates.png");
ASSET_MANAGER.queueDownload("./sprites/dragon.png");
ASSET_MANAGER.queueDownload("./sprites/TreasureHoard.png");
ASSET_MANAGER.queueDownload("./sprites/Level1Background.png");
ASSET_MANAGER.queueDownload("./sprites/Level2background.png");
ASSET_MANAGER.queueDownload("./sprites/castle.png");
ASSET_MANAGER.queueDownload("./sprites/castlegates.png");
ASSET_MANAGER.queueDownload("./sprites/gargoyle.png");
ASSET_MANAGER.queueDownload("./sprites/MetalSpikesFloor.png");
ASSET_MANAGER.queueDownload("./sprites/MetalSpikesCeiling.png");
ASSET_MANAGER.queueDownload("./sprites/message.png");

// Music
ASSET_MANAGER.queueDownload("./music/AstralAcademy.mp3");

// Sound Effects
ASSET_MANAGER.queueDownload("./sfx/crate_hit.wav");
ASSET_MANAGER.queueDownload("./sfx/dragon_attack.wav");
ASSET_MANAGER.queueDownload("./sfx/dragon_die.wav");
ASSET_MANAGER.queueDownload("./sfx/dragon_hurt.wav");
ASSET_MANAGER.queueDownload("./sfx/eat_apple.wav");
ASSET_MANAGER.queueDownload("./sfx/game_over.wav");
ASSET_MANAGER.queueDownload("./sfx/goblin_hurt.wav");
ASSET_MANAGER.queueDownload("./sfx/hit_ground.wav");
ASSET_MANAGER.queueDownload("./sfx/knight_hurt.wav");
ASSET_MANAGER.queueDownload("./sfx/level1_door.wav");
ASSET_MANAGER.queueDownload("./sfx/rat_hurt.wav");
ASSET_MANAGER.queueDownload("./sfx/red_bull.wav");
ASSET_MANAGER.queueDownload("./sfx/spear_hit.mp3");
ASSET_MANAGER.queueDownload("./sfx/walking.wav");


ASSET_MANAGER.downloadAll(() => {
  ASSET_MANAGER.autoRepeat("./music/AstralAcademy.mp3");

  ASSET_MANAGER.resetAudioOnEnd("./sfx/crate_hit.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/dragon_attack.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/dragon_die.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/dragon_hurt.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/eat_apple.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/game_over.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/goblin_hurt.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/hit_ground.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/knight_hurt.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/level1_door.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/rat_hurt.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/red_bull.wav");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/spear_hit.mp3");
  ASSET_MANAGER.resetAudioOnEnd("./sfx/walking.wav");


  const canvas = document.getElementById("gamecanvas");
  const ctx = canvas.getContext("2d");

  gameEngine.init(ctx);
  new SceneManager(gameEngine);
  gameEngine.start();
});
