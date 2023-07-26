import Swal from "sweetalert2";

export const RedirectToLoginNotification = () => {
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

	return Toast.fire({
		icon: "error",
		title: "Your session has expired. Please log in again.",
	});
};
