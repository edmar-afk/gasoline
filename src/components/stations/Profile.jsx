import { useEffect, useState } from "react";import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import DarkModeToggle from "../DarkModeToggle";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import api from "../../assets/api";
import logo from "../../assets/img/logo.png";
import GasolineLists from "./GasolineLists";
import GasolineImages from "./GasolineImages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Profile() {
	const { userId } = useParams(); // Get userId from URL
	const [profile, setProfile] = useState(null);
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		// Fetch profile data with userId
		api
			.get(`/api/profile/${userId}/`)
			.then((response) => setProfile(response.data))
			.catch((error) => console.error("Error fetching profile:", error));
	}, [userId]);

	const handleBackClick = () => {
		navigate(-1); // Go back to the previous page
	};

	return (
		<>
			<DarkModeToggle />
			<div
				className="bg-red-600 fixed top-4 left-4 z-50 text-white p-1 rounded-full cursor-pointer"
				onClick={handleBackClick}>
				<ArrowBackIcon />
			</div>
			<div className="bg-red-400 dark:bg-red-900 relative">
				<div className="h-[240px] overflow-hidden">
					<Zoom>
						<img
							src={`${import.meta.env.VITE_API_URL}/${profile?.business_permit}`}
							alt="Profile"
							style={{ cursor: "zoom-in", width: "100%", height: "auto" }}
						/>
					</Zoom>
				</div>
				<div className="absolute top-[270px] left-4 dark:text-white font-bold text-sm w-[230px] z-50">
					<p>{profile?.user?.first_name}</p>
					<p className="text-xs font-light">{profile?.user?.email}</p>
				</div>
			</div>
			<div className="flex flex-col items-center z-50 absolute top-[150px] right-2">
				<Zoom>
					<img
						src={profile?.profile_pic ? `${import.meta.env.VITE_API_URL}/${profile.profile_pic}` : logo}
						className="w-[130px] bg-white rounded-full border-4 border-blue-800 shadow-xl"
						alt="Profile"
					/>
				</Zoom>
			</div>
			<GasolineImages />
			<GasolineLists />
		</>
	);
}

export default Profile;
