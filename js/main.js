// import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 1024,
    height: 656
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
        this.direction = 'down';
        this.vy = 5;
        this.moveCycle(direction.down);
    },
    moveLeft: function() {
        this.direction = 'left';
        this.vx = -5;
        this.moveCycle(direction.left);
    },
    moveRight: function() {
        this.direction = 'right';
        this.vx = 5;
        this.moveCycle(direction.right);
    },
    moveUp: function() {
        this.direction = 'up';
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

function Hero(texture, texture1) {
    this.sx = 48;
    this.sy = 64;
    this.vx = 0;
    this.vy = 0;
    this.direction = 'down';
    this.timerMove = 100;

    this.animationCycle = 4;
    let rectangle = new PIXI.Rectangle(0, 0, this.sx, this.sy);
    texture.frame = rectangle;
    this.sprite = new PIXI.Sprite(texture);
    this.animationHandler(texture, texture1);
    app.stage.addChild(this.sprite);
}

Hero.prototype.animationHandler = function(texture, texture1) {
    let frames = [texture, texture1];
    /*for (let i = 0; i < this.animationCycle; i++) {

        frames.push(new PIXI.Rectangle(this.sx * i, this.sy * 0 * direction[this.direction], this.sx, this.sy));
    }*/
    let anim = new PIXI.extras.AnimatedSprite(frames);
    anim.x = app.screen.width / 4;
    anim.y = app.screen.height / 4;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();
    app.stage.addChild(anim);
    app.ticker.add(function(){
        anim.rotation += 0.01;
    })
};

for (let key in moveMixin) {
    Hero.prototype[key] = moveMixin[key];
}

PIXI.loader.add([{name: 'ryuk', url: 'img/heroes/ryuk.png'}, {name: 'bunny', url: 'img/bunny.png'}]).load((loader, resources) => {

    console.log('resources', resources);
    const texture = resources['ryuk'].texture;
    const texture1 = resources['bunny'].texture;
    createHeroes(texture, texture1);
    eventHandler();
    // app.ticker.add(delta => gameLoop(delta));
});

function gameLoop(delta) {
    heroes.ryuk.sprite.x += heroes.ryuk.vx;
    heroes.ryuk.sprite.y += heroes.ryuk.vy;
}

function createHeroes(texture, texture1) {
    heroes.ryuk = new Hero(texture, texture1);
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