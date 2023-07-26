import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginRedirectNotification = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});

		Toast.fire({
			icon: "error",
			title: "Please Login",
		});

		navigate("/login");
	}, [navigate]);

	return null; // This component doesn't render anything; it's used for side effects only.
};

export default LoginRedirectNotification;
