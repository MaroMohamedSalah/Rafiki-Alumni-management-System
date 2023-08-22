import { useState } from "react";
import Logo from "./Logo";

const DashboardSidebar = ({ profileData }) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

	const handleTriggerClick = () => {
		setSidebarIsOpen(!sidebarIsOpen);
	};

	return (
		<div className={"sidebar"}>
			<div className="sidebar-container position-relative container-fluid py-3">
				<Logo to={`/dashboard?username=${profileData.UserName}`} />
			</div>
		</div>
	);
};

export default DashboardSidebar;
