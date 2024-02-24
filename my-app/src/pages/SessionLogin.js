import { useEffect, useState } from "react";
import ProfileName from "../components/ProfileName";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { baseBackendUrl } from "../utils/baseBackendUrl";

const SessionLogin = () => {
	const sessionId = localStorage.getItem("sessionId");
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Make API request and update profile in the Redux store
	const fetchProfileData = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${baseBackendUrl}/users/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			});

			if (response.status === 401) {
			} else {
				const data = await response.json();
				if (data.success === true) {
					setUserInfo(data);
					console.log("data", data);
					setLoading(false);
				}
			}
		} catch (error) {
			console.log("Error while fetching profile data:", error);
		}
	};
	const handelLogout = () => {
		fetch(`${baseBackendUrl}/auth/logout`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
				"Demo-Code": "demo2023",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					localStorage.removeItem("sessionId");
					navigate("../");
				}
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		fetchProfileData();
	}, []);
	return (
		<div className="sessionLogin">
			<div className="container">
				<h1 className="position-absolute py-3">
					<Logo />
				</h1>

				{userInfo && userInfo.user && (
					<div className="main py-4 py-md-5 d-flex justify-content-center align-items-center flex-column">
						<div className="profileImg shadow-lg mb-4">
							{loading === true ? (
								<h1>Loading..</h1>
							) : userInfo.user.Img ? (
								<img
									src={userInfo.user.Img}
									alt="profile img"
									className="img-fluid"
								/>
							) : (
								<i class="fa-solid fa-user"></i>
							)}
						</div>
						<div className="userInfoContainer">
							<ProfileName
								firstName={userInfo.user.FirstName}
								lastname={userInfo.user.LastName}
							/>

							<Link
								to={`/dashboard?username=${userInfo.user.UserName}`}
								className="btn rounded-5 loginBtn mt-4 w-100"
							>
								Log In
							</Link>
							<button
								className="btn rounded-5 logoutBtn mt-4 w-100 btn-danger"
								onClick={handelLogout}
							>
								Log Out
							</button>

							<div className="createNew mt-5 w-100 text-center">
								<Link to={"/getStarted"}>Create New Account</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SessionLogin;
