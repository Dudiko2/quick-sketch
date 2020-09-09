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
		if (this[tool] && this[tool].mouseDown)
			this[tool].mouseDown({ clX: e.clientX, clY: e.clientY });
	}

	mouseMove(e, tool) {
		if (this[tool] && this[tool].mouseMove)
			this[tool].mouseMove({ clX: e.clientX, clY: e.clientY });
	}

	mouseUp(e, tool) {
		if (this[tool] && this[tool].mouseUp) this[tool].mouseUp();
	}

	touchStart(e, tool) {
		if (this[tool] && this[tool].touchStart)
			this[tool].touchStart({
				clX: e.touches[0].clientX,
				clY: e.touches[0].clientY,
			});
	}

	touchMove(e, tool) {
		if (this[tool] && this[tool].touchMove)
			this[tool].touchMove({
				clX: e.touches[0].clientX,
				clY: e.touches[0].clientY,
			});
	}

	touchEnd(e, tool) {
		if (this[tool] && this[tool].touchEnd) this[tool].touchEnd();
	}
}

export { DEFAULT_TOOL, SELECTION, RECTANGLE, ELLIPSE, RESIZER, Actions };
