import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
	const loadingOverlayStyle = {
		width: "100%",
		height: "100vh",
		position: "fixed",
		top: 0,
		left: 0,
		backgroundColor: "#37474fde",
		zIndex: 11,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	return (
		<div className="Loading" style={loadingOverlayStyle}>
			<PuffLoader color="rgb(54, 181, 215)" size={112} />
		</div>
	);
};

export default Loading;
