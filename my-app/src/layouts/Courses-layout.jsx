import { useEffect, useState } from "react";
import "./courses.css";
import { baseBackendUrl } from "../utils/baseBackendUrl";
import Toast from "../components/Toast";
import CoursesData from "../components/Courses/CoursesData";
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
				<div className="search"></div>
				<div className="result">
					<CoursesData fetchedCourses={courses} />
				</div>
			</div>
		</div>
	);
};

export default CoursesLayout;
