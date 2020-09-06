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

	const createShape = (e) => {
		const newElement = new CanvasElement({
			type: tool,
			x: e.clientX,
			y: e.clientY,
			strokeW: strokeWidth,
			strokeC: strokeColor,
		});

		setSelected(newElement.id);
		setCvsElements([...cvsElements, newElement]);
		setMouseAnchor({ x: newElement.x, y: newElement.y });
		setIsMouseDown(true);
	};

	const editShape = (e) => {
		if (isMouseDown) {
			const id = cvsElements.findIndex((el) => el.id === selected);

			const x = Math.min(mouseAnchor.x, e.clientX);
			const y = Math.min(mouseAnchor.y, e.clientY);
			const w = Math.abs(mouseAnchor.x - e.clientX);
			const h = Math.abs(mouseAnchor.y - e.clientY);

			const newArr = [...cvsElements];
			newArr[id] = new CanvasElement({ ...newArr[id], x, y, w, h });

			setCvsElements(newArr);
		}
	};

	const releaseShape = () => {
		const els = cvsElements.filter((elm) => elm.w !== 0 && elm.h !== 0);

		if (els.length !== cvsElements.length) setSelected(null);
		setCvsElements(els);
		setIsMouseDown(false);
		setMouseAnchor(null);
	};

	const selectShape = (e) => {
		const shape = [...cvsElements].reverse().find((el) => {
			return (
				el.x <= e.clientX &&
				el.x + el.w >= e.clientX &&
				el.y <= e.clientY &&
				el.y + el.h >= e.clientY
			);
		});

		if (shape) {
			setSelected(shape.id);
			setMouseAnchor({ x: e.clientX, y: e.clientY });
			setIsMouseDown(true);
		} else setSelected(null);
	};

	const moveShape = (e) => {
		const id = cvsElements.findIndex((elm) => elm.id === selected);

		const x = cvsElements[id].x + e.clientX - mouseAnchor.x;
		const y = cvsElements[id].y + e.clientY - mouseAnchor.y;

		const newArr = [...cvsElements];
		newArr[id] = new CanvasElement({ ...newArr[id], x, y });

		setMouseAnchor({ x: e.clientX, y: e.clientY });
		setCvsElements(newArr);
	};

	const selectionMouseMove = (e) => {
		if (isMouseDown) {
			moveShape(e);
		} else if (selected) {
			const elm = cvsElements.find((elm) => elm.id === selected);
			const resizeAnchor = elm.resizers.find((r) =>
				mouseOnCircle({ x: e.clientX, y: e.clientY }, r)
			);

			if (resizeAnchor) setTool(RESIZER);
		}
	};

	const resizerMouseDown = (e) => {
		const elm = cvsElements.find((elm) => elm.id === selected);
		const id = elm.resizers.findIndex((r) =>
			mouseOnCircle({ x: e.clientX, y: e.clientY }, r)
		);
		const anchorId = (id + 2) % 4;

		setMouseAnchor(elm.resizers[anchorId]);
		setIsMouseDown(true);
	};

	const resizerMouseMove = (e) => {
		if (isMouseDown) {
			editShape(e);
		} else {
			const elm = cvsElements.find((elm) => elm.id === selected);
			const resizeAnchor = elm.resizers.find((r) =>
				mouseOnCircle({ x: e.clientX, y: e.clientY }, r)
			);

			if (!resizeAnchor) setTool(SELECTION);
		}
	};

	const actions = new Actions({
		[RECTANGLE]: {
			mouseDown: createShape,
			mouseMove: editShape,
			mouseUp: releaseShape,
		},
		[ELLIPSE]: {
			mouseDown: createShape,
			mouseMove: editShape,
			mouseUp: releaseShape,
		},
		[SELECTION]: {
			mouseDown: selectShape,
			mouseMove: selectionMouseMove,
			mouseUp: releaseShape,
		},
		[RESIZER]: {
			mouseDown: resizerMouseDown,
			mouseMove: resizerMouseMove,
			mouseUp: releaseShape,
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
				selected={selected}
			/>
		</div>
	);
}

export default App;
