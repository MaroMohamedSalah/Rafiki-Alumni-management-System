import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateDashboardSidebar } from "../redux/actions/dashboardActions";
import { useDispatch } from "react-redux";

const DashboardSidebarList = ({ isMobile, isSidebarOpen }) => {
	const [activeItem, setActiveItem] = useState("");
	const [showSuperFSubItems, setShowSuperFSubItems] = useState(false);
	const dispatch = useDispatch();

	const sidebarItems = [
		{
			title: "Test",
			icon: "fa-solid fa-laptop",
			link: "#",
		},
		{
			title: "Jobs",
			icon: "fa-solid fa-laptop",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Post Job",
					icon: "fa-solid fa-plus",
					link: "#",
				},
				{
					title: "Apply For A Job",
					icon: "fa-regular fa-share-from-square",
					link: "#",
				},
				{
					title: "Application State",
					icon: "fa-regular fa-handshake",
					link: "#",
				},
			],
		},
		// Add more items as needed
	];

	const handleSidebarItemClick = (item) => {
		setActiveItem(item.title);
		if (item.type === "super" && isSidebarOpen) {
			setShowSuperFSubItems(!showSuperFSubItems);
		} else if (item.type === "super" && !isSidebarOpen) {
			updateDashboardSidebar(dispatch, "true");
			setShowSuperFSubItems(!showSuperFSubItems);
		} else {
			setShowSuperFSubItems(false);
		}
	};

	const generateSidebarItems = (items) => {
		return items.map((item, index) => (
			<div key={index}>
				<Link to={item.link}>
					<li
						className={`d-flex justify-content-${
							isSidebarOpen ? "start" : "center"
						} align-items-center py-3 ${
							activeItem === item.title ? "active" : ""
						}`}
						onClick={() => handleSidebarItemClick(item)}
					>
						<div className={`icon ${isSidebarOpen && "me-4"}`}>
							<i className={item.icon}></i>
						</div>
						{isSidebarOpen && <div className="title">{item.title}</div>}
					</li>
				</Link>
				{item.type === "super" && showSuperFSubItems && isSidebarOpen && (
					<ul className="subF p-0">
						{item.subItems.map((subItem, subIndex) => (
							<Link key={subIndex} to={subItem.link}>
								<li
									className={`d-flex justify-content-start align-items-center subF py-3 ps-4 ${
										activeItem === subItem.title ? "active" : ""
									}`}
									onClick={() => setActiveItem(subItem.title)}
								>
									<div className={`icon me-4`}>
										<i className={subItem.icon}></i>
									</div>
									<div className="title">{subItem.title}</div>
								</li>
							</Link>
						))}
					</ul>
				)}
			</div>
		));
	};

	return (
		<ul
			className={`sidebarList w-${isMobile ? "100 p-0" : "75"} ${
				!isSidebarOpen && "close"
			}`}
		>
			{generateSidebarItems(sidebarItems)}
		</ul>
	);
};

export default DashboardSidebarList;
