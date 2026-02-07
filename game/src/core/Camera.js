import { GAME_WIDTH } from "../config/gameConfig.js";
import { world } from "../world/World.js";

export default class Camera {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update(player) {

        this.x = player.x - GAME_WIDTH / 2 + player.w / 2;
        this.x = Math.max(0, Math.min(this.x, world.width - GAME_WIDTH));
    }
}
