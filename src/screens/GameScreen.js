import pop from "../../pop/index.js";
const { Container, math, entity, Camera } = pop;

import Level from "../../pop/Level.js"
import Player from "../entities/Player.js"
import Baddie from "../entities/Baddie.js"

class GameScreen extends Container {
    constructor(game, controls) {
        super()
        const { scene, w, h } = game;
        this.level = new Level(w * 2, h * 2)
        this.Player = new Player(controls)
        this.baddies = this.addBaddies(this.level)
        this.camera = new Camera(
            this.Player,
            {w, h},
            {w: this.level.w, h: this.level.h})

        this.add(this.camera)
        this.camera.add(this.level)
        this.camera.add(this.Player)
        this.camera.add(this.baddies)
        
    }
    update(dt, t) {
        super.update(dt, t)
        const {Player, level} = this
        const {pos} = Player
        const {bounds: {top, bottom, left, right}} = level
        pos.x = math.clamp(pos.x, left, right)
        pos.y = math.clamp(pos.y, top, bottom)
        const ground = level.checkGround(entity.center(Player))
        this.updateBaddies()
    }
    addBaddies(level) {
        console.log("lev",level)
        const baddies = new Container()
        // for (let i = 1; i < 5; i++) {
        //     const b = baddies.add(new Baddie(32*10, 0))
        //     b.pos.y = Math.floor(level.h/5) * i + level.tileH
        // }
        // for (let i = 1; i < 10; i++) {
        //     const b = baddies.add(new Baddie(0, 32*10))
        //     b.pos.x = Math.floor(level.w/10) * i + level.tileW
        // }
        // for (let i = 1; i < 10; i++) {
        //     const b = baddies.add(new Baddie(32*5, 32*5))
        //     b.pos.x = Math.floor(level.w/10) * i + level.tileW
        //     b.pos.y = Math.floor(level.h/10) * i + level.tileH
        // }
        // for (let i = 1; i < 10; i++) {
        //     const b = baddies.add(new Baddie(32*5, 32*5))
        //     b.pos.x = Math.floor(level.w/10) * i + level.tileW
        //     b.pos.y = Math.floor(level.h/10) * i - level.tileH
        // }
        // for (let i = 1; i < 10; i++) {
        //     const b = baddies.add(new Baddie(32*5, 32*5))
        //     b.pos.x = Math.floor(level.w/10) * i - level.tileW
        //     b.pos.y = Math.floor(level.h/10) * i - level.tileH
        // }
        // for (let i = 1; i < 10; i++) {
        //     const b = baddies.add(new Baddie(32*5, 32*5))
        //     b.pos.x = Math.floor(level.w/10) * i - level.tileW
        //     b.pos.y = Math.floor(level.h/10) * i + level.tileH
        // }
        return baddies
    }
    updateBaddies() {
        const { Player, level } = this
        this.baddies.map(b => {
            const {pos} = b
            if (entity.distance(Player, b) < 32 && !Player.dead) {
                Player.dead = true
                if (b.xSpeed) pos.x = -level.w
                else pos.y = -level.h
            }
            if (pos.x > level.w) pos.x = -32
            if (pos.y > level.h) pos.y = -32
        })
    }
}

export default GameScreen