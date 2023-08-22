import { useEffect, useState } from "react";

const ProfileName = ({ firstName, lastname }) => {
	return (
		<h1 className="name text-center text-white">
			{firstName === null || lastname === null ? (
				<p class="placeholder-glow w-100" style={{ width: "200px" }}>
					<span class="placeholder w-100"></span>
				</p>
			) : (
				<div className="w-100 text-black text-center fullName">
					<span>{firstName}</span> <span>{lastname}</span>
				</div>
			)}
		</h1>
	);
};
export default ProfileName;
