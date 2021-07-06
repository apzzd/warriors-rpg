import pop from '../pop/index.js';
import Sprite from '../pop/Sprite.js';
import Texture from '../pop/Texture.js';

const { Container, KeyControl, CanvasRenderer, Text } = pop;

const w = 640;
const h = 300;

const renderer = new CanvasRenderer(w, h);
document.querySelector("#board").appendChild(renderer.view);


const scene = new Container();

const textures = {
	background: new Texture("res/bg.png"),
	spaceship: new Texture("res/spaceship.png"),
	bullet: new Texture("res/bullet.png"),
	baddie: new Texture("res/baddie.png"),
	explo: new Texture("res/explosion.png")
}

const controls = new KeyControl();

const ship = new Sprite(textures.spaceship);

ship.pos.x = 120;
ship.pos.y = (h / 2) - 16;

ship.update = function (dt, t) {
	const { pos } = this;
	pos.x += controls.x * dt * 200;
	pos.y += controls.y * dt * 200;

	if (pos.x < 0) pos.x = 0;
	if (pos.x > w) pos.x = w;
	if (pos.y < 0) pos.y = 0;
	if (pos.y > (h-40)) pos.y = h - 40;
}

scene.add(new Sprite(textures.background));
scene.add(ship);

const bullets = new Container();
scene.add(bullets);

function fireBullet(x, y) {
	const bullet = new Sprite(textures.bullet);
	bullet.pos.x = x;
	bullet.pos.y = y;
	bullet.update = function(dt) {
		this.pos.x += 400 * dt;
	}
	bullets.add(bullet);

}

let dt, t, last;

last = 0;
let lastShot = 0;

const baddies = new Container();

function spawnBaddie(x, y, speed, t) {
	const baddie = new Sprite(textures.baddie);
	baddie.pos.x = x;
	baddie.pos.y = y;
	baddie.vy = 0;
	baddie.lastChangeY = t;
	baddie.update = function(dt) {
		this.pos.x += speed * dt;
		this.pos.y += this.vy * dt;
	};
	baddie.size = 1 - (Math.random() * 0.5);
	baddies.add(baddie);
}

let lastSpawn = 0;
let spawnSpeed = 1.0;
scene.add(baddies);

const score = new Text("score:", {
	font: "20px sans-serif",
	fill: "#8B8994",
	align: "center"
})

score.pos.x = w / 2;
score.pos.y = h - 30;
scene.add(score);


const explosions = new Container();

scene.add(explosions);

function spawnExplosion(x, y) {
	const explo = new Sprite(textures.explo);
	explo.pos.x = x;
	explo.pos.y = y;
	explo.size = 0.01;
	explo.grows = true;
	explo.update = function(dt) {
		this.size += dt * 2;
	}
	explosions.add(explo)
	console.log("explosion", explosions)
}

let scoreAmount = 0;
let gameOver = false;


function doGameOver() {
	const gameOverMsg = new Text("Game Over", {
		font: "30pt sans-serif",
		fill: "red",
		align: "center"
	})

	gameOverMsg.pos.x = w / 2;
	gameOverMsg.pos.y = 120;

	scene.add(gameOverMsg);
	scene.remove(ship);
	gameOver = true;
}

function loopy(ms) {

	requestAnimationFrame(loopy);
	const t = ms /1000;
	dt = t - last;
	last = t;

	if (!gameOver && controls.action && t - lastShot > 0.15) {
		lastShot = t;
		fireBullet(ship.pos.x + 24, ship.pos.y + 10);
	}

	explosions.children.forEach(explo => {
		if (explo.size > 1) {
			explo.dead = true;
		}
	})

	baddies.children.forEach(baddie => {

		if (baddie.pos.y > h || baddie.pos.y < 0) {
			baddie.vy = -baddie.vy;
		}

		if (t - baddie.lastChangeY > 2) {
			baddie.lastChangeY = t;
			baddie.vy = -100 + (Math.random()*200);
		} 
		

		bullets.children.forEach(bullet => {
			const dx = baddie.pos.x + 16 - (bullet.pos.x + 8);
			const dy = baddie.pos.y + 16 - (bullet.pos.y + 8);
			if (Math.sqrt(dx*dx + dy*dy) < 24) {
				// collision!
				baddie.dead = true;
				bullet.dead = true;
				spawnExplosion(baddie.pos.x, baddie.pos.y)
				scoreAmount += Math.floor(t)
			}
		})
		if (baddie.pos.x < -32) {
			if (!gameOver) {
				doGameOver();
			}
			baddie.dead = true;
		}


	})

	bullets.children.forEach(b => {
		if (b.pos.x >= w + 20) {
			b.dead = true;
		}
	});

	if (t - lastSpawn > spawnSpeed) {
		lastSpawn = t;
		const speed = -50 - (Math.random() * Math.random() * 100);
		const position = Math.random() * (h - 24);
		spawnBaddie(w, position, speed, t);

		spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001;
	}

	score.text = `score: ${scoreAmount}`


	scene.update(dt, t);
	renderer.render(scene);

}


requestAnimationFrame(loopy);
