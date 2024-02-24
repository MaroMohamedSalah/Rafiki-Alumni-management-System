import { useState } from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import DashboardSidebarBurgerIcon from "./DashboardSidebarBurgerIcon";
import DashboardSidebarList from "./DashboardSidebarList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseBackendUrl } from "../utils/baseBackendUrl";
const DashboardSidebar = ({ profileData }) => {
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);
	const isMobile = window.innerWidth <= 768;
	const navigate = useNavigate();
	const sessionId = localStorage.getItem("sessionId");

	const handelLogout = () => {
		Swal.fire({
			title: "Do you want to logout from ?",
			showDenyButton: true,
			confirmButtonText: "Logout",
			denyButtonText: `Cancel`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
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
							navigate("../login");
							localStorage.removeItem("sessionId");
						}
					})
					.catch((error) => console.log(error));
			} else if (result.isDenied) {
				Swal.fire("Changes are not saved", "", "info");
			}
		});
	};

	return (
		<div className={`sidebar ${sideBarIsOpen && "open"}`}>
			<div className="sidebar-container position-relative container-fluid py-3">
				<div
					className={`d-flex justify-content-${
						isMobile ? "between" : "center"
					} align-items-center w-100`}
				>
					<Logo to={`/dashboard?username=${profileData.UserName}`} />
					{isMobile && sideBarIsOpen && <DashboardSidebarBurgerIcon />}
				</div>

				<DashboardSidebarList
					isMobile={isMobile}
					isSidebarOpen={sideBarIsOpen}
				/>
				<div
					className="logout position-absolute"
					onClick={handelLogout}
					title="logout"
				>
					<i class="fa-solid fa-arrow-right-from-bracket"></i>
				</div>
			</div>
		</div>
	);
};

export default DashboardSidebar;
