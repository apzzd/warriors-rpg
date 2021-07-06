class KeyControl {
	constructor() {
		this.keys = {};
		document.addEventListener("keydown", e => {
			if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code)) {
				e.preventDefault();
			}
			this.keys[e.code] = true;
		}, false)
		document.addEventListener("keyup", e => {
			this.keys[e.code] = false;
		})
	}
	get action() {
		return this.keys['Space']
	}

	key(key, value) {
		if (value !== undefined) {
			this.keys[key] = value;
		}
		return this.keys[key];
	}

	reset() {
		for (let key in this.keys) {
			this.keys[key] = false;
		}
	}

	get x() {
		if (this.keys['ArrowLeft'] || this.keys['KeyA']) return -1;
		if (this.keys['ArrowRight'] || this.keys['KeyD']) return 1;
		return 0;
	}

	get y() {
		if (this.keys['ArrowDown'] || this.keys['KeyS']) return 1;
		if (this.keys['ArrowUp'] || this.keys['KeyW']) return -1;
		return 0;
	}
}

export default KeyControl;