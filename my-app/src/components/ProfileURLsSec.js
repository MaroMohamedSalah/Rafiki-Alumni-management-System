import { useState } from "react";

const ProfileURLsSec = () => {
	const [isEmpty, setIsEmpty] = useState(true);
	return (
		<section
			className={isEmpty === true ? "ProfileURLs sec empty" : "ProfileURLs sec"}
		>
			<h1 className="sec-title">
				<span className="icon">
					<i className="fa-solid fa-link"></i>
				</span>{" "}
				Links & websites
			</h1>
			{isEmpty === true ? (
				<div className="empty-sec position-relative">
					<div className="sec-placeholder">
						<span></span>
						<span></span>
					</div>
					<div className="sec-placeholder">
						<span></span>
						<span></span>
					</div>
					<div className="add position-absolute d-flex justify-content-center align-items-center flex-column">
						<div className="addIcon">
							<i className="fa-solid fa-plus"></i>
						</div>
						<h1>Add Your Accounts URLs</h1>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default ProfileURLsSec;
