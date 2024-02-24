import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import ProfileInfoContainer from "../components/ProfileInfoContainer";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { updateUserInfo } from "../redux/actions/profileActions";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const ProfileLayout = () => {
	const sessionId = localStorage.getItem("sessionId");
	const userInfo = useSelector((state) => state.profile.userInfo);
	const [profileFetched, setProfileFetched] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [actorName, setActorName] = useState("");

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
					setActorName(data.user.Role.Role_Name);
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

	useEffect(() => {
		const isMobile = window.innerWidth <= 768;
		if (profileFetched) {
			const profileOverlay = document.querySelector(
				".profile .profile-overlay"
			);
			if (profileOverlay) {
				setTimeout(() => {
					isMobile
						? (profileOverlay.style.height = "230px")
						: (profileOverlay.style.height = "342px");
					document
						.querySelector(".profileInfoContainer")
						.classList.add("fade-up");
				}, 300);
			}
		}
	}, [profileFetched]);

	return (
		userInfo &&
		userInfo.user && (
			<div className={`${actorName}Profile profile`}>
				<div className="profile-overlay"></div>
				<div className="container pb-5 position-relative">
					<Logo to={`/dashboard?username=${userInfo.user.UserName}`} dark />

					<ProfileInfoContainer />
					<Outlet />
				</div>
			</div>
		)
	);
};

export default ProfileLayout;
