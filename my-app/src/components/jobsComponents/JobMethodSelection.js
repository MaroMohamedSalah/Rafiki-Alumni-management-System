import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material/node";

const JobMethodSelection = ({ setApplyWith, applyWith }) => {
	return (
		<>
			<FormControl id="">
				<FormLabel id="demo-radio-buttons-group-label">
					How would you like to receive applications?
				</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
					onChange={(e) => setApplyWith(e.target.value)}
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
