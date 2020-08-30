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
	const { x, y, w, h } = elm;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.stroke(); // temp
};

const drawEllipse = (ctx, elm) => {
	const { x, y, w, h } = elm;
	const centerX = x + w / 2;
	const centerY = y + h / 2;
	const radX = w / 2;
	const radY = h / 2;

	ctx.beginPath();
	ctx.ellipse(centerX, centerY, radX, radY, 0, 0, Math.PI * 2);
	ctx.stroke(); // temp
};

export { drawElements };
