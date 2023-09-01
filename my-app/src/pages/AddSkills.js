import { useState } from "react";
import BackToProfileBtn from "../components/BackToProfileBtn";
import ProfileSkills from "../components/ProfileSkills";
import { Rating, Slider, TextField, Typography } from "@mui/material";

const AddSkills = () => {
	const [value, setValue] = useState(2);
	return (
		<div className="addSkills">
			<div className="container">
				<BackToProfileBtn />
			</div>
			<ProfileSkills />

			<div className="title w-100 text-center py-4 fs-1 fw-bold">Add Skill</div>
			<div className="row">
				<div className="col-12 col-md-8">
					<TextField
						id="standard-basic"
						label="Skill name"
						variant="standard"
						fullWidth
					/>
				</div>
				<div className="col-12 col-md-3">
					<Typography component="legend">Rate</Typography>
					<Rating
						name="simple-controlled"
						value={value}
						size="large"
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default AddSkills;
