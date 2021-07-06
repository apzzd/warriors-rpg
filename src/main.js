import KeyControl from '../pop/controls/KeyControls.js';
import pop from '../pop/index.js';
// import LogoScreen from "./screens/LogoScreen.js"
// import TitleScreen from "./screens/TitleScreen.js"
import GameScreen from "./screens/GameScreen.js"
// import GameOverScreen from "./screens/GameOverScreen.js"

const { Game } = pop;

const game = new Game(640, 480)
const controls = new KeyControl()



function gameOverScreen(result) {
    game.scene = new GameOverScreen(game, controls, result, titleScreen)
}

function titleScreen() {
    game.scene = new TitleScreen(game, controls, newGame)
}

function newGame() {
    game.scene = new GameScreen(game, controls, gameOverScreen)
}

// game.scene = new LogoScreen(game, titleScreen)

newGame()

game.run()