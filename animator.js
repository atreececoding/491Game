class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop});
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };
<<<<<<< HEAD
    drawFrame(tick, ctx, x, y) {
=======
    drawFrame(tick, ctx, x, y, scale) {
>>>>>>> AndrewBranch
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        ctx.drawImage(this.spritesheet, 
            this.xStart + this.width*frame, this.yStart, 
            this.width, this.height, 
            x, y, 
<<<<<<< HEAD
            this.width*2, this.height*2);
=======
            this.width*scale, this.height*scale);
>>>>>>> AndrewBranch
    };
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };
    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};