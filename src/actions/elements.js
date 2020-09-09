class CanvasElement {
	constructor({
		id = Math.random() * 10000,
		type,
		x,
		y,
		w = 0,
		h = 0,
		strokeW,
		strokeC,
	}) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.id = id; // find a better way to set ids
		this.w = w;
		this.h = h;
		this.strokeW = strokeW;
		this.strokeC = strokeC;
	}

	get centerX() {
		return this.x + this.w / 2;
	}

	get centerY() {
		return this.y + this.h / 2;
	}

	get resizers() {
		return [
			{ x: this.x, y: this.y },
			{ x: this.x + this.w, y: this.y },
			{ x: this.x + this.w, y: this.y + this.h },
			{ x: this.x, y: this.y + this.h },
		];
	}
}

const mouseOnCircle = (mouseCords, circleCords, radius = 5) => {
	const a = circleCords.x - mouseCords.x;
	const b = circleCords.y - mouseCords.y;
	const cSquared = a * a + b * b;

	return cSquared <= radius * radius;
};

export { CanvasElement, mouseOnCircle };
