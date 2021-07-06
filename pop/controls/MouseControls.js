class MouseControl {

	constructor(container) {
		this.el = container || document.body;
		this.pos = { x: 0, y: 0 };
		this.isDown = false;
		this.justPressed = false;
		this.justReleased = false;

		document.addEventListener("mousemove", this.move.bind(this), false);
		document.addEventListener("mousedown", this.down.bind(this), false);
		document.addEventListener("mouseup", this.up.bind(this), false);
	}

	mousePosFromEvent({ clientX, clientY }) {
		const { el, pos } = this;
		const rect = el.getBoundingClientRect();
		const xr = el.width / el.clientWidth;
		const yr = el.height / el.clientHeight;
		pos.x = (clientX - rect.left) * xr;
		pos.y = (clientY - rect.top) * yr;
	}

	move(e) {
		this.mousePosFromEvent(e);
	}

	down(e) {
		this.isDown = true;
		this.justPressed = true;
		this.mousePosFromEvent(e);
	}

	up() {
		this.isDown = false;
		this.justReleased = true;
	}

	update() {
		this.justReleased = false;
		this.justPressed = false;
	}
}

export default MouseControl;