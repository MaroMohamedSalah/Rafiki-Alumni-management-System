import dayjs from "dayjs";
import React, { useEffect, useState } from "react"; // Import useState
import { MobileDatePicker, DesktopDatePicker } from "@mui/x-date-pickers";

const DateOfBirthInput = ({
	dateOfBirthError,
	setDateOfBirthError,
	setDateOfBirth,
}) => {
	// Calculate the minimum date 16 years ago from today using dayjs
	const defaultDate = dayjs("2003-01-04");
	const maxSelect = dayjs().subtract(16, "year");

	// Function to handle date change
	const handleDateChange = (dateObject) => {
		if (dateObject) {
			// Extract year, month, and day from the date object
			const year = dateObject.$y;
			const month = dateObject.$M + 1; // Months are zero-indexed, so add 1
			const day = dateObject.$D;

			// Format the date as DD/MM/YYYY
			const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
				.toString()
				.padStart(2, "0")}`;

			// Set the formatted date
			setDateOfBirth(formattedDate);

			// Clear any previous error when a valid date is selected
			setDateOfBirthError("");
		} else {
			// No date selected, set an error message
			setDateOfBirth("");
			setDateOfBirthError("Date of birth is required.");
		}
	};

	// Function to calculate error message
	const calculateErrorMessage = () => {
		switch (dateOfBirthError) {
			case "maxDate":
			case "minDate":
				return "Your age must be at least 16 years.";

			case "invalidDate":
				return "Your date is not valid";

			case "emptyDate":
				return "Your date required";

			default:
				return "";
		}
	};

	// State to hold the error message
	const [errorMessage, setErrorMessage] = useState(calculateErrorMessage());

	useEffect(() => {
		// Update the error message when dateOfBirthError changes
		setErrorMessage(errorMessage);
	}, [dateOfBirthError]);

	// Determine whether to render the mobile or desktop date picker based on screen size
	const isMobile = window.innerWidth <= 768;

	return (
		<div className="mb-3">
			{isMobile ? (
				<MobileDatePicker
					className="w-100"
					name="DateOfBirth"
					label="Date Of Birth"
					onChange={handleDateChange}
					format="DD/MM/YYYY"
					// defaultValue={defaultDate}
					maxDate={maxSelect}
					slotProps={{
						textField: {
							helperText: dateOfBirthError, // Use errorMessage here
						},
					}}
					onError={(newError) => setDateOfBirthError(newError)}
				/>
			) : (
				<DesktopDatePicker
					className="w-100"
					name="DateOfBirth"
					label="Date Of Birth"
					onChange={handleDateChange}
					// defaultValue={defaultDate}
					maxDate={maxSelect}
					format="DD/MM/YYYY"
					slotProps={{
						textField: {
							helperText: dateOfBirthError, // Use errorMessage here
						},
					}}
					onError={(newError) => setDateOfBirthError(newError)}
				/>
			)}
		</div>
	);
};

export default DateOfBirthInput;
