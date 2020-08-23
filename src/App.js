import React from "react";
import "./App.css";

import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
	return (
		<div className="App">
			<div
				className="Layout"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					display: "flex",
					justifyContent: "center",
					zIndex: 1,
				}}
			>
				<Toolbar />
			</div>
			<Canvas />
		</div>
	);
}

export default App;
