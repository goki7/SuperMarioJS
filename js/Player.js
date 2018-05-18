class Player extends Entity {
    constructor(template) {
        super({
            x: 48,
            y: 200,
            width: 16 * SCALE,
            height: 16 * SCALE,
            speed: {
                x: 0,
                y: 0
            },
            src: "resources/images/mario.png",
            falling: true,
            jumping: true,
            right: false,
            left: false,
        });
        Object.assign(this, template);
    }

    update() {
        super.update();

        this.tilex = Math.floor((this.x) / this.container.src.tilewidth);    // tile x position
        this.tiley = Math.floor((this.y) / this.container.src.tileheight);   // tile y position
        this.tileb = Math.floor((this.x + this.width) / this.container.src.tilewidth);    // tile x position
        this.tileh = Math.floor((this.y + this.height) / this.container.src.tileheight);   // tile y position

        // constants
        const gravity = 0.5;
        const MAX_VEL_Y = 10;
        const SPEED = 2;

        // this.speed.x = 0; // statement which stops the player from moving to infinity
        this.falling = true; // the player keeps falling

        // changes in direction
        if(this.left) {
            this.speed.x = -SPEED;
        }
        if(this.right) {
            this.speed.x = SPEED;
        }

        // basic gravity check
        if (this.falling || this.jumping) {
            this.speed.y += gravity; // fall gravity
            if (this.speed.y > MAX_VEL_Y) this.speed.y = MAX_VEL_Y;
        }
    }

    render() {
        super.render();

        // collision box
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.rect(this.tilex * this.width, this.tiley * this.height, this.width, this.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.rect(this.tileb * this.width, this.tileh * this.height, this.width, this.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.rect(this.tilex * this.width, this.tileh * this.height, this.width, this.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.rect(this.tileb * this.width, this.tiley * this.height, this.width, this.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    // implemented smooth movement system, instead of moving when the function is executed, it moves when the update method is called, and
    // this allows a smoother transition
    move() {
        window.addEventListener("keydown", event => {
            let key = event.key;

            if (key === "ArrowRight")
                this.right = true;
            if (key === "ArrowLeft")
                this.left = true;
            if (key === "ArrowUp")
                if(!this.jumping) {
                    this.jumping = true;
                    this.falling = true;
                    this.speed.y = -10;
                }
        });
        window.addEventListener("keyup", event => {
            let key = event.key;

            if (key === "ArrowRight") {
                this.right = false;
                this.speed.x = 0;
            }
            if (key === "ArrowLeft"){
                this.left = false;
                this.speed.x = 0;
            }
        });
        window.addEventListener("click", event => {
            this.x = event.offsetX;
            this.y = event.offsetY;
            // this.falling = true;
        });
    }

    // rectangle collision detection
    collideX(o) {
        if(this.speed.x > 0 || this.speed.x === 0) {
            if(this.x + this.width >= o.x) {
                this.x = o.x - this.width;
                this.speed.x = 0;
                // this.jumping = false;
                // this.falling = false;
                console.log("collisionX");
            }
        } else if(this.speed.x < 0 || this.speed.x === 0) {
            if(this.x <= o.x + o.width) {
                this.x = o.x + this.width;
                this.speed.x = 0;
                // this.falling = true;
                // this.jumping = true;
                console.log("collisionX");
            }
        }
    }

    collideY(o) {
        if(this.speed.y > 0) {
            if(this.y + this.height > o.y) {
                this.y = o.y - this.height;
                this.speed.y = 0;
                this.jumping = false;
                this.falling = false;
                console.log("collisionY");
            }
        } else if(this.speed.y < 0) {
            if(this.y < o.y + o.height) {
                this.y = o.y + this.height;
                this.speed.y = 0;
                this.falling = true;
                this.jumping = true;
                console.log("collisionY");
            }
        }
    }
}
