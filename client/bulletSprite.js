'use strict';
class bulletSprite {
    constructor(x, y, radius, start, end, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.start = start;
        this.end = end;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
    }

    draw() {
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.start, this.end);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }


    kill() {
        shoot = undefined;
        this.draw();
    }

    shoot(originX, originY, targetX, targetY) {
        this.x = originX;
        this.y = originY;
        this.velX = (targetX - this.x) / 100;
        this.velY = (targetY - this.y) / 100;
        console.log("VelX: " + this.velX + " VelY: " + this.velY)
    }

}

export default bulletSprite;