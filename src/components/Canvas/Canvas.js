import React, { useRef, useEffect, useState } from "react";
import Styles from "./Canvas.module.css";

const Canvas = ({ elements, createObject, editObject, onMouseUp }) => {
	const cRef = useRef();

	const [cvsSize, setCvsSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const setSize = () => {
		setCvsSize({ width: window.innerWidth, height: window.innerHeight });
	};

	useEffect(() => {
		console.log("setSize effect");
		window.addEventListener("resize", setSize);

		return () => window.removeEventListener("resize", setSize);
	}, []);

	useEffect(() => {
		console.log("drawCanvas effect");
		const cvs = cRef.current;
		const ctx = cRef.current.getContext("2d");

		ctx.clearRect(0, 0, cvs.width, cvs.height);
		ctx.beginPath();

		elements.forEach((elm) => {
			const { x, y, w, h } = elm;

			ctx.rect(x, y, w, h);
		});
		ctx.stroke();
	}, [elements]);

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
