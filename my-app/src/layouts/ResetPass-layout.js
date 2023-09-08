import { Outlet } from "react-router-dom";
import "./resetPass.css";
import forgetPassImg from "../imgs/forget-pass-img.png";
import Logo from "../components/Logo";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ResetPassLayout = () => {
	const isLoading = useSelector((state) => state.passwordReset.loading);
	return (
		<div className="Auth ResetPass">
			<div className="container-fluid">
				<div className="position-absolute pt-2">
					<Logo />
				</div>

				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center leftSide">
						<div className="image overflow-hidden w-100 d-flex justify-content-center">
							<img className="img-fluid" src={forgetPassImg} alt="" />
						</div>
					</div>
					<div className="col-12 col-md-6 d-flex rightSide position-relative">
						<div className="container d-flex justify-content-center align-items-center flex-column">
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
