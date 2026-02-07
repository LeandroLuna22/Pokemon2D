export default class Input {

    constructor(canvas, player, GAME_WIDTH, GAME_HEIGHT) {

        this.keys = {};
        this.canvas = canvas;
        this.player = player;

        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);

        window.addEventListener("touchstart", e => {

            e.preventDefault();

            const pos = this.getTouchPos(e, GAME_WIDTH, GAME_HEIGHT);

            if (pos.y < GAME_HEIGHT / 2 && player.onGround) {
                player.vy = -player.jump;
                player.onGround = false;
            } else {
                if (pos.x < GAME_WIDTH / 2) this.keys.ArrowLeft = true;
                else this.keys.ArrowRight = true;
            }

        }, { passive: false });

        window.addEventListener("touchend", () => {
            this.keys.ArrowLeft = false;
            this.keys.ArrowRight = false;
        });
    }

    getTouchPos(e, GAME_WIDTH, GAME_HEIGHT) {

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    }
}

