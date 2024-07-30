import { useEffect, useState } from "react";import api from "../../assets/api";import logo from "../../assets/img/logo.png";

function Background() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to your user data structure
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (userId) {
					const response = await api.get(`/api/profile/${userId}/`);
					setProfile(response.data);
				} else {
					setError("User ID not found");
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
				setError("Error fetching profile data");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userId]);
	console.log(profile);
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	// Base URL of your Django server
	const baseURL = "https://gasstationapi.pythonanywhere.com";

	return (
		<>
			<div className="bg-red-400 h-[224px] overflow-hidden relative">
				<img
					src={`${baseURL}/${profile.business_permit}`}
					alt="Logo"
				/>
				<div className="fixed top-[110px] left-4 text-white font-bold text-2xl w-[230px]">
					<p>{userData.first_name}</p>
					<p className="text-sm">{userData.email}</p>
				</div>
			</div>
			<img
				src={logo}
				className="w-[130px] z-50 absolute top-[150px] right-2 bg-white rounded-full border-4 border-blue-800"
				alt="Logo"
			/>
		</>
	);
}

export default Background;
