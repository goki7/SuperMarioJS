
// basic entity, from which every game component inherit
class Entity {
    // basic x, y, w, h, speed, img properties
    constructor(template) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = {
            x: 0,
            y: 0
        };
        this.src = "";
        Object.assign(this, template);
        this.img = new Image();
        this.img.src = this.src;
    }

    update() {
        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    // renders the entity
    render() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        // // collision box
        // ctx.strokeStyle = "#ffff00";
        // ctx.rect(this.x, this.y, this.width, this.height);
        // ctx.stroke();
    }
}
