class Map {
    constructor() {
        this.player = new Player(); // adds the player to the map
        this.blocks = []; // the collection of blocks in the map
        this.src = JSON.parse(JSON.stringify(layer));

        this.width = this.src.width * this.src.tilewidth; // sets map's width and height to
        this.height = this.src.height * this.src.tilewidth; // the scene's width and height

    }

    update() {
        this.addContext();
        this.blocks.forEach(b => b.update()); // updates every block
        this.player.update(); // tells the player to update itself
        this.player.move();

        // deletes every block out of the left side of the scene
        this.blocks.forEach(b => {
            if(b.x + b.width < 0) {
                this.blocks.splice(this.blocks.indexOf(b), 1);
                if(DEBUG) console.log("block deleted");
            }
        });

        // collision detection between player and blocks in the map
        // console.log(this.player.tilex);
        this.blocks.forEach(b => {
            if((this.player.tilex === b.tilex && this.player.tiley === b.tiley)) {
                // console.log(this.player.tilex === b.tilex && this.player.tiley === b.tiley);
                // you must check one axis at a time
                // this.player.collideX(b);
                this.player.collideX(b);
                // console.log("x: " + b.tilex + " y: " + b.tiley);
            }
        });


        // basic gravity check
        // y collision
        this.blocks.forEach(b => {
            if ((this.player.tilex === b.tilex && this.player.tiley === b.tiley) ||
                (this.player.tileb === b.tilex && this.player.tileh === b.tiley) ||
                (this.player.tilex === b.tilex && this.player.tileh === b.tiley)) {
                // console.log(this.player.tilex === b.tilex && this.player.tiley === b.tiley);
                // you must check one axis at a time
                // this.player.collideX(b);
                this.player.collideY(b);
                // console.log("x: " + b.tilex + " y: " + b.tiley);
            }
        });

        // doesn't let the player get out of the left-side of the stage
        if(this.player.x < 0) {
            this.player.x = 0;
        }

        // when the player reaches the middle of the stage
        // it stops moving, but the map moves the opposite direction
        // such that the player appears to move, but the background still moves
        if(this.player.x >= (canvas.width / 2) && this.player.right) {
            this.blocks.forEach(b => {
                b.x -= this.player.speed.x;
            });
            this.player.speed.x = 0;
        }
    }

    render() {
        // renders background
        ctx.beginPath();
        ctx.fillStyle = "rgb(10, 210, 255)";
        ctx.fillRect(0, 0, this.width, this.height);

        this.blocks.forEach(b => b.render()); // tells the blocks to render themselves
        this.player.render(); // tells the player to render itself
    }

    // adds context to the player and the blocks, such that they can know basic map's properties
    addContext() {
        this.blocks.forEach(b => b.container = this);
        this.player.container = this;
    }

    // renders the map
    addMap() {
        let count = 0;

        // adds a new block for each row
        for (let i = 0; i < this.src.height; i++) {
            for (let j = 0; j < this.src.width; j++) {
                if (this.src.layers[0].data[count] !== 0) {
                    this.blocks.push(new Block({
                        x: j * this.src.tilewidth,
                        y: i * this.src.tilewidth,
                        n: this.src.layers[0].data[count],
                        collidable: true
                    }));
                }
                count++;
            }
        }
    }
}
