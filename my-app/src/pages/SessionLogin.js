import { useDispatch, useSelector } from "react-redux";
import { RedirectToLoginNotification } from "../components/RedirectToLoginNotification";
import { setProfile } from "../redux/actions/profileActions";
import { useEffect, useState } from "react";
import ProfileUsername from "../components/ProfileUsername";
import ProfileName from "../components/ProfileName";
import { Link, useNavigate } from "react-router-dom";

const SessionLogin = () => {
	const sessionId = localStorage.getItem("sessionId");
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Make API request and update profile in the Redux store
	const fetchProfileData = async () => {
		setLoading(true);
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
					setLoading(false);
				}
			}
		} catch (error) {
			console.log("Error while fetching profile data:", error);
		}
	};
	const handelLogin = () => {};
	const handelLogout = () => {
		fetch("https://alumni-system-backend.azurewebsites.net/api/users/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
		navigate("../");
	};
	useEffect(() => {
		fetchProfileData();
		console.log(userInfo);
	}, []);
	return (
		<div className="sessionLogin">
			<div className="container">
				<h1 className="position-absolute py-3">logo</h1>

				{userInfo && userInfo.user && (
					<div className="main py-4 py-md-5 d-flex justify-content-center align-items-center flex-column">
						<div className="profileImg shadow-lg mb-4">
							{loading === true ? (
								<h1>Loading..</h1>
							) : userInfo.user.Img ? (
								<img
									src={
										"https://alumni-system-backend.azurewebsites.net/uploads/pictures/" +
										userInfo.user.Img
									}
									alt="profile img"
									className="img-fluid"
								/>
							) : (
								<i class="fa-solid fa-user"></i>
							)}
						</div>
						<div>
							<ProfileName
								firstName={userInfo.user.FirstName}
								lastname={userInfo.user.LastName}
							/>

							<Link
								to={`/dashboard?username=${userInfo.user_name}`}
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
