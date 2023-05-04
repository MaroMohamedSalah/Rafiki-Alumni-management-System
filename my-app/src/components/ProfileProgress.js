const ProfileProgress = ({ progress }) => {
	return (
		<div
			className="progress w-100 mt-5"
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
