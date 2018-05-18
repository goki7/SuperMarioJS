const canvas = document.getElementById("stage"); // gets the stage
const ctx = canvas.getContext("2d"); // sets the context to the stage
const SCALE = 1; // scaling constant

let DEBUG = false;

let map = new Map(); // creates the map

let start = null;
const fps = 120;
let interval = 1000 / fps;

map.addMap(); // creates the map

animate = () => {
    setTimeout(() => {
        map.update();
        map.render();
        requestAnimationFrame(animate);
    }, interval);
};

animate();