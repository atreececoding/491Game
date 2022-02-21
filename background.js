class Background {
  constructor(game, x = 0, y = 0) {
    Object.assign(this, { game, x, y });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Level1Background.png");
  }
  update() {}

  draw(ctx) {
    // Hardcoded
    ctx.drawImage(this.spritesheet, 0-this.game.camera.x, 0, 7000, 800);
  }
}
class Floor {
  constructor(game, x = 0, y = 0, w) {
    Object.assign(this, { game, x, y, w });
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png");

    this.BB = new BoundingBox(0, this.y, 6000, PARAMS.BLOCKWIDTH * 2);
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
    for (var i = 0; i <= 6000; i += 78) {
      ctx.drawImage(this.spritesheet, i, 735, 78, 77);
    }
  }
}

class Platform {
  constructor(game, x = 0, y = 0, w, h) {
    Object.assign(this, { game, x, y, w, h });

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Platform1.png");

    this.BB = new BoundingBox(this.x - this.game.camera.x + 15, this.y + 13, this.w, PARAMS.PLATHEIGHT);
    this.leftBB = new BoundingBox(
      this.x - this.game.camera.x,
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

  update() {
    // this.lastBB = this.BB;
    // this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
  }

  draw(ctx) {
    if (this.game.options.debugging) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
    ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, 300, 100);
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

    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);
  
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

    this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, this.w, this.h);
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
