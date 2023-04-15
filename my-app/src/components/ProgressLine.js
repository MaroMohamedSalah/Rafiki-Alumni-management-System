import React, { useEffect, useState } from "react";
import "./ProgressLine.css";

const ProgressLine = () => {
	const [progress, setProgress] = useState(0);

	// Update progress based on current route
	const handleProgress = () => {
		const path = window.location.pathname;

		if (path === "/") {
			setProgress(0);
		} else if (path === "/roleSelection") {
			setProgress(25);
		} else if (
			path === "/alumniSignup" ||
			path === "/hrSignup" ||
			path === "/studentSignup"
		) {
			setProgress(75);
		} else if (path === "/success") {
			setProgress(100);
		}
	};

	// Call handleProgress on component mount and route change
	useEffect(() => {
		handleProgress();
	}, [window.location.pathname]);

	return (
		<div className="progress-bar my-5">
			<div className="progress" style={{ width: `${progress}%` }}></div>
		</div>
	);
};

export default ProgressLine;
