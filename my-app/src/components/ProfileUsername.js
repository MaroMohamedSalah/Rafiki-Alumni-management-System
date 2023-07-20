const ProfileUsername = ({ username }) => {
	// const [username, setUsername] = useState("");

	// return username.length === 0 ? (
	// 	<p class="placeholder-glow w-100 text-center text-md-start">
	// 		@<span class="placeholder w-25"></span>
	// 	</p>
	// ) : (
	// 	<h5 className="text-center text-md-start">@{username}</h5>
	// );
	return <h5 className="text-center text-md-start">@{username}</h5>;
};

export default ProfileUsername;
