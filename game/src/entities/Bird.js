export default class Bird {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = 40;
        this.h = 20;
    }

    update() {
        this.x += this.speed;
        if (this.x > 2200) this.x = -100;
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 10, this.y + 5);
        ctx.lineTo(this.x + 20, this.y);
        ctx.stroke();
    }
}

