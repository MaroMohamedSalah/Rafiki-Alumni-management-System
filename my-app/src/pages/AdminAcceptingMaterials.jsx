import React, { useEffect, useState } from "react";
import { baseBackendUrl } from "../utils/baseBackendUrl";
import AdminUploadPopUp from "../components/AdminUploadPopUp/AdminUploadPopUp";
import Toast from "../components/Toast";

export default function AdminAcceptingMaterials() {
	const sessionId = localStorage.getItem("sessionId");
	const [profileFetched, setProfileFetched] = useState(false);
	const [materialReviewed, setMaterialReviewed] = useState(false);
	const [data, setData] = useState([]);

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const handleShowPopup = () => {
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const fetchUserData = async () => {
		try {
			const response = await fetch(`${baseBackendUrl}/materials/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
			});

			if (response.status === 401) {
				console.log("Unauthorized");
			} else {
				const responese = await response.json();
				if (responese.success === true) {
					setProfileFetched(true);
					setData(responese.materials);
				}
			}
		} catch (error) {
			console.log("Error while fetching materials:", error);
		}
	};

	const declineMaterial = async (materialId) => {
		try {
			const response = await fetch(`${baseBackendUrl}/materials/review/${materialId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
				body: JSON.stringify({
					accepted: false,
				}),
			});

			if (response.status === 401) {
				console.log("Unauthorized");
			} else {
				const responese = await response.json();
				if (responese.success === true) {
					setMaterialReviewed(true);
					fetchUserData();
				}
			}
		} catch (error) {
			console.log("Error while fetching materials:", error);
		}
	};

	const acceptMaterial = async (materialId) => {
		try {
			const response = await fetch(`${baseBackendUrl}/materials/review/${materialId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionId}`,
				},
				body: JSON.stringify({
					accepted: true,
				}),
			});

			if (response.status === 401) {
				console.log("Unauthorized");
			} else {
				const responese = await response.json();
				if (responese.success === true) {
					setMaterialReviewed(true);
					fetchUserData();
				}
			}
		} catch (error) {
			console.log("Error while fetching materials:", error);
		}
	};

	function toggleDetails(id) {
		document.getElementById(`${id}`).classList.toggle("d-none");
	}

	useEffect(() => {
		if (!profileFetched) {
			fetchUserData();
		}
	}, [profileFetched]);

	return (
		<div className="AdminAcceptingMaterials">
			<div className="container">
				{profileFetched && (
					<div className="row pt-4">
						{data.map((material, idx) => (
							material.isVisible ? <div key={idx} className="col-md-3">
								<div className="bg-body-secondary p-1 mb-3 rounded-3">
									<h4 className="text-center">
										MaterialID : {material.materialID}
									</h4>
									<div id={material.materialID} className="d-none">
										<h4 className="text-center">
											CourseID : {material.courseID}
										</h4>
										<h4 className="text-center">Title : {material.title}</h4>
										<h4 className="text-center">
											Category : {material.category}
										</h4>
										<h4 className="text-center">
											Date : {material.uploadDate.split("T")[0]}
										</h4>
										<h4 className="text-center">
											Time : {material.uploadDate.substring(11, 16)}
										</h4>
										<a
											href={material.fileURL}
											target="_blank"
											className="text-decoration-none"
										>
											<button className="btn btn-primary w-50 mb-4 d-block m-auto">
												File Link
											</button>
										</a>
									</div>
									<button
										className="btn btn-primary w-100 mb-1"
										onClick={() => {
											toggleDetails(material.materialID);
										}}
									>
										See Details
									</button>
									<button
										className="btn btn-danger w-100 mb-1"
										onClick={handleShowPopup}
									>
										Take Action
									</button>
									{isPopupOpen && (
										<AdminUploadPopUp
											isOpen={isPopupOpen}
											onClose={handleClosePopup}
											userName={material.uploader.UserName}
											userId={material.uploader.User_Id}
											fileUrl={material.fileURL}
											courseName={material.course.courseName}
											title={material.title}
											userEmail={material.uploader.Email}
											declineMaterial={declineMaterial}
											acceptMaterial={acceptMaterial}
											materialID={material.materialID}
										/>
									)}
								</div>
							</div> : ""

						))}
					</div>
				)}
			</div>
		</div>
	);
}
