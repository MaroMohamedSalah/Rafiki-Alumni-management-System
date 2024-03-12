import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./AdminUploadPopUp.module.css";
import Toast from "../Toast";

export default function AdminUploadPopUp({
	isOpen,
	onClose,
	userId,
	fileUrl,
	title,
	userName,
	courseName,
	userEmail,
	declineMaterial,
	acceptMaterial,
	materialID
}) {

	function declineToast(materialID) {
		setTimeout(() => {
			onClose();
		}, 300);
		Toast({
			title: `Material ${materialID} is rejected`,
			icon: "success",
		});
	}

	function declineBtn(materialID){
		declineToast(materialID);
		declineMaterial(materialID);
	}

	function acceptToast(materialID) {
		setTimeout(() => {
			onClose();
		}, 300);
		Toast({
			title: `Material ${materialID} is accepted`,
			icon: "success",
		});
	}

	function acceptBtn(materialID){
		acceptToast(materialID);
		acceptMaterial(materialID);
	}

	return (
		<div className="AdminUploadPopUp">
			<Dialog
				open={isOpen}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				className="m-auto col-lg-6 col-md-7 col-sm-12"
			>
				<DialogTitle id="alert-dialog-title" className={style.DialogTitle}>
					<h3>User Name : {userName}</h3>
					<h3>Email : {userEmail}</h3>
					<h3>User ID : {userId}</h3>
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						className={style.DialogContent + " mt-2"}
					>
						<div className="row text-center">
							<div className="col-md-12">
								<h5>Course name : {courseName}</h5>
							</div>
							<div className="col-md-12">
								<h5>Title : {title}</h5>
							</div>
						</div>
						<div className="col-md-12">
							<a href={fileUrl} className="text-decoration-none">
								<button className="btn d-block m-auto mt-1">Go To File</button>
							</a>
						</div>
						<hr className={style.editLine}></hr>
					</DialogContentText>

					<div className={style.bottomBtns}>
						<Button
							variant="contained"
							className={style.cancelBtn}
							onClick={()=>{declineBtn(materialID)}}
						>
							Decline
						</Button>
						<Button
							variant="contained"
							className={style.submitBtn}
							onClick={()=>{acceptBtn(materialID)}}
						>
							Accept
						</Button>
					</div>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	);
}
