import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material/node";
import {
	updateJobCompanyEmail,
	updateJobExternalLink,
} from "../../redux/actions/jobsActions";
import { useDispatch } from "react-redux";

const JobMethodSelection = ({ setApplyWith, applyWith }) => {
	const dispatch = useDispatch();
	const handelMethodChange = (e) => {
		setApplyWith(e.target.value);
		switch (applyWith) {
			case "WithExternalLink":
				updateJobCompanyEmail(dispatch, null);
				break;
			case "WithRafikiSystem":
				updateJobExternalLink(dispatch, null);
				break;

			default:
				break;
		}
	};
	return (
		<>
			<FormControl id="">
				<FormLabel id="demo-radio-buttons-group-label">
					How would you like to receive applications?
				</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
					onChange={(e) => handelMethodChange(e)}
					value={applyWith}
				>
					<FormControlLabel
						value="WithExternalLink"
						control={<Radio />}
						label="Receive applications via an external link"
					/>
					<FormControlLabel
						value="WithRafikiSystem"
						control={<Radio />}
						label="Receive applications via Rafiki (our system)"
					/>
				</RadioGroup>
			</FormControl>
		</>
	);
};

export default JobMethodSelection;
