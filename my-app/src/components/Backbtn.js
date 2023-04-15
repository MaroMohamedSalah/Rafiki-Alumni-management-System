const Backbtn = ({
	btnColor,
	btnSize,
	btnTop,
	btnLeft,
	btnColorMobile,
	btnSizeMobile,
	btnTopMobile,
	btnLeftMobile,
}) => {
	const handleBackClick = () => {
		window.history.back(); // Go back one step in history
	};
	const isMobile = window.innerWidth <= 768;
	return isMobile === false ? (
		<div
			className="back position-absolute"
			onClick={handleBackClick}
			style={{
				top: btnTop,
				left: btnLeft,
			}}
		>
			<i
				id="back"
				className="fa-solid fa-arrow-left"
				style={{
					color: btnColor,
					fontSize: btnSize,
					cursor: "pointer",
				}}
			></i>
		</div>
	) : (
		<div
			className="back position-absolute"
			onClick={handleBackClick}
			style={{
				top: btnTopMobile,
				left: btnLeftMobile,
			}}
		>
			<i
				id="back"
				className="fa-solid fa-arrow-left"
				style={{
					color: btnColorMobile,
					fontSize: btnSizeMobile,
					cursor: "pointer",
				}}
			></i>
		</div>
	);
};

export default Backbtn;
