class Bat {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size });

    this.velocity = { x: 0, y: -10 };
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ratAndBat.png");

    this.size = 0;
    this.facing = 0;
    this.state = 0;
    this.dead = false;

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

  die() {}

  update() {
    let scale = 1 + Math.random();
    if (this.x <= 350 && this.facing === 1) {
      this.velocity.x = 100 * scale;
      this.facing = 0;
    } 
    if (this.x >= 550 && this.facing === 0) {
      this.velocity.x = -100 * scale;
      this.facing = 1;
    }
    if (this.y <= 30) {
      this.velocity.y = 50 * scale;
    } 
    if (this.y >= 60) {
      this.velocity.y = -50 * scale;
    }
    this.x += this.game.clockTick * this.velocity.x;
    this.y += this.game.clockTick * this.velocity.y;
    this.updateBB();
  }

  draw(ctx) {
    const TICK = this.game.clockTick;
    this.animations[this.state][0].drawFrame(TICK, ctx, this.x, this.y, 5);
    // ctx.strokeStyle = "Red";
    // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
  }
}
