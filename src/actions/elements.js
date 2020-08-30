class CanvasElement {
	constructor(type, x, y) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.id = Math.random() * 10000; // find a better way to set ids
		this.w = 0;
		this.h = 0;
	}
}

export { CanvasElement };
