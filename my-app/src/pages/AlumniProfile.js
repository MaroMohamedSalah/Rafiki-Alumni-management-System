import Backbtn from "../components/Backbtn";
import ProfileAboutSec from "../components/ProfileAboutSec";
import ProfileContactInfoSec from "../components/ProfileContactInfoSec";
import ProfileEditBtn from "../components/ProfileEditBtn";
import ProfileImg from "../components/ProfileImg";
import ProfileJobTitle from "../components/ProfileJobTitle";
import ProfileName from "../components/ProfileName";
import ProfileURLsSec from "../components/ProfileURLsSec";
import ProfileUsername from "../components/ProfileUsername";
import "./Profile.css";
const AlumniProfile = () => {
	return (
		<div className="AlumniProfile profile">
			<div className="container">
				<Backbtn
					btnColor={"var(--Alumni-color)"}
					btnSize={"19px"}
					btnTop={"10px"}
					btnColorMobile={"var(--Alumni-color)"}
					btnSizeMobile={"19px"}
					btnTopMobile={"10px"}
				/>

				<div className="row">
					<div className="col-12 col-md-2">
						<ProfileImg />
					</div>
					<div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center align-items-md-start">
						<div className="order-md-1 order-2">
							<ProfileUsername />
						</div>
						<div className="order-md-2 order-1">
							<ProfileName />
						</div>
						<div className="order-md-3 order-3">
							<ProfileJobTitle />
						</div>
					</div>
					<div className="col-0 col-md-4 d-none d-md-block"></div>
					<div className="col-md-2 d-flex flex-column justify-content-center align-items-end">
						<ProfileEditBtn />
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-6">
						<ProfileURLsSec />
					</div>
					<div className="col-12 col-md-6">
						<ProfileURLsSec />
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<ProfileAboutSec />
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<ProfileContactInfoSec />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlumniProfile;
