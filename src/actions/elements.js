class CanvasElement {
	constructor({ id = Math.random() * 10000, type, x, y, w = 0, h = 0 }) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.id = id; // find a better way to set ids
		this.w = w;
		this.h = h;
	}

	get centerX() {
		return this.x + this.w / 2;
	}

	get centerY() {
		return this.y + this.h / 2;
	}
}

export { CanvasElement };
