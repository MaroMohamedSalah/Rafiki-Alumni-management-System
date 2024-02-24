import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Toast from "../Toast";
import { Backdrop, Button, CircularProgress } from "@mui/material/node";
import "./jobDetail.css";
import { readableDateString } from "../../utils/readableDateString";
import { displayJobSkills } from "../../utils/displayJobSkills";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch } from "react-redux";
import { handelSelectJobToSeeDetail } from "../../redux/actions/jobsActions";
import { baseBackendUrl } from "../../utils/baseBackendUrl";

const JobDetail = () => {
	const { jobId } = useParams();
	const [jobDetail, setJobDetail] = useState([]);
	const [loading, setLoading] = useState(false);
	const sessionId = localStorage.getItem("sessionId");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const getJobDetail = () => {
		setLoading(true);
		fetch(`${baseBackendUrl}/jobs/get-job-post/${jobId}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setJobDetail(data);
				}
			})
			.catch((err) => Toast({ title: "Try Again Later", icon: "error" }))
			.finally(() => setLoading(false));
	};

	const handelBack = () => {
		handelSelectJobToSeeDetail(dispatch, false);
	};

	useEffect(() => {
		getJobDetail();
	}, [jobId]);
	return (
		<div className="jobDetail shadow px-2 px-md-5 py-4">
			{loading ? (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open
					className="w-100"
					style={{ position: "absolute" }}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				jobDetail.length !== 0 && (
					<div className="row">
						<div className="col-12 d-flex justify-content-between">
							<h1 className="jobTitle">
								{jobDetail.Job_Title}{" "}
								<span>{jobDetail.isInternship && "(internship)"}</span>
							</h1>
							<div className="back d-lg-none" onClick={handelBack}>
								<ArrowBackIosNewIcon fontSize="medium" />
							</div>
						</div>
						<div className="col-12">
							<h6 className="text-black-50">
								<span>{jobDetail.Company_Name}</span> .{" "}
								<span>
									{jobDetail.Location} ({jobDetail.Job_Type})
								</span>
							</h6>
						</div>
						<div className="col-12">
							<ul className="list list-unstyled my-3">
								<li className="my-1 d-flex justify-content-start align-items-center">
									<WorkIcon className="icon me-2" fontSize="small" />
									{jobDetail.Job_Time}
								</li>
								<li className="my-1 justify-content-start align-items-center">
									<ApartmentIcon className="icon me-2" fontSize="small" />
									{jobDetail.Company_Size}
								</li>
								<li className="my-1 justify-content-start align-items-center">
									<GppGoodIcon className="icon me-2" fontSize="small" />
									Job poster joined Rafiki in{" "}
									{readableDateString(jobDetail.createdAt)}
								</li>
								<li className="skillList my-1 justify-content-start align-items-center">
									<ChecklistIcon className="icon me-2" fontSize="small" />
									Skills: {displayJobSkills(false, jobDetail.Job_Skills)}
								</li>
							</ul>
						</div>
						<div className="col-12">
							{jobDetail.External_Link === "" ? (
								<Button
									variant="contained"
									className="rounded-5 my-md-4 my-2 apply"
								>
									Easy Apply
								</Button>
							) : (
								<Link to={jobDetail.External_Link}>
									<Button
										variant="contained"
										className="rounded-5 my-md-4 my-2 apply"
									>
										Apply <ArrowOutwardIcon fontSize="small" className="ms-2" />
									</Button>
								</Link>
							)}
						</div>
						<div className="col-12 my-md-4 my-2 jobDescription">
							<h2 className="title">Job Description</h2>
							<p>{jobDetail.Description}</p>
						</div>
						<div className="col-12 my-md-4 my-2 jobReqs">
							<h2 className="title">Job Requirements</h2>
							<p>{jobDetail.Job_Requirements}</p>
						</div>
					</div>
				)
			)}
		</div>
	);
};
export default JobDetail;
