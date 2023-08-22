import { Link } from "react-router-dom";
import { updateDashboardSidebar } from "../redux/actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const DashboardNav = ({ profileData }) => {
	const pic = `https://alumni-system-backend.azurewebsites.net/uploads/pictures/${profileData.Img}`;
	const dispatch = useDispatch();
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);

	const handelSidebarTrigger = () => {
		if (sideBarIsOpen) {
			updateDashboardSidebar(dispatch, false);
		} else {
			updateDashboardSidebar(dispatch, true);
		}
	};

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
						<div className="burgerIcon open" onClick={handelSidebarTrigger}>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
					<div className="col-6 d-md-flex d-none justify-content-center align-items-center">
						<form class="d-flex w-75" role="search">
							<input
								class="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button class="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>
					</div>
					<div className="col d-flex align-items-center justify-content-end">
						<div className="notification me" id="dashboard-notification">
							<i class="fa-solid fa-bell"></i>
						</div>
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
