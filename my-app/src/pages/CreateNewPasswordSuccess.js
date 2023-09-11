import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../animations/animation_lmdvi48k.json";
import { Button } from "@mui/material/node";

const CreateNewPassSuccess = () => {
	const navigate = useNavigate();
	return (
		<div className="CreateNewPassSuccess pt-5">
			<div className="row">
				<div className="col-12 col-md-6 introText p-4 d-flex justify-content-center align-items-center flex-column">
					<h1 className="text-center text-md-start">Reset successful</h1>
					<p className="text-center text-md-start w-100">
						You can now log in to your account
					</p>
				</div>
				<div className="col-12 col-md-6">
					<Lottie
						loop={true}
						autoplay
						animationData={animationData}
						style={{ height: "250px" }}
						className="resetPassAnimation"
					/>
				</div>
			</div>

			<div className="submit text-center w-100 mt-5">
				<Button
					variant="contained"
					className="w-50 px-5"
					onClick={() => navigate("/Login")}
				>
					Login
				</Button>
			</div>
		</div>
	);
};

export default CreateNewPassSuccess;
