import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DashboardSidebarBurgerIcon from "./DashboardSidebarBurgerIcon";
import SearchBar from "./SearchBar";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
const DashboardNav = ({ profileData }) => {
	const pic = profileData.Img;
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);
	const isMobile = window.innerWidth <= 768;

	useEffect(() => {
		const burgerIcon = document.querySelector(".burgerIcon");

		sideBarIsOpen
			? burgerIcon.classList.add("open")
			: burgerIcon.classList.remove("open");
	}, [sideBarIsOpen]);
	return (
		<div className="nav py-2">
			<div className="container-fluid">
				<div className="row">
					<div className="col-2 d-flex align-items-center">
						{(!isMobile || !sideBarIsOpen) && <DashboardSidebarBurgerIcon />}
					</div>
					<div
						className={`col-6 d-lg-flex d-none justify-content-center align-items-center ${
							sideBarIsOpen ? "d-none" : ""
						}`}
					>
						<SearchBar />
					</div>
					<div className="col d-flex align-items-center justify-content-end">
						<Badge badgeContent={4} invisible={false} size="small">
							<NotificationsIcon fontSize="small" className="notification me" />
						</Badge>
						<div className="dashProfile d-flex ms-3 align-items-center">
							<Link to={"/profile"} className="profileImage rounded-5">
								{profileData.Img ? (
									<img src={pic} alt="pic" className="img-fluid" />
								) : (
									<i class="fa-solid fa-user"></i>
								)}
							</Link>

							<div className="username ms-1">
								<h2>
									<div className="d-inline icon">👋</div> Hi,{" "}
									{profileData.UserName}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardNav;
