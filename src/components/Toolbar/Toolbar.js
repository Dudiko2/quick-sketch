import React from "react";
import Styles from "./Toolbar.module.css";

const Toolbar = () => {
	return (
		<div className={Styles.Toolbar}>
			<span>Brush</span>
			<span>Rectangle</span>
		</div>
	);
};

export default Toolbar;
