import Sprite from "./Sprite.js"
import AnimManager from "./AnimManager.js"

class TileSprite extends Sprite {
    constructor (texture, w, h) {
        super(texture)
        this.tileW = w 
        this.tileH = h
        this.w = w
        this.h = h
        this.frame = {x:0, y:0}  
        this.anims = new AnimManager(this)
    }
    
    update(dt, t) {
        this.anims.update(dt, t)
    }
}

export default TileSprite