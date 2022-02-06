class Goblin {
  constructor(game, x, y, size) {
    Object.assign(this, { game, x, y, size });

    this.velocity = { x: 0, y: 0 };
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblinSprite.png");

    this.size = 0;
    this.facing = 0;
    this.state = 0; // 0 = walking, 1 = attacking
    this.dead = false;

    this.speed = 100;

    this.fallAcc = 560;

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
    //walking right and left
    //facing right = 0
    this.animations[0][0] = new Animator(
      this.spritesheet,
      0,
      194,
      64,
      54,
      7,
      0.15,
      false,
      true
    );
    //facing left = 1
    this.animations[0][1] = new Animator(
      this.spritesheet,
      0,
      67,
      64,
      54,
      7,
      0.15,
      false,
      true
    );

    //Attacking
    //facing right = 0
    this.animations[1][0] = new Animator(
      this.spritesheet,
      0,
      451,
      64,
      54,
      5,
      0.15,
      false,
      true
    );
    //facing left = 1
    this.animations[1][1] = new Animator(
      this.spritesheet,
      0,
      324,
      64,
      54,
      5,
      0.15,
      false,
      true
    );

    //Idle
    //this.animation[2][0] = new Animator(this.spritesheet, )
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 1.2,
      PARAMS.BLOCKHEIGHT * 0.93
    );
  }

  die() {}

  update() {
    if (this.x <= 300 && this.facing === 1) {
      this.x = 300;
      this.velocity.x = 75;
      this.facing = 0;
    } 
    if (this.x >= 600 && this.facing === 0) {
      this.x = 600;
      this.velocity.x = -75;
      this.facing = 1;
    }
    this.velocity.y += this.fallAcc * this.game.clockTick;
    this.x += this.game.clockTick * this.velocity.x;
    this.y += this.game.clockTick * this.velocity.y;
    this.updateBB();

    var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
        if (entity instanceof Knight) {
          that.state = 1;
          that.velocity.x = 0;
          if (that.facing === 1) {
            that.x = entity.BB.left + PARAMS.BLOCKWIDTH * 1.7;
          }
          else {
            that.x = entity.BB.left - PARAMS.BLOCKWIDTH * 1.2;
          }
          that.lastAttack = that.game.clockTick;
          that.timeSinceLastAttack = 0;
        } else if (that.lastAttack && abs(that.lastAttack - that.timeSinceLastAttack) > 2) {
            that.velocity.x = 0;
            if (that.facing === 0) {
              that.velocity.x = 75;
              that.lastAttack = undefined;
            } 
            if (that.facing === 1) {
              that.velocity.x = -75;
              that.lastAttack = undefined;
            }
          that.state = 0;
        } else {
          that.timeSinceLastAttack += that.game.clockTick;
        }

        if (
          (entity instanceof Floor || entity instanceof Platform) &&
          that.lastBB.bottom <= entity.BB.top
        ) {
          that.y = entity.BB.top - PARAMS.BLOCKHEIGHT * 0.93;
          that.velocity.y = 0;

        } 

      }
    });
    that.updateBB();
  }

  draw(ctx) {
    this.animations[this.state][this.facing].drawFrame(
      this.game.clockTick,
      ctx,
      this.x,
      this.y,
      2.25
    );

    ctx.strokeStyle = "Red";
    ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
  }
}
