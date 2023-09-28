export const readableDateString = (isoDateString) => {
	const date = new Date(isoDateString);

	// Format the date as a readable string
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		// hour: "numeric",
		// minute: "numeric",
		// second: "numeric",
		// timeZoneName: "short",
	};
	const readableDateString = date.toLocaleDateString(undefined, options);

	return readableDateString; // Example output: "September 26, 2023"
};
