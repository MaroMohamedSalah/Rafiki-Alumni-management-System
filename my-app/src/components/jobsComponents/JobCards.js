import { useEffect, useState, useRef } from "react";
import JobCard from "./JobCard";
import Toast from "../Toast";
import Lottie from "lottie-react";
import animationData from "../../animations/no_jobs_found.json";
import {
	handelSelectJobToSeeDetail,
	updateAllJobs,
} from "../../redux/actions/jobsActions";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material/node";
import { useNavigate } from "react-router-dom";
import { baseBackendUrl } from "../../utils/baseBackendUrl";

const JobCards = () => {
	const sessionId = localStorage.getItem("sessionId");
	const [loading, setLoading] = useState(false);
	const allJobs = useSelector((state) => state.jobs.availableJobs);
	const [page, setPage] = useState(0); // Start with page 0
	const [hasMore, setHasMore] = useState(true);
	const [selectedJob, setSelectedJob] = useState(0);

	const dispatch = useDispatch();
	const jobCardsRef = useRef(null);
	const navigate = useNavigate();

	const getJobs = (page) => {
		setLoading(true);
		fetch(`${baseBackendUrl}/jobs/get-job-posts?page=${page}&limit=5`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${sessionId}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					// Check if there are more pages to fetch
					if (data.length === 0) {
						setHasMore(false);
					} else {
						updateAllJobs(dispatch, [...allJobs, ...data]);
						setPage(page + 1);
					}
				}
			})
			.catch((err) => Toast({ title: err.message, icon: "error" }))
			.finally(() => setLoading(false));
	};

	const handleScroll = () => {
		const jobCards = jobCardsRef.current;
		if (
			jobCards &&
			jobCards.scrollTop + jobCards.clientHeight >=
				jobCards.scrollHeight - 20 && // You can adjust this value as needed
			hasMore
		) {
			// Load more jobs when user scrolls to the bottom
			getJobs(page);
		}
	};

	useEffect(() => {
		getJobs(page);
	}, []); // Load initial data when the component mounts

	useEffect(() => {
		allJobs.length !== 0 && navigate(`./${allJobs[selectedJob].Job_Id}`);
	}, [allJobs, navigate, selectedJob]);

	useEffect(() => {
		handelSelectJobToSeeDetail(dispatch, true);
	}, [dispatch, selectedJob]);
	return (
		<div
			className="jobCards shadow position-relative"
			ref={jobCardsRef}
			onScroll={handleScroll}
		>
			{loading ? (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open
					className="w-100"
					style={{ position: "absolute" }}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : allJobs.length !== 0 ? (
				allJobs.map((job, index) => (
					<JobCard
						active={index === selectedJob}
						key={index}
						jobTitle={job.Job_Title}
						companyName={job.Company_Name}
						logo={job.Company_Logo}
						companyLocation={job.Location}
						skills={job.Job_Skills}
						onClick={() => setSelectedJob(index)} // Pass the click handler to the card
					/>
				))
			) : (
				<Lottie
					loop={true}
					autoplay
					animationData={animationData}
					style={{ height: "190px" }}
				/>
			)}
		</div>
	);
};

export default JobCards;
