import pop from "../../pop/index.js"
import TileMap from "../../pop/Tilemap.js"
import math from "../../utils/math.js"

const  {TileSprite, Texture} = pop
const texture = new Texture("res/player-walk.png")

class Squizz extends TileSprite {
    constructor(controls) {
        super(texture, 32, 32)

        this.controls = controls
        this.anchor = { x: 0, y: 0 }
        const anims = this.anims
        anims.add("walk", [0, 1, 2, 3].map(x=>({x, y: 0})), 0.15)
        anims.add("idle", [{x: 0, y:0}, {x: 4, y: 0}, {x: 4, y: 1}, {x:4, y:0}], 0.4)
        
        anims.play("walk")

        this.speed = 0.15
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
            }
        } 
        pos.x += dir.x * dt * (32/speed)
        pos.y += dir.y * dt * (32/speed)


       }
       
    }

export default Squizz