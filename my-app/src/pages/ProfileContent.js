import ProfileAboutSec from "../components/ProfileAboutSec";
import ProfileCV from "../components/ProfileCV";
import ProfileContactInfoSec from "../components/ProfileContactInfoSec";
import ProfileEdu from "../components/ProfileEdu";
import ProfileExperience from "../components/ProfileExperiece";
import ProfilePersonalInfo from "../components/ProfilePersonalInfo";
import ProfileSkills from "../components/ProfileSkills";
import ProfileURLsSec from "../components/ProfileURLsSec";
import { useSelector } from "react-redux";
import "./Profile.css";

const ProfileContent = () => {
	const userInfo = useSelector((state) => state.profile.userInfo);
	const actorName = userInfo.user.Role.Role_Name;
	return (
		<div className="ProfileContent">
			<div className="row">
				<div className="col-12 col-md-6">
					<ProfileURLsSec profileData={userInfo.user} />
				</div>

				<div className="col-12 col-md-6">
					<ProfileCV cv={userInfo.user.CV} actorName={actorName} />
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<ProfileAboutSec aboutContent={userInfo.user.About} />
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<ProfileContactInfoSec />
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<ProfileSkills />
				</div>
			</div>

			<div className="row">
				<div className="col-12">{/* <ProfileExperience /> */}</div>
			</div>

			{actorName !== "HR" && (
				<div className="row">
					<div className="col-12">{/* <ProfileEdu actor={"Alumni"} /> */}</div>
				</div>
			)}

			<div className="row">
				<div className="col-12">
					<ProfilePersonalInfo
						countryPram={userInfo.user.Country}
						birthPram={userInfo.user.Date_Of_Birth}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileContent;
