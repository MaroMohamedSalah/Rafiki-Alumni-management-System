import { useState } from "react";

const DashboardSlider = () => {
	const [sliderIsOpen, setSliderIsOpen] = useState(true);

	const handleTriggerClick = () => {
		setSliderIsOpen(!sliderIsOpen);
	};

	return (
		<div
			className={`py-4 px-2 slider ${sliderIsOpen ? "open col-2" : "col-1"}`}
		>
			<div className="slider-container position-relative container-fluid py-3">
				<div
					className="sliderTrigger position-absolute"
					onClick={handleTriggerClick}
				>
					<i className="fa-solid fa-bars"></i>
				</div>
			</div>
		</div>
	);
};

export default DashboardSlider;
