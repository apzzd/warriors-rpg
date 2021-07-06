class CanvasRenderer {
	constructor (w, h) {
		const canvas = document.createElement("canvas");
		this.w = canvas.width = w;
		this.h = canvas.height = h;
		this.view = canvas;
		this.ctx = canvas.getContext("2d");
	}

	render(container, clear = true) {
		const { ctx } = this;
		function renderRec (container) {
			container.children.forEach(child => {
				if (child.visible == false) {
					return;
				} // don't draw and exit !!

				ctx.save();
				// draw it
				if (child.pos) {
					ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
				}

				if (child.scale) {
					ctx.scale(child.scale.x, child.scale.y);
					child.scale.x = Math.abs(child.scale.x) * (child.flipped ? -1 : 1)
				}


				if (child.anchor) {
					ctx.translate(child.anchor.x, child.anchor.y)
					child.anchor.x = (child.flipped ? -32 : 0)
				}
				
				if (child.text) {
					// Text Objects
					const { font, fill, align } = child.style;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					ctx.fillText(child.text, 0, 0);

				} else if (child.texture) {
					const img = child.texture.img
					if (child.tileW) {
						ctx.drawImage(
							img,
							child.frame.x * child.tileW,
							child.frame.y * child.tileH,
							child.tileW, child.tileH,
							0, 0,
							child.tileW, child.tileH
						)
					} else {
						ctx.drawImage(img, 0, 0)
					}
				}
					
				

				if (child.children) {
					
					renderRec(child);
				}
				ctx.restore();
			})
		}
		if (clear) {
			ctx.clearRect(0, 0, this.w, this.h);
		}
		renderRec(container);
	}
}

export default CanvasRenderer;