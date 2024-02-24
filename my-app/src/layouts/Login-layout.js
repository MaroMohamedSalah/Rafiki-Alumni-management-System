import { useEffect, useState } from "react";
import SessionLogin from "../pages/SessionLogin";
import Login from "../pages/Login";
import { PuffLoader } from "react-spinners";
import Loading from "../components/Loading";

const LoginLayout = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const sessionId = localStorage.getItem("sessionId");
	const [isLoading, setIsLoading] = useState(true);

	const checkSession = () => {
		fetch("${baseBackendUrl}/auth/status", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${sessionId}`,
				"Demo-Code": "demo2023",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					// The user is logged in
					setIsLoggedIn(true);
				} else if (res.status === 401) {
					// The user is not logged in
					setIsLoggedIn(false);
					localStorage.removeItem("sessionId");
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
			{isLoading ? <Loading /> : isLoggedIn ? <SessionLogin /> : <Login />}
		</div>
	);
};

export default LoginLayout;
