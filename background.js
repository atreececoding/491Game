class Background {
  constructor(game, x = 0, y = 0) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Level1Background.png");
    this.spritesheetTwo = ASSET_MANAGER.getAsset("./sprites/Level2background.png");
  }
  update() {}

  draw(ctx) {
    // Hardcoded
    if(this.game.camera.level === (levelOne || levelOneRedone)) 
      ctx.drawImage(this.spritesheet, 0-this.game.camera.x, 0, 7000, 800);
    else if(this.game.camera.level === levelTwo)
      ctx.drawImage(this.spritesheetTwo, -1300-this.game.camera.x, 0, 16800, 900);
    else
      ctx.drawImage(this.spritesheetTwo, -1300-this.game.camera.x, 0, 16800, 1000);
  }
}
class Floor {
  constructor(game, x = 0, y = 0, w) {
    Object.assign(this, { game, x, y, w });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png");
    this.spritesheetTwo = ASSET_MANAGER.getAsset("./sprites/floorLevelTwo.png");
    this.isImpassible = true;
    this.BB = new BoundingBox(0, this.y, 12300, PARAMS.BLOCKWIDTH * 2);
    // this.leftBB = new BoundingBox(
    //   this.x,
    //   this.y,
    //   PARAMS.BLOCKWIDTH,
    //   PARAMS.BLOCKWIDTH * 2
    // );
    // this.rightBB = new BoundingBox(
    //   this.x + this.w - PARAMS.BLOCKWIDTH,
    //   this.y,
    //   PARAMS.BLOCKWIDTH,
    //   PARAMS.BLOCKWIDTH * 2
    // );
  }

  update() {}

  draw(ctx) {
    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
    if(this.game.camera.level === levelOne) {
      for (var i = 0; i <= 6000; i += 78) {
        ctx.drawImage(this.spritesheet, i - this.game.camera.x, 735, 78, 77);
      }
    }
    else if(this.game.camera.level === levelTwo) {
      for (var i = 0; i <= 12000; i += 78) {
        ctx.drawImage(this.spritesheetTwo, i - this.game.camera.x, 735, 78, 77);
      }
    }
    else if (this.game.camera.level === debug) {
      for (var i = 0; i <= 12000; i += 78) {
        ctx.drawImage(this.spritesheetTwo, i - this.game.camera.x, 735, 78, 77);
      }
    }
    else if (this.game.camera.level === bossRoom) {
      for (var i = 0; i <= 2000; i += 78) {
        ctx.drawImage(this.spritesheetTwo, i - this.game.camera.x, 735, 78, 77);
      }
    }
  }
}

class Platform {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, { game, x, y, w, h });
    this.velocity = { x: 0, y: 0 };
    this.patLeft = this.x;
    this.patRight = this.x + 600;
    this.moves = false;
    this.dropThrough = true;
    this.isPlatform = true;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Platform1.png");
    this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/platformlevel2.png");
    if(this.game.camera.level === levelOne) {
      this.BB = new BoundingBox(this.x  + 15, this.y + 13, this.w, PARAMS.PLATHEIGHT);
      this.leftBB = new BoundingBox(
        this.x ,
        this.y,
        PARAMS.PLATWIDTH,
        PARAMS.PLATWIDTH
      );
      this.rightBB = new BoundingBox(
        this.x + this.w - PARAMS.PLATWIDTH,
        this.y,
        PARAMS.PLATHEIGHT,
        PARAMS.PLATWIDTH
      );
    }
    else {
      this.BB = new BoundingBox(this.x , this.y, this.w * .93, PARAMS.PLATHEIGHT * .65);
    }
  }

  update() {
    if (this.game.camera.level === levelTwo && this.moves === true) {
      if (this.x <= this.patLeft) {
        this.x = this.patLeft;
        this.velocity.x = 60;
      } 
      if (this.x >= this.patRight ) {
        this.x = this.patRight;
        this.velocity.x = -60;
      }
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
    }
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y + 10, PARAMS.BLOCKWIDTH * 2.4, PARAMS.BLOCKHEIGHT * 0.25);
  }

  draw(ctx) {
    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }

    if (this.game.camera.level == (levelOne || levelOneRedone)) {
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 300, 100);
    }  
    else {
      ctx.drawImage(this.spritesheet2, this.x - this.game.camera.x, this.y, 250, 50);
    }
  }
}

class EndPlatform {
  constructor(game, x = 0, y = 0) {
    Object.assign(this, { game, x, y});
    this.velocity = { x: 0, y: 0 };
    this.isPlatform = true;
    this.moves;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platformlevel2.png");
    this.updateBB();
  }

