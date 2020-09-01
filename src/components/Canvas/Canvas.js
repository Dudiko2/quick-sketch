import React, { useRef, useEffect, useState, useCallback } from "react";
import Styles from "./Canvas.module.css";
import { drawElements, drawSelection } from "../../actions/drawing";

const Canvas = ({
	elements,
	createObject,
	editObject,
	onMouseUp,
	selected,
}) => {
	const cRef = useRef();

	const [cvsSize, setCvsSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const setSize = () => {
		setCvsSize({ width: window.innerWidth, height: window.innerHeight });
	};

	const drawCanvas = useCallback(() => {
		const cvs = cRef.current;
		const ctx = cRef.current.getContext("2d");

		ctx.clearRect(0, 0, cvs.width, cvs.height);

		drawElements(ctx, elements);
		if (selected) drawSelection(ctx, elements, selected);
	}, [elements, selected]);

	useEffect(() => {
		console.log("setSize effect");

		window.addEventListener("resize", setSize);

		return () => window.removeEventListener("resize", setSize);
	}, []);

	useEffect(() => {
		// console.log("drawCanvas effect");
		drawCanvas();
	}, [drawCanvas, cvsSize]);

	return (
		<canvas
			width={cvsSize.width}
			height={cvsSize.height}
			ref={cRef}
			className={Styles.Canvas}
			onMouseDown={createObject}
			onMouseMove={editObject}
			onMouseUp={onMouseUp}
		>
			Drawing canvas
		</canvas>
	);
};

export default Canvas;
