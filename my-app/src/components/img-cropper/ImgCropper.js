import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import "./imgCropper.css";

const ImgCropper = ({ imgSrc, onClose }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
	}, []);

	// Handle the case when imgSrc is undefined
	if (!imgSrc) {
		return <div>Loading...</div>; // or show a default image here
	}

	return (
		<div className="ImgCropper">
			<div className="crop-container">
				<Cropper
					image={imgSrc}
					crop={crop}
					zoom={zoom}
					aspect={4 / 3}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className="controls">
				<input
					type="range"
					value={zoom}
					min={1}
					max={3}
					step={0.1}
					aria-labelledby="Zoom"
					onChange={(e) => {
						setZoom(e.target.value);
					}}
					className="zoom-range"
				/>
			</div>
			<button onClick={() => onClose()}>Close</button> {/* Close button */}
		</div>
	);
};

export default ImgCropper;
