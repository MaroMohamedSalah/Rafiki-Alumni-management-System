import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateDashboardSidebar } from "../redux/actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";

const DashboardSidebarList = ({ isMobile, isSidebarOpen }) => {
	const [activeItem, setActiveItem] = useState("");
	const [showSuperFSubItems, setShowSuperFSubItems] = useState(false);
	const [expandedItem, setExpandedItem] = useState(null);

	const actorName = useSelector(
		(state) => state.profile.userInfo.user.Role.Role_Name
	);
	const dispatch = useDispatch();

	const alumniFeatures = [
		{
			title: "Jobs",
			icon: "fa-solid fa-laptop",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Apply For A Job",
					icon: "fa-regular fa-share-from-square",
					link: "applyJob",
				},
				{
					title: "Application State",
					icon: "fa-regular fa-handshake",
					link: "jobsApplications",
				},
			],
		},
		// {
		// 	title: "Professors Profiles",
		// 	icon: "fa-solid fa-circle-user",
		// 	link: "#",
		// },
		{
			title: "FAQ",
			icon: "fa-solid fa-question",
			link: "#",
		},
		// {
		// 	title: "Ask Admin",
		// 	icon: "fa-solid fa-paper-plane",
		// 	link: "#",
		// },
		{
			title: "Feedback",
			icon: "fa-solid fa-face-grin-wide",
			link: "#",
		},

		// Add more items as needed
	];
	const studentFeatures = [
		// {
		// 	title: "Discussion",
		// 	icon: "fa-solid fa-comment",
		// 	link: "#",
		// },
		{
			title: "Jobs",
			icon: "fa-solid fa-laptop",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Apply For A Job",
					icon: "fa-regular fa-share-from-square",
					link: "applyJob",
				},
				{
					title: "Application State",
					icon: "fa-regular fa-handshake",
					link: "jobsApplications",
				},
			],
		},
		{
			title: "Materials",
			icon: "fa-solid fa-file-pdf",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Courses",
					icon: "fa-solid fa-file-pdf",
					link: "courses",
				},
				{
					title: "Upload Materials",
					icon: "fa-solid fa-upload",
					link: "uploadMaterial",
				},
			],
		},

		// {
		// 	title: "Professors Profiles",
		// 	icon: "fa-solid fa-circle-user",
		// 	link: "#",
		// },
		// {
		// 	title: "FAQ",
		// 	icon: "fa-solid fa-question",
		// 	link: "#",
		// },
		// {
		// 	title: "Ask Admin",
		// 	icon: "fa-solid fa-paper-plane",
		// 	link: "#",
		// },
		{
			title: "Feedback",
			icon: "fa-solid fa-face-grin-wide",
			link: "#",
		},
		// Add more items as needed
	];

	const hrFeatures = [
		{
			title: "Jobs",
			icon: "fa-solid fa-laptop",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Post Job",
					icon: "fa-solid fa-plus",
					link: "postJob",
				},
				{
					title: "Post Internship",
					icon: "fa-solid fa-plus",
					link: "postIntern",
				},
				{
					title: "Jobs Applications",
					icon: "fa-regular fa-handshake",
					link: "jobsApplications",
				},
			],
		},
		{
			title: "FAQ",
			icon: "fa-solid fa-question",
			link: "#",
		},
		{
			title: "Feedback",
			icon: "fa-solid fa-face-grin-wide",
			link: "#",
		},
		// Add more items as needed
	];

	const adminFeatures = [
		{
			title: "Jobs",
			icon: "fa-solid fa-laptop",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Post Job",
					icon: "fa-solid fa-plus",
					link: "postJob",
				},
				{
					title: "Post Internship",
					icon: "fa-solid fa-plus",
					link: "postIntern",
				},
				{
					title: "Jobs Applications",
					icon: "fa-regular fa-handshake",
					link: "jobsApplications",
				},
			],
		},
		{
			title: "Feedback",
			icon: "fa-solid fa-face-grin-wide",
			link: "#",
		},
		{
			title: "Materials",
			icon: "fa-solid fa-file-pdf",
			link: "#",
			type: "super",
			subItems: [
				{
					title: "Upload Materials",
					icon: "fa-solid fa-plus",
					link: "uploadMaterial",
				},
				{
					title: "Add Course",
					icon: "fa-solid fa-add",
					link: "addCourse",
				},
				{
					title: "Manage Materials",
					icon: "fa-solid fa-add",
					link: "AdminAcceptingMaterials",
				},
			],
		},
		// Add more items as needed
	];

	const handleSidebarItemClick = (item) => {
		if (expandedItem === item.title) {
			setExpandedItem(null); // Close the sub-items if they are already open
		} else {
			setExpandedItem(item.title); // Expand the sub-items of the clicked item
		}
		setActiveItem(item.title); // Set the clicked item as active
	};

	let features = [];
	if (actorName) {
		switch (actorName) {
			case "Alumni":
				features = alumniFeatures;
				break;
			case "HR":
				features = hrFeatures;
				break;
			case "Student":
				features = studentFeatures;
				break;
			case "Admin":
				features = adminFeatures;
				break;
			default:
				break;
		}
	}

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

				{item.type === "super" &&
					item.title === expandedItem &&
					isSidebarOpen && (
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
		<ul className={`sidebarList w-100 p-3 ${!isSidebarOpen && "close"}`}>
			{generateSidebarItems(features)}
		</ul>
	);
};

export default DashboardSidebarList;
