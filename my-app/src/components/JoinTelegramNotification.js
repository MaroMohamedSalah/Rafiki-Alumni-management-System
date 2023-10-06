import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Snackbar,
} from "@mui/material/node";
import { useEffect, useState } from "react";
import "./JoinTelegramNotification.css";

const JoinTelegramNotification = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleJoin = () => {
		setOpen(false);
		localStorage.setItem("joinTelegram", true);
		window.open("https://t.me/rafikijobs", "_blank"); // Open in a new tab/window
	};

	function SlideTransition(props) {
		return <Slide {...props} direction="up" />;
	}

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 3000);
	}, []);
	const isJoined = localStorage.getItem("joinTelegram");
	return (
		<div className="TelegramNotification">
			{!isJoined && (
				<Snackbar
					open={open}
					onClose={handleClose}
					TransitionComponent={SlideTransition}
					onClick={handleJoin}
					message="Click to Join our Telegram for job updates and more!"
					key={"Slide"}
					style={{ cursor: "pointer" }}
				/>
			)}
		</div>
		// <Dialog
		// 	open={open}
		// 	onClose={handleClose}
		// 	aria-labelledby="alert-dialog-title"
		// 	aria-describedby="alert-dialog-description"
		// >
		// 	<DialogTitle id="alert-dialog-title">
		// 		{"Join Our Telegram Channel"}
		// 	</DialogTitle>
		// 	<DialogContent>
		// 		<DialogContentText id="alert-dialog-description">
		// 			Stay updated with the latest job opportunities and career advice. Join
		// 			our Telegram channel today
		// 		</DialogContentText>
		// 	</DialogContent>
		// 	<DialogActions>
		// 		<Button onClick={handleClose}>Later</Button>
		// 		<Button onClick={handleJoin} autoFocus>
		// 			Join Now
		// 		</Button>
		// 	</DialogActions>
		// </Dialog>
	);
};

export default JoinTelegramNotification;
