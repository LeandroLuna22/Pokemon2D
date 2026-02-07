import Game from "./core/Game.js";
import Renderer from "./core/Renderer.js";
import Input from "./core/Input.js";
import Camera from "./core/Camera.js";
import Player from "./entities/Player.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./config/gameConfig.js";
import { platforms } from "./world/Platforms.js";
import Bird from "./entities/Bird.js";

/* ================= CANVAS ================= */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;

/* ================= IMAGENS ================= */
const playerImg = new Image();
playerImg.src = "/game/assets/images/player.png";

const sky = new Image();
sky.src = "/game/assets/images/sky.png";

const clouds = new Image();
clouds.src = "/game/assets/images/clouds.png";

const mountains = new Image();
mountains.src = "/game/assets/images/mountains.png";

/* ================= PARALLAX LAYERS ================= */
const layers = [
    { image: sky,       speed: 0.05, auto: 0     }, // céu parado
    { image: clouds,    speed: 0.15, auto: 0.6   }, // nuvens vivas ☁️
    { image: mountains, speed: 0.4,  auto: 0     }  // montanhas
];


/* ================= ENTIDADES ================= */
const birds = [
    new Bird(200, 150, 1),
    new Bird(600, 180, 0.8),
    new Bird(1000, 130, 1.2)
];

/* ================= START GAME ================= */
Promise.all([
    new Promise(res => playerImg.onload = res),
    new Promise(res => sky.onload = res),
    new Promise(res => clouds.onload = res),
    new Promise(res => mountains.onload = res)
]).then(() => {

    const player = new Player(playerImg);
    const camera = new Camera();
    const renderer = new Renderer(ctx, layers);
    const input = new Input(canvas, player, GAME_WIDTH, GAME_HEIGHT);

    const game = new Game(player, renderer, input, camera, platforms, birds);
    game.start();

});



