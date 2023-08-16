import { useEffect, useState } from "react";

const ProfileName = ({ firstName, lastname }) => {
	// const [first_name, setFirst_name] = useState(null);
	// const [last_name, setLast_name] = useState(null);
	// useEffect(() => {
	// 	fetch("https://alumnimanagmentsys12.000webhostapp.com/APIs/get_name.php", {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			userID: localStorage.getItem("UserID"),
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setFirst_name(data.firstName);
	// 			setLast_name(data.lastName);
	// 			console.log(first_name);
	// 		})
	// 		.catch((error) => console.log(error));
	// }, [first_name]);
	return (
		<h1 className="name text-center text-white">
			{firstName === null || lastname === null ? (
				<p class="placeholder-glow w-100" style={{ width: "200px" }}>
					<span class="placeholder w-100"></span>
				</p>
			) : (
				<>
					<span>{firstName}</span> <span>{lastname}</span>
				</>
			)}
		</h1>
	);
};
export default ProfileName;
