import React from "react";
import { useDispatch } from "react-redux";
import { MobileDatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import { updateJobDeadline } from "../../redux/actions/jobsActions";

const JobDeadline = () => {
	// Redux dispatch function
	const dispatch = useDispatch();

	// Function to handle date change
	const handleDateChange = (date) => {
		if (date) {
			// Dispatch the action to update the selected date in Redux
			const formattedDate = `${date.$y}-${date.$M + 1}-${date.$D}`;
			updateJobDeadline(dispatch, formattedDate);
		} else {
			updateJobDeadline(dispatch, null);
		}
	};

	// Determine whether to render the mobile or desktop date picker based on screen size
	const isMobile = window.innerWidth <= 768;

	return (
		<>
			{isMobile ? (
				<MobileDatePicker
					className="w-100"
					name="Application_Deadline"
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
			) : (
				<DesktopDatePicker
					className="w-100"
					label="Application Deadline (optional)"
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
			)}
		</>
	);
};

export default JobDeadline;
