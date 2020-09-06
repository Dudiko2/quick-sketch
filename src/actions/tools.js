const SELECTION = "selection";
const RECTANGLE = "rectangle";
const ELLIPSE = "ellipse";
const RESIZER = "resizer";
const DEFAULT_TOOL = RECTANGLE;

// const exmp = {
// 	rectangle: {
// 		click: () => {},
// 		mousedown: () => {},
// 	},
// 	selection: {
// 		click: () => {},
// 	},
// };

class Actions {
	constructor(tools) {
		for (let tool in tools) {
			this[tool] = tools[tool];
		}
	}

	mouseDown(e, tool) {
		if (this[tool] && this[tool].mouseDown) this[tool].mouseDown(e);
	}

	mouseMove(e, tool) {
		if (this[tool] && this[tool].mouseMove) this[tool].mouseMove(e);
	}

	mouseUp(e, tool) {
		if (this[tool] && this[tool].mouseUp) this[tool].mouseUp(e);
	}
}

export { DEFAULT_TOOL, SELECTION, RECTANGLE, ELLIPSE, RESIZER, Actions };
