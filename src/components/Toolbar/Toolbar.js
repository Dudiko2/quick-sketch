import React from "react";
import Styles from "./Toolbar.module.css";

import { RECTANGLE, ELLIPSE, SELECTION } from "../../actions/tools";

const Toolbar = ({ setTool, active }) => {
	return (
		<div className={Styles.Container}>
			<div className={Styles.Toolbar}>
				<div
					className={active === SELECTION ? Styles.active : ""}
					onClick={() => setTool(SELECTION)}
				>
					Selection
				</div>
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
		</div>
	);
};

export default Toolbar;
