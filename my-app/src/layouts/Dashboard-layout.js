import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DashboardSlider from "../components/DashboardSlider";
import DashboardNav from "../components/DashboardNav";
import "animate.css";

const DashboardLayout = () => {
	const [userInfo, setUserInfo] = useState();
	const sessionId = localStorage.getItem("sessionId");
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
				// RedirectToLoginNotification();
				// navigate("/login");
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
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						{userInfo && userInfo.user && (
							<DashboardNav profileData={userInfo.user} />
						)}
					</div>

					<DashboardSlider />

					<div className="col pt-4 px-2 content">
						<div className="content-container"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
