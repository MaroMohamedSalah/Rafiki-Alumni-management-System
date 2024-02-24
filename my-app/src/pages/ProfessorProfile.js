import { useEffect, useState } from "react";
import Backbtn from "../components/Backbtn";
import ProfileAboutSec from "../components/ProfileAboutSec";
import ProfileCV from "../components/ProfileCV";
import ProfileContactInfoSec from "../components/ProfileContactInfoSec";
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
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../redux/actions/profileActions";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const ProfessorProfile = () => {
	const sessionId = localStorage.getItem("sessionId");
	const userInfo = useSelector((state) => state.userInfo);
	const [profileFetched, setProfileFetched] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Make API request and update user Info in the Redux store
	const fetchUserData = async () => {
		try {
			const response = await fetch(`${baseBackendUrl}/users`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			});

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
	// fetchUserData(sessionId, dispatch, navigate, setProfileFetched);

	useEffect(() => {
		if (!profileFetched) {
			fetchUserData();
			// fetchUserData(sessionId, dispatch, navigate, setProfileFetched);
		}
	}, [profileFetched]);
	return (
		<div className="ProfessorProfile profile">
			<div className="container">
				<Logo to={`/dashboard?username=${userInfo.user.UserName}`} />
				<div className="my-5 d-flex justify-content-center align-items-center">
					<div>
						<ProfileImg profileData={userInfo.user} />
					</div>
					<div className="d-flex flex-column justify-content-center align-items-center ms-5">
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
							<ProfileJobTitle />
						</div>
					</div>
				</div>

				<div className="row">
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
						<ProfilePersonalInfo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfessorProfile;
