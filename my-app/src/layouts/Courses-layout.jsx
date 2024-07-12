import {useEffect, useState} from "react";
import "./courses.css";
import {baseBackendUrl} from "../utils/baseBackendUrl";
import Toast from "../components/Toast";
import CoursesData from "../components/Courses/CoursesData";
import CoursesDataPlaceholder from "../components/Courses/CoursesDataPlaceholder";
import {Box, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const CoursesLayout = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);
	const sessionId = localStorage.getItem("sessionId");

	const fetchCourses = (nameSearch) => {
		setLoading(true);
		fetch(
			`${baseBackendUrl}/courses/${nameSearch ? "name/" + nameSearch : ""}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${sessionId}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setCourses(data.Courses);
				}
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchCourses();
	}, []);
	return (
		<div className="CoursesLayout">
			<div className="container">
				<div className="search py-3">
					<Box sx={{display: "flex", alignItems: "flex-end"}}>
						<SearchIcon />
						<TextField
							className="w-25"
							label="Search With Course Name"
							variant="standard"
							onChange={(e) => fetchCourses(e.target.value)}
						/>
					</Box>
				</div>
				<div className="result">
					{loading ? (
						<CoursesDataPlaceholder />
					) : (
						<CoursesData fetchedCourses={courses} />
					)}
				</div>
			</div>
		</div>
	);
};

export default CoursesLayout;
