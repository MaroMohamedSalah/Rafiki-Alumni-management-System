import { TextField } from "@mui/material/node";

const JobExternalLinkInput = () => {
	return (
		<TextField
			id="outlined-textarea "
			label="External Apply Link"
			placeholder="Insert the link that you need to receive applications in"
			fullWidth
			name="External_Link"
			// helperText={
			// 	isFieldMissing("External_Link") && "Application Link Is Required"
			// }
			// error={isFieldMissing("External_Link")}
		/>
	);
};

export default JobExternalLinkInput;
