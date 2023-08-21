const ProfileJobTitle = ({ userInfo, actorName }) => {
	return (
		<h5 className="text-white-50 text-center text-md-start jobTitle">
			{actorName === "HR" ? "HR" : "Job Title"}
		</h5>
	);
};
export default ProfileJobTitle;
