export default class Game {

    constructor(player, renderer, input, camera, platforms) {
        this.player = player;
        this.renderer = renderer;
        this.input = input;
        this.camera = camera;
        this.platforms = platforms;
    }

    update() {
        this.player.update(this.input, this.platforms);
        this.camera.update(this.player);
    }

    draw() {
        this.renderer.draw(this.camera, this.player, this.platforms);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    start() {
        this.loop();
    }
}
