const drawElements = (ctx, els) => {
	els.forEach((elm) => {
		switch (elm.type) {
			case "rectangle":
				drawRectangle(ctx, elm);
				break;
			case "ellipse":
				drawEllipse(ctx, elm);
				break;
			default:
		}
	});
};

const drawRectangle = (ctx, elm) => {
	const { x, y, w, h, strokeW, strokeC } = elm;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	drawStroke(ctx, strokeW, strokeC);
};

const drawEllipse = (ctx, elm) => {
	const { w, h, strokeW, strokeC } = elm;
	const radX = w / 2;
	const radY = h / 2;

	ctx.beginPath();
	ctx.ellipse(elm.centerX, elm.centerY, radX, radY, 0, 0, Math.PI * 2);
	drawStroke(ctx, strokeW, strokeC);
};

const drawSelection = (ctx, els, selected) => {
	const elm = els.find((elm) => elm.id === selected);
	const { x, y, w, h } = elm;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	drawStroke(ctx, 1, "#47CFFA");

	// Center cross
	ctx.beginPath();
	ctx.arc(elm.centerX, elm.centerY, 4, 0, Math.PI * 2);
	ctx.moveTo(elm.centerX - 7, elm.centerY);
	ctx.lineTo(elm.centerX + 7, elm.centerY);
	ctx.moveTo(elm.centerX, elm.centerY - 7);
	ctx.lineTo(elm.centerX, elm.centerY + 7);
	drawStroke(ctx, 1, "#47CFFA");
};

const drawStroke = (ctx, width, color) => {
	if (width) {
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.stroke();
	}
};

export { drawElements, drawSelection };
