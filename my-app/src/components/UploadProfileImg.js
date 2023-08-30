import { CloudinaryUploadWidget } from "react-cloudinary-uploader";

const UploadProfileImg = () => {
	const handleUploadSuccess = (info) => {
		console.log("Upload success:", info);
	};

	const handleUploadFailure = (error) => {
		console.error("Upload error:", error);
	};

	const pictureUploaderOptions = {
		clientAllowedFormats: ["jpg", "jpeg", "png", "gif"],
		resourceType: "image",
		cropping: true,
		croppingAspectRatio: 1,
		croppingShowDimensions: true,
		croppingValidateDimensions: true,
		croppingDefaultWidth: 200, // Width of the cropped image
		croppingDefaultHeight: 200, // Height of the cropped image
		// max file size is 10MB
		maxFileSize: 10000000,
		folder: "images",
		sources: ["local", "url", "camera", "google_drive"],
	};

	return (
		<CloudinaryUploadWidget
			cloudName="do6oz83pz"
			uploadPreset="ggdkuker"
			buttonStyle={{ border: "1px solid black", padding: "10px" }}
			buttonClass="custom-class" // className for button element
			buttonText="Choose Image"
			onUploadSuccess={handleUploadSuccess}
			onUploadFailure={handleUploadFailure}
			options={pictureUploaderOptions}
		/>
	);
};
export default UploadProfileImg;
