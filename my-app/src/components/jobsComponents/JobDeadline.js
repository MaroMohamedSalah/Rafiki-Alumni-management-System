import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const JobDeadline = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const isMobile = window.innerWidth <= 768;
	return (
		<>
			{isMobile ? (
				<MobileDatePicker
					className="w-100"
					name="Application_Deadline"
					value={selectedDate}
					onChange={handleDateChange}
					format="DD/MM/YYYY"
				/>
			) : (
				<DesktopDatePicker
					className="w-100"
					label="Application Deadline (optional)"
					value={selectedDate} // Set the selected date
					onChange={handleDateChange} // Update selected date on change
					format="DD/MM/YYYY"
				/>
			)}
		</>
	);
};

export default JobDeadline;
