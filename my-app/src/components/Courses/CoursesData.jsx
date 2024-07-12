import logo from "../../imgs/logo-pic-light.png";
import Checkbox from "@mui/material/Checkbox";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {Button, Tooltip} from "@mui/material";
import CourseDetails from "./CourseDetails";
import {useState} from "react";

const CoursesData = ({fetchedCourses}) => {
	const [openDetails, setOpenDetails] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState(null);

	const handleCourseClick = (course) => {
		setOpenDetails(true);
		setSelectedCourse(course);
	};

	return (
		<>
			<div className="CoursesData row">
				{fetchedCourses.map((course) => {
					return (
						<div
							className="col-12 col-md-6 col-xl-4"
							key={course.courseId}
							id={`course-${course.courseId}`}
						>
							<div className="course d-flex mb-3 px-3 py-4">
								<div className="row">
									<div className="w-25 d-flex flex-column justify-content-between align-items-center col-2">
										<div className="image mb-4 me-3">
											<img src={logo} alt="logo" className="img-fluid" />
										</div>
										<div className="notificationIcon">
											<Tooltip title="Course Updates">
												<Checkbox
													size="medium"
													aria-label="Notification Checkbox"
													icon={<NotificationsNoneOutlinedIcon />}
													checkedIcon={<NotificationsActiveIcon />}
												/>
											</Tooltip>
										</div>
									</div>
									<div className="col-10 d-flex flex-column justify-content-between align-items-start">
										<div>
											<h1 className="courseName" title={course.courseName}>{course.courseName}</h1>
											<h5 className="doctorName text-white-50">
												{course.doctorName}
											</h5>
										</div>
										<div className="align-self-end">
											<Button variant="contained" onClick={() => handleCourseClick(course)}>View Details</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<CourseDetails setOpen={setOpenDetails} open={openDetails} course={selectedCourse} />
			</div>
		</>
	);
};

export default CoursesData;