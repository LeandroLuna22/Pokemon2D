import { GAME_WIDTH, GAME_HEIGHT } from "../config/gameConfig.js";

export default class Renderer {
    constructor(ctx, layers) {
        this.ctx = ctx;
        this.layers = layers;
        this.backgroundOffset = 0;
    }

    update() {
    this.backgroundOffset += 1.25;
    if (this.backgroundOffset > 100000) {
        this.backgroundOffset = 0;
    }
}


    drawLayer(image, speed, cameraX, autoSpeed = 0) {
    const imgWidth = image.width;

    const x =
        (-cameraX * speed) -
        (this.backgroundOffset * autoSpeed);

    let drawX = x % imgWidth;

    this.ctx.drawImage(image, drawX, 0, imgWidth, GAME_HEIGHT);
    this.ctx.drawImage(image, drawX + imgWidth, 0, imgWidth, GAME_HEIGHT);
}

    draw(camera, player, platforms, birds) {

        // limpa tela
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // 🌤️ parallax layers
        if (this.layers) {
            this.layers.forEach(layer => {
                if (layer.image.complete) {
                    this.drawLayer(
                    layer.image,
                    layer.speed,
                    camera.x,
                    layer.auto
            );

            }
        });
    }

        // 🎥 mundo com câmera
        this.ctx.save();
        this.ctx.translate(-camera.x, 0);

        // plataformas
        this.ctx.fillStyle = "#362108";
        platforms.forEach(p => {
            this.ctx.fillRect(p.x, p.y, p.w, p.h);
        });

        // player (responsável por seu próprio draw)
        player.draw(this.ctx);

        // 🐦 pássaros
        birds.forEach(bird => bird.draw(this.ctx));

        this.ctx.restore();
    }
}
