import { useDispatch, useSelector } from "react-redux";
import ProfileImg from "./ProfileImg";
import ProfileJobTitle from "./ProfileJobTitle";
import ProfileName from "./ProfileName";
import ProfileUsername from "./ProfileUsername";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfoContainer = () => {
	const userInfo = useSelector((state) => state.profile.userInfo);
	const actorName = userInfo.user.Role.Role_Name;
	return (
		<>
			<h2 className="profileName d-md-none text-end text-white py-3">
				{actorName} Profile
			</h2>
			<div className="profileInfoContainer text-black my-5 d-flex justify-content-center align-items-center flex-column flex-md-row">
				<div>
					<ProfileImg profileData={userInfo.user} />
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center ms-md-5 ms-0">
					<div className="order-md-1 order-2 w-100">
						<ProfileUsername username={userInfo.user.UserName} />
					</div>
					<div className="order-md-2 order-1">
						<ProfileName
							firstName={userInfo.user.FirstName}
							lastname={userInfo.user.LastName}
						/>
					</div>
					<div className="order-md-3 order-3 w-100">
						<ProfileJobTitle userInfo={userInfo.user} actorName={actorName} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileInfoContainer;
