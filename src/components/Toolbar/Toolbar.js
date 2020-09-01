import React from "react";
import Styles from "./Toolbar.module.css";

import { RECTANGLE, ELLIPSE } from "../../state/globals";

const Toolbar = ({ setTool, active }) => {
	return (
		<div className={Styles.Toolbar}>
			<div>Selection</div>
			<div
				className={active === RECTANGLE ? Styles.active : ""}
				onClick={() => setTool(RECTANGLE)}
			>
				Rectangle
			</div>
			<div
				className={active === ELLIPSE ? Styles.active : ""}
				onClick={() => setTool(ELLIPSE)}
			>
				Ellipse
			</div>
		</div>
	);
};

export default Toolbar;
