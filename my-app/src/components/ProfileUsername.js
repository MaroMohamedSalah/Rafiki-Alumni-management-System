import { Skeleton } from "@mui/material";

const ProfileUsername = ({ username }) => {
	return !username ? (
		<>
			"@" <Skeleton animation="wave" />
		</>
	) : (
		<h5 className="text-center text-md-start w-100 username">@{username}</h5>
	);
};

export default ProfileUsername;
