import pop from "../../pop/index.js"
const {TileSprite, Texture} = pop
const texture = new Texture("../../res/Warriors-RPG/ground.png")

class Baddie extends TileSprite {
    constructor (xSpeed, ySpeed, frame) {
        super(texture, 32, 32)
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.frame = frame
    }
    
}
export default Baddie