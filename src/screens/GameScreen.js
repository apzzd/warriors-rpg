import pop from "../../pop/index.js";
const { Container, math, entity, Camera } = pop;

import Level from "../../pop/Level.js"
import Player from "../entities/Player.js"
import Baddie from "../entities/Baddie.js"
import Sprite from "../../pop/Sprite.js";
import Texture from "../../pop/Texture.js";
import TileSprite from "../../pop/TileSprite.js";

class GameScreen extends Container {
    constructor(game, controls) {
        super()
        const { scene, w, h } = game;
        this.level = new Level(w * 2, h * 2)
        this.Player = new Player(controls)
        this.baddies = this.addTrees(this.level)
        this.camera = new Camera(
            this.Player,
            {w, h},
            {w: this.level.w, h: this.level.h})

        this.add(this.camera)
        this.camera.add(this.level)
        this.camera.add(this.baddies)
        this.camera.add(this.Player)
        
    }
    update(dt, t) {
        super.update(dt, t)
        const {Player, level} = this
        const {pos} = Player
        const {bounds: {top, bottom, left, right}} = level
        pos.x = math.clamp(pos.x, left, right)
        pos.y = math.clamp(pos.y, top, bottom)
        const ground = level.checkGround(entity.center(Player))
    }
    addTrees(level) {
        console.log("lev",level)
        const baddies = new Container()
        for (let i = 1; i < 30; i++) {
            const b = baddies.add(new Baddie(32*10, 0, {x: 8, y: 0}))
            b.pos.y = math.rand(1, 1000)
            b.pos.x = math.rand(1, 1000)
        }
        for (let i = 1; i < 10; i++) {
            const b = baddies.add(new Baddie(32*10, 0, {x: 8, y: 6}))
            b.pos.y = math.rand(1, 1000)
            b.pos.x = math.rand(1, 1000)
        }
        
        return baddies
    }
}

export default GameScreen