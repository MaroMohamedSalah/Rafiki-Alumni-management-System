import { useState } from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";

const DashboardSidebar = ({ profileData }) => {
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);

	return (
		<div className={`sidebar ${sideBarIsOpen && "open"}`}>
			<div className="sidebar-container position-relative container-fluid py-3">
				<Logo to={`/dashboard?username=${profileData.UserName}`} />
			</div>
		</div>
	);
};

export default DashboardSidebar;
