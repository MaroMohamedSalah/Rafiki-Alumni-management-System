import { useEffect, useState } from "react";
import SessionLogin from "../pages/SessionLogin";
import Login from "../pages/Login";
import { PuffLoader } from "react-spinners";

const LoginLayout = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const sessionId = localStorage.getItem("sessionId");
	const [isLoading, setIsLoading] = useState(true);

	const checkSession = () => {
		fetch(
			"https://alumni-system-backend.azurewebsites.net/api/users/is_logged_in",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${sessionId}`,
				},
			}
		)
			.then((res) => {
				if (res.status === 200) {
					// The user is logged in
					setIsLoggedIn(true);
				} else if (res.status === 401) {
					// The user is not logged in
					setIsLoggedIn(false);
				} else {
					// Handle other status codes if needed
				}
				setIsLoading(false); // Regardless of the result, loading is finished
				return res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.error(err);
				setIsLoggedIn(false); // Handle errors, consider the user as not logged in
				setIsLoading(false); // Loading is finished even in case of an error
			});
	};

	useEffect(() => {
		checkSession();
	}, []);
	return (
		<div className="LoginLayout">
			{isLoading ? (
				<div className="overlay">
					<PuffLoader color="rgb(54 181 215)" size={112} />
				</div>
			) : isLoggedIn ? (
				<SessionLogin />
			) : (
				<Login />
			)}
		</div>
	);
};

export default LoginLayout;