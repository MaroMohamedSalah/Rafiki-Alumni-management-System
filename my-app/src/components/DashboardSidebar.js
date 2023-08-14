import { useState } from "react";

const DashboardSidebar = () => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

	const handleTriggerClick = () => {
		setSidebarIsOpen(!sidebarIsOpen);
	};

	return (
		<div
			className={`px-2 pb-3 sidebar ${sidebarIsOpen ? "open col-2" : "col-1"}`}
		>
			<div className="sidebar-container position-relative container-fluid py-3">
				<div
					className="sidebarTrigger position-absolute"
					onClick={handleTriggerClick}
				>
					<i className="fa-solid fa-bars"></i>
				</div>
			</div>
		</div>
	);
};

export default DashboardSidebar;
