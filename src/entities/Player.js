import pop from "../../pop/index.js"
import TileMap from "../../pop/Tilemap.js"
import math from "../../utils/math.js"

const  {TileSprite, Texture} = pop
const texture = new Texture("res/Warriors-RPG/cats2.png")

class Player extends TileSprite {
    constructor(controls) {
        super(texture, 48, 48)

        this.controls = controls
        this.anchor = { x: 0, y: 0 }
        const anims = this.anims
        anims.add("walkf", [{x: 0, y: 0}, {x: 1, y: 0}, {x:2 , y:0}], 0.12)
        anims.add("walkl", [{x: 0, y: 1}, {x: 1, y: 1}, {x:2 , y:1}], 0.12)
        anims.add("walkr", [{x: 0, y: 2}, {x: 1, y: 2}, {x:2 , y:2}], 0.12)
        anims.add("walkb", [{x: 0, y: 3}, {x: 1, y: 3}, {x:2 , y:3}], 0.12)
        anims.add("idle", [{x: 1, y: 0}], 0.12)

        anims.play("walkr")

        this.speed = 0.3
        this.dir = {
            x: 1,
            y: 0
        }
        this.nextCell = this.speed

    }
    update(dt, t) {
       super.update(dt, t)
       const {pos, controls, speed, dir} = this
       if ((this.nextCell -= dt) <= 0) {
            const {x, y} = controls
            this.nextCell += speed
            if (x && x !== dir.x) {
                dir.x = x
                dir.y = 0
                pos.y = Math.round(pos.y / 32) * 32
            } else if (y && y !== dir.y) {
                dir.y = y
                dir.x = 0
                pos.x = Math.round(pos.x / 32) * 32
            } else if (x == 0 && y == 0) {
                dir.x = 0
                dir.y = 0
                pos.x = Math.round(pos.x / 32) * 32
                pos.y = Math.round(pos.y / 32) * 32

            }

            ///

            if (x == 1) {
                console.log("going right")
                this.anims.play("walkr")
            } else if (x == -1) {
                console.log("going left")
                this.anims.play("walkl")
            } else if (y == 1) {
                console.log("going down")
                this.anims.play("walkf")
            } else if (y == -1) {
                console.log("going up")
                this.anims.play("walkb")
            } else {
                console.log("idle")
                this.anims.stop()
            }
        } 
        pos.x += dir.x * dt * (32/speed)
        pos.y += dir.y * dt * (32/speed)


       }
       
    }

export default Player
