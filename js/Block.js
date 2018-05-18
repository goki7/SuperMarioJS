class Block extends Entity {
    constructor(template) {
        super({
            width: 16 * SCALE,
            height: 16 * SCALE,
            src: "resources/images/block0.png",
            n: 214
        });
        Object.assign(this, template);

        this.src = JSON.parse(JSON.stringify(tile));
        this.img.src = "resources/images/" + this.src.image;
        this.dx = (this.n % (this.src.imagewidth / this.src.tilewidth) - 1) * this.src.tilewidth;
        this.dy = Math.floor(this.n / (this.src.imagewidth / this.src.tileheight)) * this.src.tileheight;
    }

    update() {
        this.tilex = Math.floor((this.x) / this.container.src.tilewidth);
        this.tiley = Math.floor((this.y) / this.container.src.tileheight);
    }

    render() {
        ctx.drawImage(this.img, this.dx, this.dy, this.src.tilewidth, this.src.tileheight, this.x, this.y, this.width, this.height);

        ctx.beginPath();
        ctx.strokeStyle = "rgb(254, 0, 0)";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}
