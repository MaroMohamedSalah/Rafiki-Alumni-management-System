import { Checkbox, Divider } from "@mui/material/node";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WorkIcon from "@mui/icons-material/Work";
import "./jobCard.css";

const JobCard = ({
	jobTitle,
	logo,
	companyName,
	companyLocation,
	skills,
	key,
}) => {
	return (
		<div className="jobCard" key={key}>
			<div className="row py-3 px-2">
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
					<div className="col-8">
						<h5 className="companyName">{companyName}</h5>
						<p className="companyLocation text-black-50 mb-1">
							{companyLocation}
						</p>
						<p className="skills text-black-50 mb-0">HTML . CSS ...</p>
					</div>
					<div className="col position-relative">
						<Checkbox
							className="position-absolute bottom-0"
							aria-label="save"
							icon={<BookmarkBorderIcon />}
							checkedIcon={<BookmarkIcon />}
						/>
					</div>
				</div>
			</div>
			<Divider className="bg-black" />
		</div>
	);
};

export default JobCard;
