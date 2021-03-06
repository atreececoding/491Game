class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = 0;

    this.lives = 5;
    this.energy = 5;

    this.gameOver = false;
    this.title = true;
    this.storyScreen = false;
    this.level = null;

    this.knight = new Knight(this.game, this.lives, this.energy, this.gameOver);
    this.puzzleSolved = false;
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
    this.x = x;
    this.y = y;

    this.knight.x = x;
    this.knight.y = y;
    this.knight.removeFromWorld = false;
    this.knight.velocity = { x: 0, y: 0 };
    var that = this;
    var knight = false;
    this.game.entities.forEach(function(entity) {
        if(that.knight === entity) knight = true;
    });
    if(!knight) this.game.addEntity(this.knight);


    //this.underground = level.underground;

    // if(transition) {
    //     this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
    // } else {
    


    if (!this.title && !this.winscreen && !this.storyScreen) {
      if (level.music) {
        ASSET_MANAGER.playAsset(level.music);
      }
    }
    if (level.signposts) {
      for (var i = 0; i < level.signposts.length; i++) {
        let signpost = level.signposts[i];
        this.game.addEntity(new SignPost(this.game, signpost.x, signpost.y, signpost.w, signpost.h, signpost.id));
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
    if (level.dragons) {
      for (var i = 0; i < level.dragons.length; i++) {
        let dragon = level.dragons[i];
        this.game.addEntity(new Dragon(this.game, dragon.x, dragon.y, dragon.size));
      }
    }
    if (level.endplatforms) {
      for (var i = 0; i < level.endplatforms.length; i++) {
        let endplatform = level.endplatforms[i];
        this.game.addEntity(new EndPlatform(this.game, endplatform.x, endplatform.y));
      }
    }
    // TODO: We should convert our values to be based on blockwidth like super marriott brothers
    if (level.goblins) {
      for (var i = 0; i < level.goblins.length; i++) {
        let goblin = level.goblins[i];
        this.game.addEntity(new Goblin(this.game, goblin.x, goblin.y, goblin.size));
      }
    }
    if (level.skeletons) {
      for(var i = 0; i < level.skeletons.length; i++) {
        let skeleton = level.skeletons[i];
        this.game.addEntity(new Skeleton(this.game, skeleton.x, skeleton.y, skeleton.size))
      }
    }
    if (level.gargoyles) {
      for(var i = 0; i < level.gargoyles.length; i++) {
        let gargoyle = level.gargoyles[i];
        this.game.addEntity(new Gargoyle(this.game, gargoyle.x, gargoyle.y, gargoyle.size))
      }
    }
    if (level.rats) {
      for (var i = 0; i < level.rats.length; i++) {
        let rat = level.rats[i];
        this.game.addEntity(new Rat(this.game, rat.x, rat.y, rat.size));
      }
    }
    if (level.floors) {
      for (var i = 0; i < level.floors.length; i++) {
        let floor = level.floors[i];
        this.game.addEntity(new Floor(this.game, floor.x, floor.y, floor.size));
      }
    }
    if (level.statuepuzzles) {
      for (var i = 0; i < level.statuepuzzles.length; i++) {
        let statuepuzzle = level.statuepuzzles[i];
        this.game.addEntity(new StatuePuzzle(this.game, statuepuzzle.x, statuepuzzle.y, statuepuzzle.v));
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
    if (level.bells) {
      for (var i = 0; i < level.bells.length; i++) {
        let bell = level.bells[i];
        this.game.addEntity(new Bell(this.game, bell.x, bell.y, bell.w, bell.h));
      }
    }
    if (level.metalspikesfloor) {
      for (var i = 0; i < level.metalspikesfloor.length; i++) {
        let metalspikefloor = level.metalspikesfloor[i];
        this.game.addEntity(new MetalSpikesFloor(this.game, metalspikefloor.x, metalspikefloor.y, metalspikefloor.w, metalspikefloor.h));
      }
    }
    if (level.metalspikesceiling) {
      for (var i = 0; i < level.metalspikesceiling.length; i++) {
        let metalspikeceiling = level.metalspikesceiling[i];
        this.game.addEntity(new MetalSpikesCeiling(this.game, metalspikeceiling.x, metalspikeceiling.y, metalspikeceiling.w, metalspikeceiling.h));
      }
    }
    if (level.bats) {
      for (var i = 0; i < level.bats.length; i++) {
        let bat = level.bats[i];
        this.game.addEntity(new Bat(this.game, bat.x, bat.y, bat.size));
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
    if (level.bluepotions) {
      for(var i = 0; i < level.bluepotions.length; i++) {
        let bluepotion = level.bluepotions[i];
        this.game.addEntity(new BluePotion(this.game, bluepotion.x, bluepotion.y, bluepotion.size));
      }
    }
    if (level.goldapples) {
      for (var i = 0; i < level.goldapples.length; i++) {
        let goldapple = level.goldapples[i];
        this.game.addEntity(new goldApple(this.game, goldapple.x, goldapple.y, goldapple.size));
      }
    }
    if (level.castlegates) {
      for(var i = 0; i < level.castlegates.length; i++) {
        let castlegate = level.castlegates[i];
        this.game.addEntity(new CastleGates(this.game, castlegate.x, castlegate.y, castlegate.w, castlegate.h));
      }
    }
    if (level.castles) {
      for (var i = 0; i < level.castles.length; i++) {
        let castle = level.castles[i];
        this.game.addEntity(new Castle(this.game, castle.x, castle.y, castle.size));
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
    ASSET_MANAGER.adjustAssetVolume("./music/AstralAcademy.mp3", volume * .6);
    ASSET_MANAGER.adjustAssetVolume("./sfx/hit_ground.wav", volume * .4);
    ASSET_MANAGER.adjustAssetVolume("./sfx/walking.wav", volume * .4);
    ASSET_MANAGER.adjustAssetVolume("./sfx/crate_hit.wav", volume * .4);
    ASSET_MANAGER.adjustAssetVolume("./sfx/spear_hit.mp3", volume * .7);

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
        1200,
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
    if (this.storyScreen) {
      ctx.drawImage(
        ASSET_MANAGER.getAsset("./sprites/storyScreen.png"),
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
    if (this.knight.x - midpoint >= -50) {
      this.x = this.knight.x + 60 - midpoint;
    }

    this.updateAudio();
    this.updateOptions();
    if (this.title && this.game.keys["one"]) {
      this.title = false;
      this.game.camera.loadLevel(levelOneRedone, 0, 555, false, false, false);
    }
    else if (this.title && this.game.keys["two"]) {
      this.title = false;
      this.game.camera.loadLevel(levelTwo, 0, 555, false, false, false);
    }
    else if (this.title && this.game.keys["three"]) {
      this.title = false;
      this.loadLevel(levelDebug, 0, 555, false, false, false);
    }
    else if (this.title && this.game.keys["four"]) {
      this.title = false;
      this.loadLevel(bossRoom, 0, 555, false, false, false);
    }
    else if (this.title && this.game.keys["click"]) {
      this.title = false;
      this.storyScreen = true;
      
    }
    // else if(!this.title && !this.knight.gameOver && !this.knight.winCondition && !levelOne) {
    //   this.loadLevel(this.level, 1, 1, true, false, false);
    // }
    else if (this.storyScreen && this.game.keys["enter"]) {
      this.storyScreen = false;
      this.loadLevel(levelOne, 0, 555, true, false, false);
    }
    else if (this.knight.gameOver) {
      this.knight.gameOver = false;
      this.clearEntities();
      this.knight = new Knight(this.game, this.lives, this.energy, this.gameOver);
      if(this.game.camera.level === bossRoom) {
        this.knight.energy = 1000;
      }
      this.loadLevel(this.level, 0, 555, true, false, false);
      this.lives = 5;
    }
    else if (this.knight.storyScreen) {
      this.storyScreen = true;

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
