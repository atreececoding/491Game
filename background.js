class Background {
  constructor(game, x = 0, y = 0) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Level1Background.png");
    this.spritesheetTwo = ASSET_MANAGER.getAsset("./sprites/Level2background.png");
  }
  update() {}

  draw(ctx) {
    // Hardcoded
    if(this.game.camera.level === levelOne) 
    ctx.drawImage(this.spritesheet, 0-this.game.camera.x, 0, 7000, 800);
    else if(this.game.camera.level === levelTwo)
    ctx.drawImage(this.spritesheetTwo, -1300-this.game.camera.x, 0, 16800, 900);
    else
      ctx.drawImage(this.spritesheetTwo, 0-this.game.camera.x, 0, 7000, 1000);
  }
}
class Floor {
  constructor(game, x = 0, y = 0, w) {
    Object.assign(this, { game, x, y, w });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png");
    this.spritesheetTwo = ASSET_MANAGER.getAsset("./sprites/floorLevelTwo.png");

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
    if (this.game.camera.level !== levelOne && this.moves === true) {
      if (this.x <= this.patLeft) {
        this.x = this.patLeft;
        this.velocity.x = 40;
      } 
      if (this.x >= this.patRight ) {
        this.x = this.patRight;
        this.velocity.x = -40;
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

    if (this.game.camera.level == levelOne) {
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 300, 100);
    }  
    else {
      ctx.drawImage(this.spritesheet2, this.x - this.game.camera.x, this.y, 250, 50);
    }
  }
}

// class Platform {
//   constructor(game, x = 0, y = 0, w, h) {
//     Object.assign(this, { game, x, y, w, h });

//     this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Platform1.png");

//     this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, PARAMS.PLATHEIGHT);
//     this.leftBB = new BoundingBox(
//       this.x - this.game.camera.x,
//       this.y,
//       PARAMS.PLATWIDTH,
//       PARAMS.PLATWIDTH
//     );
//     this.rightBB = new BoundingBox(
//       this.x + this.w - PARAMS.PLATWIDTH,
//       this.y,
//       PARAMS.PLATHEIGHT,
//       PARAMS.PLATWIDTH
//     );
//   }

//   update() {
//     // this.lastBB = this.BB;
//     // this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
//   }

//   draw(ctx) {
//     ctx.strokeStyle = "Red";
//     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
//     ctx.drawImage(this.spritesheet, 400 - this.game.camera.x, 300 , 300, 100);
//   }
// }
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

class SignPost {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h});
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/signpost.png");
    this.message = ASSET_MANAGER.getAsset("./sprites/message.png");
    this.timer = 0;
    this.display = false;
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);
  }

    update() {
    };

    draw(ctx) {
      if (this.game.options.debugging) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
      }
      ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 128, 128);
      if (this.display === true) {
          this.timer += this.game.clockTick;
          if (this.timer > 1.5) this.display = false;
          ctx.drawImage(this.message, this.x - this.game.camera.x - 128, 300, 400, 250);
      }
    }

}

class MetalSpikesFloor {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/MetalSpikesFloor.png");
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h * 0.5);

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

class MetalSpikesCeiling {
  constructor(game, x = 0, y = 0,w,h) {
    Object.assign(this, { game, x, y, w, h });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/MetalSpikesCeiling.png");
    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);

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
    this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 60, 64, 1, 1000, false, true);
    this.animations[1][0] = new Animator(this.spritesheet, 0, 0, 62, 64, 3, 0.2, false, false);
    this.animations[2][0] = new Animator(this.spritesheet, 186, 0, 60, 64, 1, 1000, false, true)
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
    if(levelOne && that.state === 2 && that.game.keys["up"]) {
      this.game.camera.loadLevel(levelTwo, 0, 0, false, false, false);
      console.log("loaded level two");
    }
  }

  draw(ctx) {
    this.animations[this.state][this.facing].drawCastleGateFrame(
      this.game.clockTick,
      ctx,
      this.x - this.game.camera.x,
      this.y,
      3.6,
      5.9
    );
    // if (this.game.options.debugging) {
    //   ctx.strokeStyle = "Red";
    //   ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.w, this.BB.h);
    // }
  }
}
