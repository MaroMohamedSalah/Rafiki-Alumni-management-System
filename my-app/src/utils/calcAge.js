import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const calculateAge = (dateString) => {
	const currentDate = dayjs();
	const birthDate = dayjs(dateString, { format: "YYYY-MM-DD" });

	const years = currentDate.diff(birthDate, "year");
	birthDate.add(years, "year");

	const months = currentDate.diff(birthDate, "month");

	const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
	const monthText =
		months > 0 ? `${months - years * 12} month${months > 1 ? "s" : ""}` : "";

	let ageText = yearText;
	if (yearText && monthText) {
		ageText += ` and ${monthText}`;
	} else if (monthText) {
		ageText = monthText;
	}

	return `Age: ${ageText}`;
};
