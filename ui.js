class HungerBar {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hunger_bar.png");

    };

    update() {

    };
    draw(ctx) {
        this.state = this.game.camera.knight.energy;

        if(this.state > 100) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goldenergy.png");
            ctx.drawImage(this.spritesheet, 20 ,40 ,360, 40, this.x, this.y, 250, 50 );
        }
        if(this.state >= 5 && this.game.camera.knight.energy < 100) {
            ctx.drawImage(this.spritesheet, 20 ,40 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 4) {
            ctx.drawImage(this.spritesheet, 20 ,102 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 3) {
            ctx.drawImage(this.spritesheet, 20 ,165 ,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 2) {
            ctx.drawImage(this.spritesheet, 20 ,226,360, 40, this.x, this.y, 250, 50 )
        }
        else if (this.state == 1) {
            ctx.drawImage(this.spritesheet, 20 ,350 ,360, 40, this.x, this.y, 250, 50 )
        }   
        else if (this.state == 0) {
            ctx.drawImage(this.spritesheet, 20 ,288 ,360, 40, this.x, this.y, 250, 50 )
        }   
    };
}

class HealthBar {
    constructor(game, x, y, size) {
      Object.assign(this, { game, x, y, size });
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/health_bar.png");
  
      this.game.camera.knight.lives;
    }
    update() {}
    draw(ctx) {
      //TODO: Figure out how to send variable lives to this class in order to update heart count
      if (this.game.camera.knight.lives == 5) {
        ctx.drawImage(this.spritesheet, 26, 33, 572, 96, this.x, this.y, 250, 50);
      } else if (this.game.camera.knight.lives == 4) {
        ctx.drawImage(this.spritesheet, 26, 145, 572, 96, this.x, this.y, 250, 50);
      } else if (this.game.camera.knight.lives == 3) {
        ctx.drawImage(this.spritesheet, 26, 256, 572, 96, this.x, this.y, 250, 50);
      } else if (this.game.camera.knight.lives == 2) {
        ctx.drawImage(this.spritesheet, 26, 366, 572, 96, this.x, this.y, 250, 50);
      } else if (this.game.camera.knight.lives == 1) {
        ctx.drawImage(this.spritesheet, 26, 477, 572, 96, this.x, this.y, 250, 50);
      }
    }
  }
  