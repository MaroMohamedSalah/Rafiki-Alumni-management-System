import { useEffect, useState } from "react";
import Backbtn from "../components/Backbtn";
import ProfileAboutSec from "../components/ProfileAboutSec";
import ProfileCV from "../components/ProfileCV";
import ProfileContactInfoSec from "../components/ProfileContactInfoSec";
import ProfileEditBtn from "../components/ProfileEditBtn";
import ProfileEdu from "../components/ProfileEdu";
import ProfileExperience from "../components/ProfileExperiece";
import ProfileImg from "../components/ProfileImg";
import ProfileJobTitle from "../components/ProfileJobTitle";
import ProfileName from "../components/ProfileName";
import ProfilePersonalInfo from "../components/ProfilePersonalInfo";
import ProfileSkills from "../components/ProfileSkills";
import ProfileURLsSec from "../components/ProfileURLsSec";
import ProfileUsername from "../components/ProfileUsername";
import "./Profile.css";
import GenerateCV from "../components/GenerateCV";
import { setProfile } from "../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { useNavigate } from "react-router-dom";
const StudentProfile = () => {
	const dispatch = useDispatch();
	const sessionId = localStorage.getItem("sessionId");
	const profile = useSelector((state) => state.profile);
	const [profileFetched, setProfileFetched] = useState(false);
	const navigate = useNavigate();

	// Make API request and update profile in the Redux store
	const fetchProfileData = async () => {
		try {
			const response = await fetch(
				"https://alumni-system-backend.azurewebsites.net/api/users/get_student",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionId}`,
					},
				}
			);
			if (response.status === 401) {
				// Redirect to the login page
				RedirectToLoginNotification();
				navigate("/login");
			} else {
				const data = await response.json();
				if (data.success === true) {
					// Dispatch the action to update the profile in the Redux store
					setProfile(dispatch, data);
					setProfileFetched(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!profileFetched) {
			fetchProfileData();
		}
	}, [profileFetched]);
	return (
		profile &&
		profile.student && (
			<div className="StudentProfile profile">
				<div className="container">
					<Backbtn
						btnColor={"var(--Alumni-color)"}
						btnSize={"19px"}
						btnTop={"10px"}
						btnColorMobile={"var(--Alumni-color)"}
						btnSizeMobile={"19px"}
						btnTopMobile={"10px"}
					/>

					<div className="row mt-5">
						<div className="col-12 col-md-2">
							<ProfileImg actor={"Student"} profileData={profile.student} />
						</div>
						<div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center align-items-md-start">
							<div className="order-md-1 order-2 w-100">
								<ProfileUsername username={profile.student.UserName} />
							</div>
							<div className="order-md-2 order-1">
								<ProfileName
									firstName={profile.student.FirstName}
									lastname={profile.student.LastName}
								/>
							</div>
							<div className="order-md-3 order-3">
								<ProfileJobTitle />
							</div>
						</div>
						<div className="col-0 col-md-3 d-none d-md-block"></div>
						<div className="col-md-3 d-flex flex-row justify-content-end align-items-center">
							<GenerateCV />
						</div>
					</div>

					<div className="row">
						<div className="col-12 col-md-6">
							<ProfileURLsSec profileData={profile.student} />
						</div>

						<div className="col-12 col-md-6">
							<ProfileCV cv={profile.student.CV} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileAboutSec aboutContent={profile.student.About} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileContactInfoSec
								phonePram={profile.student.Phone}
								emailPram={profile.student.Email}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileSkills />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileExperience />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileEdu actor={"Student"} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfilePersonalInfo countryPram={profile.student.Country} />
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default StudentProfile;
