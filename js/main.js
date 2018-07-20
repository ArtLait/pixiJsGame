// import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 1024,
    height: 1024
});
const direction = {
    down: 0,
    left: 1,
    right: 2,
    up: 3
};
const heroes = {
    ryuk: {}
};

document.body.appendChild(app.view);

const moveMixin = {
    moveDown: function() {
        this.vy = 5;
        this.moveCycle(direction.down);
    },
    moveLeft: function() {
        this.vx = -5;
        this.moveCycle(direction.left);
    },
    moveRight: function() {
        this.vx = 5;
        this.moveCycle(direction.right);
    },
    moveUp: function() {
        this.vy = -5;
        this.moveCycle(direction.up);
    },
    moveCycle: function(direction) {
        /*for (let i = 0; i < this.animationCycle; i++) {
            //if (!this.vx && !this.vy) break;
            setTimeout(() => {
                console.log('x', this.sx * i%4, 'y', this.sy * direction);
                this.sprite['_texture'].frame =
                    new PIXI.Rectangle(this.sx * i%4, this.sy * direction, this.sx, this.sy);
            }, this.timerMove);
        }*/
    }
};

function Hero(texture) {
    this.sx = 48;
    this.sy = 64;
    this.vx = 0;
    this.vy = 0;
    this.timerMove = 100;

    this.animationCycle = 4;
    let rectangle = new PIXI.Rectangle(0, 0, this.sx, this.sy);
    texture.frame = rectangle;
    this.sprite = new PIXI.Sprite(texture);
    app.stage.addChild(this.sprite);
}

for (let key in moveMixin) {
    Hero.prototype[key] = moveMixin[key];
}

PIXI.loader.add('ryuk', 'img/heroes/ryuk.png').load((loader, resources) => {

    const texture = resources['ryuk'].texture;
    createHeroes(texture);
    eventHandler();
    app.ticker.add(delta => gameLoop(delta));
});

function gameLoop(delta) {
    heroes.ryuk.sprite.x += heroes.ryuk.vx;
    heroes.ryuk.sprite.y += heroes.ryuk.vy;
    for (let i = 0; i < this.animationCycle; i++) {
        if (heroes.ryuk.vx && heroes.ryuk.vy) {
            requestAnimationFrame(() => {
                heroes.ryuk.sprite['_texture'].frame =
                    new PIXI.Rectangle(heroes.ryuk.sx * i%4, heroes.ryuk.sy * 0, heroes.ryuk.sx, heroes.ryuk.sy);
            });
        }
    }
}

function createHeroes(texture) {
    heroes.ryuk = new Hero(texture);
}

function eventHandler() {
    document.addEventListener('keydown', (event) => {
        event = event.keyCode;
        switch (event) {
            case 40:
                heroes.ryuk.moveDown();
                break;
            case 37:
                heroes.ryuk.moveLeft();
                break;
            case 39:
                heroes.ryuk.moveRight();
                break;
            case 38:
                heroes.ryuk.moveUp();
                break;
        }
    });
    document.addEventListener('keyup', (event) => {
        event = event.keyCode;
        switch (event) {
            case 40:
                heroes.ryuk.vy = 0;
                break;
            case 37:
                heroes.ryuk.vx = 0;
                break;
            case 39:
                heroes.ryuk.vx = 0;
                break;
            case 38:
                heroes.ryuk.vy = 0;
                break;
        }
    });
}