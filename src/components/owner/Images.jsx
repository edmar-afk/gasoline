import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";import { useState, useEffect } from "react";import api from "../../assets/api";function Images() {
	const [userData] = useState(() => JSON.parse(localStorage.getItem("userData")));
	const [userImages, setUserImages] = useState([]);
	console.log(userImages)
	// Fetch images on component mount
	useEffect(() => {
		const fetchUserImages = async () => {
			try {
				const response = await api.get(`/api/user-images/${userData.id}/`, {
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				});
				setUserImages(response.data);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};

		fetchUserImages();
	}, [userData]);

	// Function to handle file selection
	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("imges", file);

			try {
				const response = await api.post(`/api/upload-image/${userData.id}/`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${userData.token}`,
					},
				});
				alert("Image uploaded successfully!");
				setUserImages((prevImages) => [...prevImages, response.data]);
			} catch (error) {
				console.error("Error uploading image:", error.response?.data || error);
				alert("Failed to upload image. Please try again.");
			}
		}
	};

	return (
		<>
			<div className="flex overflow-x-auto mt-32 mx-6 mb-4 whitespace-nowrap">
				<label className="border-2 h-[130px] flex-col justify-center mx-1 min-w-[120px] rounded-xl bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center cursor-pointer">
					<AddPhotoAlternateOutlinedIcon className="mx-auto" />
					<span>Add Photo</span>
					<input
						type="file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleFileChange}
						className="hidden"
					/>
				</label>

				{userImages.map((image, index) => (
					<div
						key={image.id || index} // Fallback to index if image.id is not unique or undefined
						className="border-2 h-[130px] mx-1 min-w-[120px] rounded-xl bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center">
						<img
							src={image.imges}
							alt="User upload"
							className="w-full h-full object-cover rounded-xl"
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default Images;
