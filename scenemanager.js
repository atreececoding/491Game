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

  loadLevel(level, x, y, transition, title, winscreen) {
    this.title = title;
    this.winscreen = winscreen;
    this.level = level;
    this.clearEntities();
    this.x = 0;
    this.underground = level.underground;

    // if(transition) {
    //     this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
    // } else {
    
    if (!this.title && !this.winscreen) {
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
    if (level.crates) {
      for (var i = 0; i < level.crates.length; i++) {
        let crate = level.crates[i];
        this.game.addEntity(new Crate(this.game, crate.x, crate.y, crate.w, crate.h));
      }
    }
    if (level.rats) {
      for (var i = 0; i < level.rats.length; i++) {
        let rat = level.rats[i];
        this.game.addEntity(new Rat(this.game, rat.x, rat.y, rat.size));
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
    if(level.goldpiles) {
      for (var i = 0; i < level.goldpiles.length; i++) {
        let goldpile = level.goldpiles[i];
        this.game.addEntity(new GoldPile(this.game, goldpile.x, goldpile.y, goldpile.w, goldpile.h));
      }
    }
    if (level.energyjuices) {
      for (var i = 0; i < level.energyjuices.length; i++) {
        let energy_juice = level.energyjuices[i];
        this.game.addEntity(new EnergyJuice(this.game, energy_juice.x, energy_juice.y, energy_juice.size));
      }
    }
    if (level.redapples) {
      for (var i = 0; i < level.redapples.length; i++) {
        let redapple = level.redapples[i];
        this.game.addEntity(new redApple(this.game, redapple.x, redapple.y, redapple.size));
      }
    }
    if (level.goldapples) {
      for (var i = 0; i < level.goldapples.length; i++) {
        let goldapple = level.goldapples[i];
        this.game.addEntity(new goldApple(this.game, goldapple.x, goldapple.y, goldapple.size));
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
    if (this.winscreen) {
      ctx.drawImage(
        ASSET_MANAGER.getAsset("./sprites/winscreen.png"),
        0,
        0,
        1200,
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
      this.loadLevel(this.level, 1, 1, true, false, false);
    }
    else if (this.knight.gameOver) {
      this.knight.gameOver = false;
      this.clearEntities();
      this.knight = new Knight(this.game, this.lives, this.energy, this.gameOver)
      this.loadLevel(this.level, 1, 1, true, false, false);
      this.lives = 5;
    }
    else if (this.knight.winCondition) {
      this.clearEntities();
      this.winscreen = true;
      //this.knight.winCondition = false;
      // this.knight = new Knight(this.game, this.lives, this.energy, this.gameOver)
      // this.loadLevel(this.level, 1, 1, true, false, this.winscreen);
      // this.lives = 5;
    }
  }
}
