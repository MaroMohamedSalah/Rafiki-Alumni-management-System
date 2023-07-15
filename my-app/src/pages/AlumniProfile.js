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
import { useDispatch } from "react-redux";
import "./Profile.css";
import GenerateCV from "../components/GenerateCV";
import { setProfile } from "../redux/actions/profileActions";
const AlumniProfile = () => {
	const dispatch = useDispatch();
	// Make API request
	const fetchProfileData = async () => {
		try {
			const response = await fetch(
				"https://alumni-system-backend.azurewebsites.net/api/users/get_alumni"
			);
			const data = await response.json();
			setProfile(dispatch, data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchProfileData();
	}, []);
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

				<div className="row mt-5">
					<div className="col-12 col-md-2">
						{/* <ProfileImg actor={"Alumni"} /> */}
					</div>
					<div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center align-items-md-start">
						<div className="order-md-1 order-2 w-100">
							{/* <ProfileUsername /> */}
						</div>
						<div className="order-md-2 order-1">{/* <ProfileName /> */}</div>
						<div className="order-md-3 order-3">
							{/* <ProfileJobTitle /> */}
						</div>
					</div>
					<div className="col-0 col-md-3 d-none d-md-block"></div>
					<div className="col-md-3 d-flex flex-row justify-content-end align-items-center">
						{/* <GenerateCV /> */}
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-6">{/* <ProfileURLsSec /> */}</div>

					<div className="col-12 col-md-6">{/* <ProfileCV /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfileAboutSec /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfileContactInfoSec /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfileSkills /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfileExperience /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfileEdu actor={"Alumni"} /> */}</div>
				</div>

				<div className="row">
					<div className="col-12">{/* <ProfilePersonalInfo /> */}</div>
				</div>
			</div>
		</div>
	);
};

export default AlumniProfile;
