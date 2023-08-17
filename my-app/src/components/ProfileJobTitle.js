const ProfileJobTitle = ({ userInfo, actorName }) => {
	return (
		<h5 className="d-none d-md-block text-white-50 text-center text-md-start">
			{actorName === "HR" ? "HR" : "Job Title"}
		</h5>
	);
};
export default ProfileJobTitle;
