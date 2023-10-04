import BadgeIcon from "@mui/icons-material/Badge";
import { InputAdornment, TextField } from "@mui/material/node";
const FirstnameInput = ({ firstNameError, setFirstNameError }) => {
	return (
		<div className="fname mb-3">
			<TextField
				id="fname"
				label="First Name"
				name="FirstName"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<BadgeIcon />
						</InputAdornment>
					),
				}}
				onChange={(e) => {
					// Trim the value
					let value = e.target.value.trim();

					// Capitalize the first letter
					value = value.charAt(0).toUpperCase() + value.slice(1);

					// Update the input value
					e.target.value = value;
					setFirstNameError("");
				}}
				variant="outlined"
				error={firstNameError !== ""}
				helperText={firstNameError}
				fullWidth
			/>
		</div>
	);
};

export default FirstnameInput;
