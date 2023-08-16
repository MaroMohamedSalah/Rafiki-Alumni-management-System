import { Link } from "react-router-dom";
import Logo from "./Logo";
const DashboardNav = ({ profileData }) => {
	const pic = `https://alumni-system-backend.azurewebsites.net/uploads/pictures/${profileData.Img}`;
	return (
		<div className="nav py-2">
			<div className="container-fluid">
				<div className="row">
					<div className="col-2">
						<Logo to={`/dashboard?username=${profileData.UserName}`} />
					</div>
					<div className="col-6  d-flex justify-content-center align-items-center">
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
					<div className="col-4 d-flex align-items-center justify-content-end">
						<div className="notification me" id="dashboard-notification">
							<i class="fa-solid fa-bell"></i>
						</div>
						<div className="dashProfile d-flex ms-3 align-items-center">
							<Link
								to={`/${profileData.Role.Role_Name.toLowerCase()}Profile`}
								className="profileImage rounded-5"
							>
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
