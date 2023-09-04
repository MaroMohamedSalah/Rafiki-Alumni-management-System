import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const ProfileName = ({ firstName, lastname }) => {
	return (
		<h1 className="name text-center text-white">
			{firstName === null || lastname === null ? (
				<Skeleton animation="wave" width={"100%"} />
			) : (
				<div className="w-100 text-black text-center fullName">
					<span>{firstName}</span> <span>{lastname}</span>
				</div>
			)}
		</h1>
	);
};
export default ProfileName;
