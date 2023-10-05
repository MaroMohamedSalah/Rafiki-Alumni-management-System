import { Checkbox, Divider } from "@mui/material/node";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WorkIcon from "@mui/icons-material/Work";
import "./jobCard.css";
import { useState } from "react"; // Import useState to manage selected state
import { displayJobSkills } from "../../utils/displayJobSkills";

const JobCard = ({
	jobTitle,
	logo,
	companyName,
	companyLocation,
	skills,
	onClick, // Add onClick prop
	active, // Add selected prop
}) => {
	const [isChecked, setIsChecked] = useState(false); // State to manage checkbox

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked); // Toggle checkbox state
	};

	const handleCardClick = () => {
		onClick(); // Invoke the onClick callback from props
	};

	return (
		<div
			className={`jobCard ${active ? "active" : ""}`} // Apply 'active' class based on selected prop
			onClick={handleCardClick} // Add click handler to the entire card
		>
			<div className="row p-3">
				<div className="col-3">
					<div className="companyLogo text-white">
						{logo ? (
							<img src={logo} alt="companyLogo" className="img-fluid" />
						) : (
							<WorkIcon fontSize="large" />
						)}
					</div>
				</div>
				<div className="jobInfo col-9 row">
					<div className="col-12">
						<h4 className="jobTitle mb-3">{jobTitle}</h4>
					</div>
					<div className="col-10 col-lg-8">
						<h5 className="companyName">{companyName}</h5>
						<p className="companyLocation text-black-50 mb-1">
							{companyLocation}
						</p>
						<p className="skillList text-black-50 mb-0">
							Skills:
							{displayJobSkills(true, skills)}
						</p>
					</div>
					<div className="col position-relative">
						<Checkbox
							className="position-absolute bottom-0 save"
							aria-label="save"
							icon={<BookmarkBorderIcon />}
							checkedIcon={<BookmarkIcon />}
							checked={isChecked} // Bind checkbox state
							onChange={handleCheckboxChange} // Handle checkbox change
						/>
					</div>
				</div>
			</div>
			<Divider className="bg-black" />
		</div>
	);
};

export default JobCard;
