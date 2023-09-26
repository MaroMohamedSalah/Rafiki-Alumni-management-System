import React, { useState, useEffect } from "react";
import "./cursor.css";

const Cursor = () => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isClicked, setIsClicked] = useState(false); // Add state to track click
	const [isHovered, setIsHovered] = useState(false); // Add state to track hover

	useEffect(() => {
		const moveCursor = (e) => {
			const { clientX: mouseX, clientY: mouseY } = e;
			setCursorPosition({ x: mouseX, y: mouseY });
		};

		const clickCursor = () => {
			// Handle cursor click here, e.g., add CSS classes for expanding animation.
			setIsClicked(true);

			// Remove the click effect after a delay (adjust the duration as needed)
			setTimeout(() => {
				setIsClicked(false);
			}, 500); // 500 milliseconds (adjust as needed)
		};

		const hoverCursor = () => {
			setIsHovered(true);
		};
		const leaveCursor = () => {
			setIsHovered(false);
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("click", clickCursor);
		window.addEventListener("mouseenter", hoverCursor);
		window.addEventListener("mouseleave", leaveCursor);

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("click", clickCursor);
			window.removeEventListener("mouseenter", hoverCursor);
			window.removeEventListener("mouseleave", leaveCursor);
		};
	}, []);

	const cursorStyle = {
		transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`,
	};

	return (
		<div className="d-none d-lg-block">
			<div
				className={`Cursor main ${isClicked ? "expend" : ""} ${
					isHovered ? "hover" : ""
				}`}
				style={cursorStyle}
			></div>
			<div
				className={`Cursor follow1 ${isHovered ? "hover" : ""}`}
				style={cursorStyle}
			></div>
		</div>
	);
};

export default Cursor;
