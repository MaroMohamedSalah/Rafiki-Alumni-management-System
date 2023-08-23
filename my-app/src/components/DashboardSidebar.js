import { useState } from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import DashboardSidebarBurgerIcon from "./DashboardSidebarBurgerIcon";

const DashboardSidebar = ({ profileData }) => {
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);
	const isMobile = window.innerWidth <= 768;

	return (
		<div className={`sidebar ${sideBarIsOpen && "open"}`}>
			<div className="sidebar-container position-relative container-fluid py-3">
				<div className="d-flex justify-content-between align-items-center w-100">
					<Logo to={`/dashboard?username=${profileData.UserName}`} />
					{isMobile && sideBarIsOpen && <DashboardSidebarBurgerIcon />}
				</div>

				<ul className="sidebarList"></ul>
			</div>
		</div>
	);
};

export default DashboardSidebar;
