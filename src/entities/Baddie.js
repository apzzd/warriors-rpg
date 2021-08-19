import pop from "../../pop/index.js"
const {TileSprite, Texture} = pop
const texture = new Texture("../../res/Warriors-RPG/ground.png")

class Baddie extends TileSprite {
    constructor (xSpeed, ySpeed, frame, texture) {
        super(texture, 140, 140)
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.frame = frame
        this.texture = texture
    }
    
}
export default Baddie