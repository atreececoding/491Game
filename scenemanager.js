class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.lives = 5;
    this.energy = 5;

    this.gameOver = false;
    this.title = true;
    this.level = null;

    this.knight = new Knight(this.game, this.lives, this.energy);
  }
  clearEntities() {
    this.game.entities.forEach(function (entity) {
      entity.removeFromWorld = true;
    });
  }

  loadLevel(level, x, y, transition, title) {
    this.title = title;
    this.level = level;
    this.clearEntities();
    this.x = 0;
    this.underground = level.underground;

    // if(transition) {
    //     this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
    // } else {

    if (!this.title) {
      ASSET_MANAGER.playAsset("./music/AstralAcademy.mp3");
    }

    this.game.addEntity(this.knight);

    this.game.addEntity(new Floor(this.game, 0, 550, 800));
    this.game.addEntity(new Platform(this.game, 415, 314, 270, 250));
    this.game.addEntity(new RatAndBat(this.game));
    this.game.addEntity(new Goblin(this.game));
    this.game.addEntity(new Dragon(this.game));
    this.game.addEntity(new EnergyJuice(this.game));
    this.game.addEntity(new Lives(this.game));
    this.game.addEntity(new Energy(this.game));
    this.game.addEntity(new Background(this.game, 1, 1));
    //};
  }

  updateAudio() {
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;

    ASSET_MANAGER.muteAudio(mute);
    ASSET_MANAGER.adjustVolume(volume);
  }

  draw(ctx) {
    if (this.title) {
      ctx.drawImage(
        ASSET_MANAGER.getAsset("./sprites/title.png"),
        0,
        0,
        768,
        600
      );
    }
  }
  update() {
    this.updateAudio();
    if (this.title && this.game.click) {
      this.title = false;
      this.loadLevel(1, 1, 1, true, false);
    }
  }
}
