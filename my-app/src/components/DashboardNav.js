import logo from "../imgs/dashboard-img.png";
const DashboardNav = ({ profileData }) => {
	const pic = `https://alumni-system-backend.azurewebsites.net/uploads/pictures/${profileData.Img}`;
	return (
		<div className="nav py-3">
			<div className="container-fluid">
				<div className="row">
					<div className="col-2">
						<div className="logo">
							<img src={logo} alt="" className="img-fluid" />
						</div>
					</div>
					<div className="col-6">
						<div className="search"></div>
					</div>
					<div className="col-4 d-flex align-items-center justify-content-end">
						<div className="notification me-2" id="dashboard-notification">
							<i class="fa-solid fa-bell"></i>
						</div>
						<div className="dashProfile d-flex ms-3 align-items-center">
							<div className="profileImage rounded-5">
								<img src={pic} alt="pic" className="img-fluid" />
							</div>
							<div className="username ms-3">
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
