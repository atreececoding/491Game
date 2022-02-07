// global misc. constants
const START_POS_X = 200;
const START_POS_Y = 200;
const VELOCITY_X = 0;
const VELOCITY_Y = 0;
const FACING = {
  RIGHT: 0,
  LEFT: 0,
};
const STATE = {
  IDLE: 0,
  PATROL: 1,
  ATTACK: 2,
};

// dragon final boss class
class Dragon {
  constructor(game) {
    // game engine
    Object.assign(this, { game });

    // default spritesheet for the dragon
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dragon-attack.png");

    this.state = STATE.IDLE;
    this.facing = FACING.LEFT;

    this.dead = false;

    this.lives = 3;

    // start position on canvas
    this.x = START_POS_X;
    this.y = START_POS_Y;

    // velocity
    this.velocity = {
      x: VELOCITY_X,
      y: VELOCITY_Y,
    };

    // initialize bounding box
    this.updateBB();

    // 2d array of animations based on [state][facing]
    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    for (let i = 0; i < Object.keys(STATE).length; i++) {
      this.animations.push([]);
      for (let j = 0; j < Object.keys(FACING).length; j++) {
        this.animations[i].push([]);
      }
    }

    // idle
    // facing right = 0
    this.animations[0][0] = new Animator(
      this.spritesheet,
      25,
      0,
      222,
      92,
      5,
      0.2,
      false,
      true
    );
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(
      this.x,
      this.y,
      PARAMS.BLOCKWIDTH * 1.3,
      PARAMS.BLOCKWIDTH
    );
  }

  die() {}

  update() {
    // const TICK = this.game.clockTick;
    // // physics
    // if (this.dead) {
    //     this.die();
    // } else if (this.state === STATE.IDLE) {
    // } else if (this.state === STATE.PATROL) {
    //     // update position
    //     this.x += this.velocity.x * TICK * PARAMS.SCALE;
    //     this.y += this.velocity.y * TICK * PARAMS.SCALE;
    //     this.updateBB();
    // } else if (this.state === STATE.ATTACK) {
    // }
    // // update direction
    // if (this.velocity.x < 0) this.facing = 1;
    // if (this.velocity.x > 0) this.facing = 0;
    // // collision handling
    // var that  = this;
    // this.game.entities.forEach(function (entity) {
    //     if (entity.BB && that.BB.collide(entity.BB) && entity !== that) {
    //     }
    // });
  }

  loseHeart() {
    this.lives--;
  }

  draw(ctx) {
    const TICK = this.game.clockTick;
    this.animations[0][0].drawFrame(TICK, ctx, this.x - this.game.camera.x, this.y, 1);
    // ctx.strokeStyle = "Red";
    // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
  }
}
