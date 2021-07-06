import math from "../utils/math.js"

function center(entity) {
    const {pos, tileH, tileW} = entity
    return {
        x: pos.x + tileW/2,
        y: pos.y + tileH/2
    }
}
function distance(a, b) {
    return math.distance(center(a), center(b))
}

export default {
    center,
    distance
}