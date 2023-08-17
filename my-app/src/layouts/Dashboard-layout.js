import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DashboardNav from "../components/DashboardNav";
import "animate.css";
import DashboardSidebar from "../components/DashboardSidebar";
import Loading from "../components/Loading";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
	const [userInfo, setUserInfo] = useState();
	const sessionId = localStorage.getItem("sessionId");
	const navigate = useNavigate();
	// Make API request and update profile in the Redux store
	const fetchProfileData = async () => {
		try {
			const response = await fetch(
				"https://alumni-system-backend.azurewebsites.net/api/users/",
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
					setUserInfo(data);
				}
			}
		} catch (error) {
			console.log("Error while fetching profile data:", error);
		}
	};
	useEffect(() => {
		fetchProfileData();
	}, []);
	return (
		<div className="Dashboard">
			{userInfo && userInfo.user ? (
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<DashboardNav profileData={userInfo.user} />
						</div>

						<DashboardSidebar />

						<div className="col px-2 content">
							<div className="content-container"></div>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default DashboardLayout;
