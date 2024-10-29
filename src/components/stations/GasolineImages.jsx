import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../assets/api";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
function GasolineImages() {
	const { userId } = useParams(); // Extract userId from URL parameters
	const [userImages, setUserImages] = useState([]);

	// Fetch images on component mount
	useEffect(() => {
		const fetchUserImages = async () => {
			try {
				const response = await api.get(`/api/user-images/${userId}/`); // Fetch images using userId
				setUserImages(response.data);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};

		fetchUserImages();
	}, [userId]);

	return (
		<div className="flex overflow-x-auto mt-32 mx-6 mb-4 whitespace-nowrap">
			{userImages.map((image, index) => (
				<Zoom key={image.id || index}>
					<div className="border-2 h-[130px] mx-1 w-[120px] rounded-xl bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 flex items-center">
						<img
							src={image.imges}
							alt="User upload"
							className="w-full h-full object-cover rounded-xl"
						/>
					</div>
				</Zoom>
			))}
		</div>
	);
}

export default GasolineImages;