  update() {
    if (this.moves){
      this.velocity.x = 150;
    }
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
    }
  

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 250, 50);
    this.wallBB = new BoundingBox (
      this.x + this.BB.width,
      0,
      PARAMS.BLOCKWIDTH * 2,
      PARAMS.BLOCKWIDTH * 12
    );
  }

  draw(ctx) {
    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      ctx.strokeStyle = "White";
      ctx.strokeRect(this.wallBB.x - this.game.camera.x, this.wallBB.y, this.wallBB.width, this.wallBB.height);
    }
    ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 250, 50);
  }
}



class Cloud {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud.png");
  }
    update() {

    };
    draw(ctx) {
      ctx.strokeStyle = "Red";
      //hardcoded k; need to change
      for (var k = 0; k <= 5000; k += 301) {
        if(k%2 == 1){
          ctx.drawImage(this.spritesheet, 0, 8, this.x, this.y, k - this.game.camera.x, 75, this.w ,this.h);
        }
        else {
          ctx.drawImage(this.spritesheet, 0, 8, this.x, this.y, k - this.game.camera.x, 25, this.w , this.h);
        };
      };
    };
  
}

class Crate {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crates.png");
    this.isImpassible = true;
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
  
  }
    update() {

    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 128 , 128);
    }

}

class Bell {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bells.png");
    this.isImpassible = true;
    this.belltimer = 0;
    this.belltimed = false;
    this.puzzlesolved = false;
    this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
  }
    update() {
      if (this.puzzlesolved) {
        this.game.puzzlesolved = true;
        this.belltimer += this.game.clockTick;
        if(this.belltimer < 1) {
          ASSET_MANAGER.playSFX("./sfx/bell_bong.mp3");
        }
      }
    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.w, this.h);
    }

}

class SignPost {
  constructor(game, x = 0, y = 0,w,h,id) {
    Object.assign(this, { game, x, y, w, h, id});
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/signpost.png");
    this.message = ASSET_MANAGER.getAsset("./sprites/message.png");
    this.timer = 0;
    this.display = false;
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);
    this.textMessages = [];

    //Level 1 signpost messages
    this.textMessages[101] = ["Try jumping over the", "crate with the", "W key and attacking", "the goblin by" , "clicking your mouse"];
    this.textMessages[102] = ["See how grabbing the", "apple increased your" , "energy? You can jump", "back up through the", "platform from below"];
    this.textMessages[103] = ["These bats are here", "to help our hero! ", "Try jumping into a", "bat and then jump", "again to get a boost"];
    this.textMessages[104] = ["Hold SHIFT to run!", "If you run and ", "jump continue to", "hold SHIFT to jump", "farther than normal"];
    this.textMessages[105] = ["Press W to open", "doors and enter", "new areas!"];
    this.textMessages[106] = ["Rats will drain your" , "energy! Kill them ", "with no mercy."]
    this.textMessages[107] = ["Have you realized your", "energy has dropped?", "Every time you jump", "you will lose energy.", "Try jumping to the", "next platform."]
    this.textMessages[108] = ["To drop down", "through the bottom", "of a platform", "press 'S'", "Try grabbing the apple", "to restore energy"];
    //Level 2 signpost messages
    this.textMessages[201] = ["When your path", "is blocked explore", "your environment to", "see if you can", "make a way through", "with a chain", "reaction"]
    
    //End credits signpost messages
    this.textMessages[501] = [credits.text[0]];
    this.textMessages[502] = [credits.text[1]];
    this.textMessages[503] = [credits.text[2]];
    this.textMessages[504] = [credits.text[3]];
    this.textMessages[505] = [credits.text[4]];
    this.textMessages[506] = [credits.text[5]];
    this.textMessages[507] = [credits.text[6]];
    this.textMessages[508] = [credits.text[7]];
  }

    update() {
    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      //Below if is for the end credits
      if (this.id < 500){
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 128, 128);
      }
      if (this.display === true) {
        this.timer += this.game.clockTick;
        if (this.timer > 1.5 && this.id < 500) this.display = false;
        else if (this.timer > 0 && this.id >= 500) this.display = false;
        if (this.id < 500){
          ctx.drawImage(this.message, this.x - this.game.camera.x - 128, this.y - 300, 400, 250);
          ctx.font = '30px monospace';
          if (this.textMessages[this.id] === undefined){
            ctx.fillText("message is missing!?", this.x - this.game.camera.x - 100, (this.y - 250));
          }
          else {
            for (let i = 0; i < this.textMessages[this.id].length; i++){
                ctx.fillText(this.textMessages[this.id][i], this.x - this.game.camera.x - 100, (this.y - 250) + (30 * i));
            }
          }
      }
      else {       
        ctx.drawImage(this.message, 400, 300, 400, 250);
        ctx.font = '40px monospace';
        if (this.textMessages[this.id] === undefined){
          ctx.fillText("message is missing!?", 430, (this.y - 250));
        }
        else {
          for (let i = 0; i < this.textMessages[this.id].length; i++){
              ctx.fillText(this.textMessages[this.id][i], 420, (this.y - 180) + (30 * i));
          }
        }

      }
    }
  }
}

