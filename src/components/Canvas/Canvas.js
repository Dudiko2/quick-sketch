import React, { useRef, useEffect, useState } from "react";
import Styles from "./Canvas.module.css";

const Canvas = () => {
	const cRef = useRef();

	// const [ctx, setCtx] = useState(null);
	const [cvsSize, setCvsSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const [mouseAnchor, setMouseAnchor] = useState(null);
	const [mouseDown, setMouseDown] = useState(false);

	const [objects, setObjects] = useState([]);
	const [selected, setSelected] = useState(null);

	const setSize = () => {
		setCvsSize({ width: window.innerWidth, height: window.innerHeight });
	};

	useEffect(() => {
		window.addEventListener("resize", setSize);

		return () => window.removeEventListener("resize", setSize);
	}, []);

	useEffect(() => {
		console.log("drawing");

		const ctx = cRef.current.getContext("2d");
		ctx.fillStyle = "#f32f4f";
		ctx.fillRect(0, 0, cRef.current.width, cRef.current.height);

		ctx.strokeStyle = "#000000";
		objects.forEach((o) => {
			ctx.rect(o.x, o.y, o.w, o.h);
		});

		ctx.stroke();
	}, [objects]);

	const beginPath = (e) => {
		setMouseDown(true);
		setMouseAnchor({ x: e.clientX, y: e.clientY });
		setSelected({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
	};

	const movePressed = (e) => {
		if (mouseDown) {
			editPath(e);
		}
	};

	const closePath = (e) => {
		setMouseDown(false);
		if (selected.w && selected.h) setObjects([...objects, selected]);
	};

	const editPath = (e) => {
		if (mouseAnchor) {
			const x = Math.min(mouseAnchor.x, e.clientX);
			const y = Math.min(mouseAnchor.y, e.clientY);
			const w = Math.abs(e.clientX - mouseAnchor.x);
			const h = Math.abs(e.clientY - mouseAnchor.y);

			setSelected({ x, y, w, h });
		}
	};

	return (
		<canvas
			width={cvsSize.width}
			height={cvsSize.height}
			ref={cRef}
			className={Styles.Canvas}
			onMouseDown={(e) => beginPath(e)}
			onMouseMove={(e) => movePressed(e)}
			onMouseUp={(e) => closePath(e)}
		>
			Drawing canvas
		</canvas>
	);
};

export default Canvas;
