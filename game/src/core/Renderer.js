import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig.js";

export default class Renderer {

    constructor(ctx, backgroundImg) {
        this.ctx = ctx;
        this.backgroundImg = backgroundImg;
    }

    draw(camera, player, platforms) {

        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        if (this.backgroundImg.complete) {
            this.ctx.drawImage(this.backgroundImg, 0, 0, GAME_WIDTH, GAME_HEIGHT);
        } else {
            this.ctx.fillStyle = "rgb(180, 180, 224)";
            this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        }

        this.ctx.save();
        this.ctx.translate(-camera.x, 0);

        this.ctx.fillStyle = "#59b377";
        platforms.forEach(p => this.ctx.fillRect(p.x, p.y, p.w, p.h));

        this.ctx.save();

        if (player.facing === "left") {
            this.ctx.translate(player.x + player.w / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-(player.x + player.w / 2), 0);
        }

        this.ctx.drawImage(
            player.img,
            player.frameX * player.spriteW,
            player.frameY * player.spriteH,
            player.spriteW,
            player.spriteH,
            player.x,
            player.y,
            player.w,
            player.h
        );

        this.ctx.restore();
        this.ctx.restore();
    }
}

