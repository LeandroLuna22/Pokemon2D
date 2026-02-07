import { GRAVITY } from "../config/gameConfig.js";
import { world } from "../world/World.js";
import { checkPlatformCollision } from "../utils/Collision.js";

export default class Player {

    constructor(img) {

        this.img = img;

        this.x = 100;
        this.y = 300;

        this.w = 128;
        this.h = 128;

        this.spriteW = 64;
        this.spriteH = 64;

        this.frameX = 0;
        this.frameY = 0;

        this.vx = 0;
        this.vy = 0;

        this.speed = 5;
        this.jump = 15;

        this.onGround = false;
        this.facing = "right";

        this.gameFrame = 0;
        this.staggerFrames = 6;
    }

    update(input, platforms) {

        this.vx = 0;

        if (input.keys.ArrowLeft || input.keys.KeyA) {
            this.vx = -this.speed;
            this.facing = "left";
        }

        if (input.keys.ArrowRight || input.keys.KeyD) {
            this.vx = this.speed;
            this.facing = "right";
        }

        if ((input.keys.Space || input.keys.ArrowUp || input.keys.KeyW) && this.onGround) {
            this.vy = -this.jump;
            this.onGround = false;
        }

        this.vy += GRAVITY;

        this.x += this.vx;
        this.y += this.vy;

        checkPlatformCollision(this, platforms);

        this.x = Math.max(0, Math.min(this.x, world.width - this.w));

        this.animate();
    }

    animate() {

        if (this.vx !== 0) {
            if (this.gameFrame % this.staggerFrames === 0) {
                this.frameX = this.frameX < 3 ? this.frameX + 1 : 0;
            }
        } else {
            this.frameX = 0;
        }

        this.gameFrame++;
    }
}
