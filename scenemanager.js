class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.lives = 5;
    this.energy = 5;

    this.gameOver = false;
    this.title = true;
    this.level = levelOne;

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
      if (level.music) {
        ASSET_MANAGER.playAsset(level.music);
      }
    }

    if (level.knights) {
      this.game.addEntity(this.knight);
    }
    // TODO: We should convert our values to be based on blockwidth like super marriott brothers
    if (level.floors) {
      for (var i = 0; i < level.floors.length; i++) {
        let floor = level.floors[i];
        this.game.addEntity(new Floor(this.game, floor.x, floor.y, floor.size));
      }
    }
    if (level.floors) {
      for (var i = 0; i < level.floors.length; i++) {
        let floor = level.floors[i];
        this.game.addEntity(new Floor(this.game, floor.x, floor.y, floor.size));
      }
    }
    if (level.platforms) {
      for (var i = 0; i < level.platforms.length; i++) {
        let platform = level.platforms[i];
        this.game.addEntity(new Platform(this.game, platform.x, platform.y, platform.w, platform.h));
      }
    }
    if (level.ratsandbats) {
      for (var i = 0; i < level.ratsandbats.length; i++) {
        let ratandbat = level.ratsandbats[i];
        this.game.addEntity(new RatAndBat(this.game, ratandbat.x, ratandbat.y, ratandbat.size));
      }
    }
    if (level.goblins) {
      for (var i = 0; i < level.goblins.length; i++) {
        let goblin = level.goblins[i];
        this.game.addEntity(new Goblin(this.game, goblin.x, goblin.y, goblin.size));
      }
    }
    if (level.dragons) {
      for (var i = 0; i < level.dragons.length; i++) {
        let dragon = level.dragons[i];
        this.game.addEntity(new Dragon(this.game, dragon.x, dragon.y, dragon.size));
      }
    }
    if (level.energyjuices) {
      for (var i = 0; i < level.energyjuices.length; i++) {
        let energyjuice = level.energyjuices[i];
        this.game.addEntity(new EnergyJuice(this.game, energyjuice.x, energyjuice.y, energyjuice.size));
      }
    }
    if (level.apples) {
      for (var i = 0; i < level.apples.length; i++) {
        let apple = level.apples[i];
        this.game.addEntity(new Apple(this.game, apple.x, apple.y, apple.size));
      }
    }
    if (level.lives) {
      for (var i = 0; i < level.lives.length; i++) {
        let lives = level.lives[i];
        this.game.addEntity(new Lives(this.game, lives.x, lives.y, lives.size));
      }
    }
    if (level.energies) {
      for (var i = 0; i < level.energies.length; i++) {
        let energy = level.energies[i];
        this.game.addEntity(new Energy(this.game, energy.x, energy.y, energy.size));
      }
    }
    if (level.backgrounds) {
      for (var i = 0; i < level.backgrounds.length; i++) {
        let background = level.backgrounds[i];
        this.game.addEntity(new Background(this.game, background.x, background.y, background.size));
      }
    }

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
      this.loadLevel(this.level, 1, 1, true, false);
    }
  }
}