class MetalSpikesFloor {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/MetalSpikesFloor.png");
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y + 30, this.w, this.h * 0.7);

    this.isSpikes = true;
  }
    update() {
    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 100 , 100);
    }
}

class MetalSpikesCeiling {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/MetalSpikesCeiling.png");
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y - 20, this.w, this.h);

    this.isSpikes = true;
  }
    update() {
    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 128 , 128);
    }
}

class StatuePuzzle {
  constructor(game, x = 0, y = 0, v) {
    Object.assign(this, { game, x, y, v});
    this.velocity = {x:0, y:0};
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/statuepuzzle.png");
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);
    this.isImpassible = true;
    this.visible = v;
  }
    update() {
      if (this.game.puzzlesolved === true && this.v === true){
        this.velocity.y = -100;
      }
      this.x += this.game.clockTick * this.velocity.x;
      this.y += this.game.clockTick * this.velocity.y;
      this.updateBB();
    };

    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(this.x, this.y, 120, 800);
    }

    draw(ctx) {
      if (this.v) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 140, 760);
      }
    }
}

class GoldPile {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, {game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/TreasureHoard.png");

    this.BB = new BoundingBox(this.x , this.y, this.w, this.h);
  }

  update() {

  };

  draw(ctx) {
    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
    ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 800 , 400);
  }
}

class Castle {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, {game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/castle.png");

    
  }
  update() {

  };

  draw(ctx) {
    ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 1500, 1500);
  }
}

class CastleGates {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, {game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/castlegates.png");
    this.spritesheetLev2 = ASSET_MANAGER.getAsset("./sprites/castledoors.png");

    this.state = 0;
    this.facing = 0;
    
    this.animations = [];
    this.loadAnimations();
  }
  loadAnimations() {
    for(var i = 0; i < 4; i++) {
      this.animations.push([]);
      for(var j = 0; j < 3; j++) {
        this.animations.push([i]);
      }
    }
    if(this.game.camera.level === levelOne) {
      this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 60, 64, 1, 1000, false, true);
      this.animations[1][0] = new Animator(this.spritesheet, 0, 0, 62, 64, 3, 0.2, false, false);
      this.animations[2][0] = new Animator(this.spritesheet, 186, 0, 61, 64, 1, 1000, false, true);
    }
    else if(this.game.camera.level === levelTwo) {
      this.animations[0][0] = new Animator(this.spritesheetLev2, 0, 0, 63, 64, 1, 1000, false, true);
      this.animations[1][0] = new Animator(this.spritesheetLev2, 0, 0, 62.1, 64, 3, 0.2, false, false);
      this.animations[2][0] = new Animator(this.spritesheetLev2, 186, 0, 61, 64, 1, 1000, false, true);
    }
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 4,
      PARAMS.BLOCKWIDTH * 6,
    );
  }

  update() {
    this.updateBB();
    var that = this;
    //I think we want the below to be in our knight so that we don't have two entitites doing this for loop
    this.game.entities.forEach(function(entity) {
      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
        if (entity instanceof Knight) {
          if (that.state === 0) that.state = 1;
          var level1DoorOpenSoundPath = './sfx/level1_door.wav';
          if (!(ASSET_MANAGER.getAsset(level1DoorOpenSoundPath).currentTime > 0) && that.state === 1) {
            ASSET_MANAGER.playAsset(level1DoorOpenSoundPath);
          }
        }
        if(that.animations[that.state][that.facing].isDone()) 
        that.state = 2;
      }
      that.updateBB();
    }
    );
    if(that.game.camera.level === levelOne && that.state === 2 && that.game.keys["up"]) {
      ASSET_MANAGER.pauseBackgroundMusic();
      this.game.camera.loadLevel(levelTwo, 0, 0, false, false, false);
      console.log("loaded level two");
    }
    else if(that.game.camera.level === levelTwo && that.state === 2 && that.game.keys["up"]) {
      ASSET_MANAGER.pauseBackgroundMusic();
      this.game.camera.loadLevel(bossRoom, 0, 0, false, false, false);
      console.log("loaded boss room");
    }
  }

  draw(ctx) {
    if(this.game.camera.level === levelOne) {
      this.animations[this.state][this.facing].drawCastleGateFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        3.6,
        5.9
      );
    }
    else if(this.game.camera.level === levelTwo) {
      this.animations[this.state][this.facing].drawCastleGateFrame(
        this.game.clockTick,
        ctx,
        this.x - this.game.camera.x,
        this.y,
        6.75,
        7.7
      );
    }
    // if (this.game.options.debugging) {
    //   ctx.strokeStyle = "Red";
    //   ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.w, this.BB.h);
    // }
  }
}
