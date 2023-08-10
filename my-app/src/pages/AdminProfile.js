import { useEffect, useState } from "react";
import Backbtn from "../components/Backbtn";
import ProfileAboutSec from "../components/ProfileAboutSec";
import ProfileCV from "../components/ProfileCV";
import ProfileContactInfoSec from "../components/ProfileContactInfoSec";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../redux/actions/profileActions";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
const AdminProfile = () => {
	const dispatch = useDispatch();
	const sessionId = localStorage.getItem("sessionId");
	const profile = useSelector((state) => state.profile);
	const [profileFetched, setProfileFetched] = useState(false);
	const navigate = useNavigate();

	// Make API request and update profile in the Redux store
	const fetchUserData = async () => {
		try {
			const response = await fetch(
				"https://alumni-system-backend.azurewebsites.net/api/users",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionId}`,
					},
				}
			);

			if (response.status === 401) {
				// Redirect to login page
				RedirectToLoginNotification();
				navigate("/login");
			} else {
				const data = await response.json();
				if (data.success === true) {
					updateUserInfo(dispatch, data);
					setProfileFetched(true);
				}
			}
		} catch (error) {
			console.log("Error while fetching profile data:", error);
		}
	};

	useEffect(() => {
		if (!profileFetched) {
			fetchUserData();
		}
	}, [profileFetched]);
	return (
		profile &&
		profile.admin && (
			<div className="AdminProfile profile">
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
							<ProfileImg actor={"Admin"} profileData={profile.admin} />
						</div>
						<div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center align-items-md-start">
							<div className="order-md-1 order-2 w-100">
								<ProfileUsername username={profile.admin.UserName} />
							</div>
							<div className="order-md-2 order-1">
								<ProfileName
									firstName={profile.admin.FirstName}
									lastname={profile.admin.LastName}
								/>
							</div>
							<div className="order-md-3 order-3">
								<ProfileJobTitle />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-12 col-md-6">
							<ProfileURLsSec profileData={profile.admin} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileAboutSec aboutContent={profile.admin.About} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileContactInfoSec
								phonePram={profile.admin.Phone}
								emailPram={profile.admin.Email}
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
							<ProfilePersonalInfo countryPram={profile.admin.Country} />
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AdminProfile;
