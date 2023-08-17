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
		console.log(profileStructure);
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
		<div
			className="progress w-100 mb-5"
			role="progressbar"
			aria-label="Example 1px high"
			aria-valuenow={progress}
			aria-valuemin={0}
			aria-valuemax={100}
		>
			<div
				className="progress-bar"
				style={{ width: `${progress}%`, borderRadius: "0" }}
			>
				{progress}%
			</div>
		</div>
	);
};

export default ProfileProgress;
