export default class Game {

    constructor(player, renderer, input, camera, platforms, birds) {
        this.player = player;
        this.renderer = renderer;
        this.input = input;
        this.camera = camera;
        this.platforms = platforms;
        this.birds = birds;
    }

   update() {
    this.player.update(this.input, this.platforms);

    // 🎥 FAZ A CÂMERA SEGUIR O PLAYER
    this.camera.update(this.player);

    // 🌤️ parallax vivo
    this.renderer.update();

    // 🐦 pássaros
    this.birds.forEach(bird => bird.update());
}



    draw() {
    this.renderer.draw(
        this.camera,
        this.player,
        this.platforms,
        this.birds
    );
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
