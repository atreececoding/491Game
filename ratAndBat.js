class RatAndBat {
    constructor(game) {
      this.game = game;
      this.velocity = { x: 0, y: 0 };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ratAndBat.png");
  
      this.size = 0;
      this.facing = 0;
      this.state = 0;
      this.dead = false;
  
      this.x = 550;
      this.y = 50;
  
      this.updateBB();
  
      this.animations = [];
      this.loadAnimations();
    }
  
    loadAnimations() {
      for (var i = 0; i < 7; i++) {
        this.animations.push([]);
        for (var j = 0; j < 2; j++) {
          this.animations.push([i]);
        }
      }
      // hovering right (directions are flipped because of sprite sheet)
      this.animations[0][0] = new Animator(
        this.spritesheet,
        0,
        172,
        32,
        12,
        10,
        0.1,
        false,
        true
      );
    }
  
    updateBB() {
      this.lastBB = this.BB;
      this.BB = new BoundingBox(
        this.x + 35,
        this.y - 10,
        PARAMS.BLOCKWIDTH * 0.9,
        PARAMS.BLOCKHEIGHT * 0.55
      );
    }
  
    die() {
  
    }
  
    update() {
  
    }
  
    draw(ctx) {
      const TICK = this.game.clockTick;
      this.animations[0][0].drawFrame(TICK, ctx, this.x, this.y, 5);
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}