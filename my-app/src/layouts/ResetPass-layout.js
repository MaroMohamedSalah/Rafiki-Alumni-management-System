import { Outlet, useNavigate } from "react-router-dom";
import "./resetPass.css";
import Logo from "../components/Logo";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton } from "@mui/material/node";

const ResetPassLayout = () => {
	const isLoading = useSelector((state) => state.passwordReset.loading);
	const navigate = useNavigate();
	return (
		<div className="Auth ResetPass">
			<div className="container-fluid">
				<div className="position-absolute pt-2">
					<IconButton
						color="inherit"
						className="backBtn"
						onClick={() => navigate("../")}
					>
						<ArrowBackSharpIcon />
					</IconButton>
				</div>

				<div className="row">
					<div className="col-12 col-lg-6 d-none d-md-flex justify-content-center align-items-center leftSide overflow-hidden">
						<div
							className="image overflow-hidden w-100 d-flex justify-content-center"
							style={{ height: "250px" }}
						>
							<Logo />
						</div>
					</div>
					<div className="col-12 col-lg-6 d-flex rightSide position-relative overflow-hidden">
						<div className="container d-flex justify-content-center align-items-center flex-column">
							<div className="position-absolute pt-2 backBtnMobile d-block d-md-none">
								<IconButton color="inherit" onClick={() => navigate("../")}>
									<KeyboardBackspaceIcon fontSize="large" />
								</IconButton>
							</div>
							<Outlet />
						</div>
						<Backdrop
							sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
							open={isLoading}
							className="w-100"
							style={{ position: "absolute" }} // Set the position to absolute
						>
							<CircularProgress color="inherit" />
						</Backdrop>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassLayout;
