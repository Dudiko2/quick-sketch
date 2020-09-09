import React, { useState } from "react";
import "./App.css";
import { CanvasElement, mouseOnCircle } from "./actions/elements";
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";
import {
	DEFAULT_TOOL,
	Actions,
	RECTANGLE,
	ELLIPSE,
	SELECTION,
	RESIZER,
} from "./actions/tools";

function App() {
	const [cvsElements, setCvsElements] = useState([]);
	const [selected, setSelected] = useState(null);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [mouseAnchor, setMouseAnchor] = useState(null);
	const [tool, setTool] = useState(DEFAULT_TOOL);
	const [strokeWidth, setStrokeWidth] = useState(3);
	const [strokeColor, setStrokeColor] = useState("#000");

	const createShape = ({ clX, clY }) => {
		const newElement = new CanvasElement({
			type: tool,
			x: clX,
			y: clY,
			strokeW: strokeWidth,
			strokeC: strokeColor,
		});

		setSelected(newElement.id);
		setCvsElements([...cvsElements, newElement]);
		setMouseAnchor({ x: newElement.x, y: newElement.y });
		setIsMouseDown(true);
	};

	const editShape = ({ clX, clY }) => {
		if (isMouseDown) {
			const id = cvsElements.findIndex((el) => el.id === selected);

			const x = Math.min(mouseAnchor.x, clX);
			const y = Math.min(mouseAnchor.y, clY);
			const w = Math.abs(mouseAnchor.x - clX);
			const h = Math.abs(mouseAnchor.y - clY);

			const newArr = [...cvsElements];
			newArr[id] = new CanvasElement({ ...newArr[id], x, y, w, h });

			setCvsElements(newArr);
		}
	};

	const releaseShape = () => {
		const els = cvsElements.filter((elm) => elm.w !== 0 && elm.h !== 0);

		if (els.length !== cvsElements.length) setSelected(null);
		setTool(SELECTION);
		setCvsElements(els);
		setIsMouseDown(false);
		setMouseAnchor(null);
	};

	const selectionStart = ({ clX, clY }) => {
		if (selected) {
			const selectedElm = cvsElements.find((s) => s.id === selected);
			const id = selectedElm.resizers.findIndex((r) =>
				mouseOnCircle({ x: clX, y: clY }, r)
			);

			if (id !== -1) {
				const oppositeId = (id + 2) % 4;
				setTool(RESIZER);
				setIsMouseDown(true);
				setMouseAnchor(selectedElm.resizers[oppositeId]);
			} else {
				selectShape({ clX, clY });
			}
		} else selectShape({ clX, clY });
	};

	const selectShape = ({ clX, clY }) => {
		const shape = [...cvsElements].reverse().find((el) => {
			return (
				el.x <= clX && el.x + el.w >= clX && el.y <= clY && el.y + el.h >= clY
			);
		});

		if (shape) {
			setSelected(shape.id);
			setMouseAnchor({ x: clX, y: clY });
			setIsMouseDown(true);
		} else setSelected(null);
	};

	const moveShape = ({ clX, clY }) => {
		const id = cvsElements.findIndex((elm) => elm.id === selected);

		const x = cvsElements[id].x + clX - mouseAnchor.x;
		const y = cvsElements[id].y + clY - mouseAnchor.y;

		const newArr = [...cvsElements];
		newArr[id] = new CanvasElement({ ...newArr[id], x, y });

		setMouseAnchor({ x: clX, y: clY });
		setCvsElements(newArr);
	};

	const selectionMove = ({ clX, clY }) => {
		if (isMouseDown) {
			moveShape({ clX, clY });
		}
	};

	const resizerMove = ({ clX, clY }) => {
		if (isMouseDown) {
			editShape({ clX, clY });
		}
	};

	const actions = new Actions({
		[RECTANGLE]: {
			mouseDown: createShape,
			mouseMove: editShape,
			mouseUp: releaseShape,
			touchStart: createShape,
			touchMove: editShape,
			touchEnd: releaseShape,
		},
		[ELLIPSE]: {
			mouseDown: createShape,
			mouseMove: editShape,
			mouseUp: releaseShape,
			touchStart: createShape,
			touchMove: editShape,
			touchEnd: releaseShape,
		},
		[SELECTION]: {
			mouseDown: selectionStart,
			mouseMove: selectionMove,
			mouseUp: releaseShape,
			touchStart: selectionStart,
			touchMove: selectionMove,
			touchEnd: releaseShape,
		},
		[RESIZER]: {
			mouseMove: resizerMove,
			mouseUp: releaseShape,
			touchMove: resizerMove,
			touchEnd: releaseShape,
		},
	});

	return (
		<div className="App">
			<Toolbar setTool={setTool} active={tool} />
			<Canvas
				elements={cvsElements}
				onMouseDown={(e) => actions.mouseDown(e, tool)}
				onMouseMove={(e) => actions.mouseMove(e, tool)}
				onMouseUp={(e) => actions.mouseUp(e, tool)}
				onTouchStart={(e) => actions.touchStart(e, tool)}
				onTouchMove={(e) => actions.touchMove(e, tool)}
				onTouchEnd={(e) => actions.touchEnd(e, tool)}
				selected={selected}
			/>
		</div>
	);
}

export default App;
