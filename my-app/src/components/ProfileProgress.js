import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileProgress = () => {
	const userInfo = useSelector((state) => state.userInfo);
	const [profileStructure, setProfileStructure] = useState([]);
	const [progress, setProgress] = useState(0);
	const calculateProgress = (profileStructure) => {
		let progress = 0;
		profileStructure.forEach((el) => {
			if (el !== null) progress += 10;
		});
		setProgress(progress);
	};
	useEffect(() => {
		calculateProgress(profileStructure);
	}, [profileStructure]);

	useEffect(() => {
		setProfileStructure([
			userInfo.user.Phone,
			userInfo.user.Img,
			userInfo.user.CV,
			userInfo.user.Country,
			userInfo.user.LinkedIn_URL,
			userInfo.user.Behance_URL,
			userInfo.user.GitHub_URL,
			userInfo.user.About,
		]);
	}, [userInfo]);

	return (
		<div className="mb-4 mt-2">
			<h5>Your Progress</h5>
			<div className="d-flex justify-content-between align-items-center">
				<div
					className="progress"
					role="progressbar"
					aria-label="Your Progress"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					<div
						className="progress-bar"
						style={{ width: `${progress}%`, borderRadius: "0" }}
					></div>
				</div>
				<span className="fw-bold">{progress}%</span>
			</div>
			{progress > 10 && (
				<p>Great job! complete your profile to get more achieves</p>
			)}
		</div>
	);
};

export default ProfileProgress;
