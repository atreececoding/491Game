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

    this.knight = new Knight(this.game, this.lives, this.energy, this.gameOver);
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
    if (level.healthbars) {
      for (var i = 0; i < level.healthbars.length; i++) {
        let health_bar = level.healthbars[i];
        this.game.addEntity(new HealthBar(this.game, health_bar.x, health_bar.y, health_bar.size));
      }
    }
    if (level.hungerbars) {
      for (var i = 0; i < level.hungerbars.length; i++) {
        let hunger_bar = level.hungerbars[i];
        this.game.addEntity(new HungerBar(this.game, hunger_bar.x, hunger_bar.y, hunger_bar.size));
      }
    }
    if (level.knights) {
      this.game.addEntity(this.knight);
    }
    // TODO: We should convert our values to be based on blockwidth like super marriott brothers
    if (level.goblins) {
      for (var i = 0; i < level.goblins.length; i++) {
        let goblin = level.goblins[i];
        this.game.addEntity(new Goblin(this.game, goblin.x, goblin.y, goblin.size));
      }
    }
    if (level.floors) {
      for (var i = 0; i < level.floors.length; i++) {
        let floor = level.floors[i];
        this.game.addEntity(new Floor(this.game, floor.x, floor.y, floor.size));
      }
    }
    if (level.clouds) {
      for (var i = 0; i < level.clouds.length; i++) {
        let cloud = level.clouds[i];
        this.game.addEntity(new Cloud(this.game, cloud.x, cloud.y, cloud.w, cloud.h));
      }
    }
    if (level.platforms) {
      for (var i = 0; i < level.platforms.length; i++) {
        let platform = level.platforms[i];
        this.game.addEntity(new Platform(this.game, platform.x, platform.y, platform.w, platform.h));
      }
    }
    if (level.bats) {
      for (var i = 0; i < level.bats.length; i++) {
        let bat = level.bats[i];
        this.game.addEntity(new Bat(this.game, bat.x, bat.y, bat.size));
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
        let energy_juice = level.energyjuices[i];
        this.game.addEntity(new EnergyJuice(this.game, energy_juice.x, energy_juice.y, energy_juice.size));
      }
    }
    if (level.apples) {
      for (var i = 0; i < level.apples.length; i++) {
        let apple = level.apples[i];
        this.game.addEntity(new Apple(this.game, apple.x, apple.y, apple.size));
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

  updateOptions() {
    var debug = document.getElementById("debug").checked;
    this.game.options.debugging = debug;
  }

  draw(ctx) {
    if (this.title) {
      ctx.drawImage(
        ASSET_MANAGER.getAsset("./sprites/title.png"),
        0,
        0,
        1000,
        800
      );
    }
  }
  update() {
    let midpoint = 768/2 - PARAMS.BLOCKWIDTH/2;

    //if (this.x < (this.knight.x - midpoint)) this.x = this.knight.x - midpoint;
    //this.x = this.knight.x - midpoint;
    this.x = this.knight.x + 60 - midpoint;

    this.updateAudio();
    this.updateOptions();
    if (this.title && this.game.keys["click"]) {
      this.title = false;
      this.loadLevel(this.level, 1, 1, true, false);
    }
    // else if (this.knight.dead) {
    //   this.loadLevel(this.level, 1, 1, true, false);
    // }
  }
}
