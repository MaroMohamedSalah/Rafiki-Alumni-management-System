import { useEffect, useState } from "react";

const ProfileName = () => {
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	useEffect(() => {
		fetch("https://alumnimanagmentsys12.000webhostapp.com/APIs/get_name.php", {
			method: "POST",
			body: JSON.stringify({
				userID: localStorage.getItem("UserID"),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setFirst_name(data.firstName);
				setLast_name(data.lastName);
				console.log(first_name);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<h1 className="name">
			{first_name === "" || last_name === "" ? (
				<p class="placeholder-glow" style={{ width: "200px" }}>
					<span class="placeholder w-100"></span>
				</p>
			) : (
				<>
					<span>{first_name}</span> <span>{last_name}</span>
				</>
			)}
		</h1>
	);
};
export default ProfileName;
