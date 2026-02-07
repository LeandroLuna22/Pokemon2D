import Game from "./core/Game.js";
import Renderer from "./core/Renderer.js";
import Input from "./core/Input.js";
import Camera from "./core/Camera.js";
import Player from "./entities/Player.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./config/gameConfig.js";
import { platforms } from "./world/Platforms.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;

const backgroundImg = new Image();
backgroundImg.src = "../assets/images/world1.png";

const playerImg = new Image();
playerImg.src = "../assets/images/player.png";

Promise.all([
    new Promise(res => backgroundImg.onload = res),
    new Promise(res => playerImg.onload = res)
]).then(() => {

    const player = new Player(playerImg);
    const camera = new Camera();
    const renderer = new Renderer(ctx, backgroundImg);
    const input = new Input(canvas, player, GAME_WIDTH, GAME_HEIGHT);

    const game = new Game(player, renderer, input, camera, platforms);
    game.start();

});


