class Animator {
  constructor(
    spritesheet,
    xStart = 0,
    yStart = 0,
    width,
    height,
    frameCount,
    frameDuration,
    reverse = false,
    loop = false
  ) {
    Object.assign(this, {
      spritesheet,
      xStart,
      yStart,
      width,
      height,
      frameCount,
      frameDuration,
      reverse,
      loop,
    });

    this.elapsedTime = 0;

    this.totalTime = frameCount * frameDuration;
  }

  drawFrame(tick, ctx, x = 0, y = 0, scale = 1) {
    this.elapsedTime += tick;

    if (this.elapsedTime > this.totalTime && this.loop)
      this.elapsedTime -= this.totalTime;

    var frame = this.currentFrame();

    if (this.reverse) frame = this.frameCount - frame - 1;

    ctx.drawImage(
      this.spritesheet,
      this.xStart + this.width * frame,
      this.yStart,
      this.width,
      this.height,
      x,
      y,
      this.width * scale,
      this.height * scale
    );
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone() {
    return this.elapsedTime >= this.totalTime;
  }

  reset() {
    this.elapsedTime = 0;
  }
}
