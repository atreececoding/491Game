class Lives {
  constructor(game) {
    this.game = game;
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/heart.png");
    // this.instanceOfKnight = new Knight();
    // console.log(this.instanceOfKnight.lives);
    // this.lifeCount = (this.instanceOfKnight.lives);

    this.game.camera.knight.lives;
  }
  update() {}
  draw(ctx) {
    //TODO: Figure out how to send variable lives to this class in order to update heart count
    if (this.game.camera.knight.lives == 5) {
      ctx.drawImage(this.spritesheet, 26, 33, 572, 96, 5, 5, 250, 50);
    } else if (this.game.camera.knight.lives == 4) {
      ctx.drawImage(this.spritesheet, 26, 145, 572, 96, 5, 5, 250, 50);
    } else if (this.game.camera.knight.lives == 3) {
      ctx.drawImage(this.spritesheet, 26, 256, 572, 96, 5, 5, 250, 50);
    } else if (this.game.camera.knight.lives == 2) {
      ctx.drawImage(this.spritesheet, 26, 366, 572, 96, 5, 5, 250, 50);
    } else if (this.game.camera.knight.lives == 1) {
      ctx.drawImage(this.spritesheet, 26, 477, 572, 96, 5, 5, 250, 50);
    }
  }
}
