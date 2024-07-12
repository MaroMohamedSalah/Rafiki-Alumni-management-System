import { Button, Skeleton } from "@mui/material";
import logo from "../../imgs/logo-pic-light.png";

const CoursesDataPlaceholder = () => {
	const displayPlaceholders = () => {
		const placeholders = [];
		for (let index = 0; index < 12; index++) {
			placeholders.push(
				<div key={index} className="col-12 col-md-6 col-xl-4 position-relative">
					<div className="position-absolute w-100 top-0 start-0 "></div>
					<div className="course d-flex mb-3 px-3 py-4  z-1">
						<div className="row">
							<div className="w-25 me-3 d-flex flex-column justify-content-between align-items-center col-2">
								<div className="image mb-4">
									<img src={logo} alt="logo" className="img-fluid" />
								</div>
							</div>
							<div className="col d-flex flex-column justify-content-between align-items-start">
								<div>
									<h1 className="courseName">
										<Skeleton animation={"wave"} width={150} height={50} />
									</h1>
									<h5 className="doctorName d-flex align-items-center mb-3">
										<span className="text-bolder pe-1">Dr. </span>
										<Skeleton animation={"wave"} width={100} />
									</h5>
								</div>
								<div className="align-self-end">
									<Button variant="contained">View Details</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return placeholders;
	};

	return (
		<div className="CoursesDataPlaceholder CoursesData row">
			{displayPlaceholders()}
		</div>
	);
};

export default CoursesDataPlaceholder;
