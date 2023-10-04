import BadgeIcon from "@mui/icons-material/Badge";
import { InputAdornment, TextField } from "@mui/material/node";
const LastnameInput = ({ lastNameError, setLastNameError }) => {
	return (
		<div className="lname mb-3">
			<TextField
				id="lname"
				label="Last Name"
				name="LastName"
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
					setLastNameError("");
				}}
				variant="outlined"
				error={lastNameError !== ""}
				helperText={lastNameError}
				fullWidth
			/>
		</div>
	);
};

export default LastnameInput;
