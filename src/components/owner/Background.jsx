import { useEffect, useState } from "react";import api from "../../assets/api";
import logo from "../../assets/img/logo.png";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DarkModeToggle from "../DarkModeToggle";
import Modal from "@mui/material/Modal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function Background(ownerId) {
	const [userData, ] = useState(() => {
		const storedUserData = JSON.parse(localStorage.getItem("userData"));
		return storedUserData || ownerId;
	});
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		first_name: userData?.first_name || "",
		last_name: userData?.last_name || "",
		email: userData?.email || "",
		profile_pic: null, // To store the uploaded profile picture
	});
	const [previewImage, setPreviewImage] = useState(null); // For image preview
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setPreviewImage(null); // Reset preview on modal close
	};

	// Fetch profile data
	useEffect(() => {
		const fetchProfile = async () => {
			if (userData?.id) {
				setLoading(true);
				try {
					const response = await api.get(`/api/profile/${userData.id}/`);
					setProfile(response.data);
					setFormData({
						first_name: response.data.first_name,
						last_name: response.data.last_name,
						email: response.data.email,
					});
				} catch (error) {
					console.error("Error fetching profile data:", error);
					setError("Error fetching profile data");
				} finally {
					setLoading(false);
				}
			} else {
				setError("User ID not found");
			}
		};
		fetchProfile();
	}, [userData]); // Fetch profile when userData changes

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle file changes
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prevData) => ({
				...prevData,
				profile_pic: file,
			}));
			setPreviewImage(URL.createObjectURL(file)); // Set preview image
		}
	};

	// Handle profile form submission
	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		const updatedUserData = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
		};

		setLoading(true);

		try {
			// Update user profile data
			await api.patch(`/api/profile/update/`, updatedUserData);

			// Check if a profile picture is selected
			if (formData.profile_pic) {
				const formDataPic = new FormData();
				formDataPic.append("profile_pic", formData.profile_pic);

				// Send profile pic to backend
				await api.put(`/api/update-profile-pic/`, formDataPic);
			}

			alert("Profile updated successfully!");
			window.location.reload(); // Refresh the page
		} catch (error) {
			console.error("Error updating user:", error);
			setError("Error updating user");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<DarkModeToggle />
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
					<p>{profile.user.first_name}</p>
					<p className="text-xs font-light">{profile.user.email}</p>
				</div>
			</div>
			<div className="flex flex-col items-center z-50 absolute top-[150px] right-2">
				<img
					src={profile?.profile_pic ? `${import.meta.env.VITE_API_URL}/${profile.profile_pic}` : logo}
					className="w-[130px] h-[130px] bg-white rounded-full border-4 border-blue-800 shadow-xl"
					alt="Profile"
				/>
				<p
					onClick={handleOpen}
					className="mt-2 w-fit p-2 rounded-full text-xs bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 shadow-xl cursor-pointer">
					<ModeEditOutlineOutlinedIcon fontSize="small" />
				</p>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white dark:bg-gray-900 shadow-xl p-4">
					<p className="text-gray-800 dark:text-white text-xl">
						Edit your Profile <ModeEditOutlineOutlinedIcon fontSize="small" />
					</p>
					<div className="text-gray-800 dark:text-white">
						<form onSubmit={handleProfileSubmit}>
							<div className="relative mt-9">
								<input
									type="text"
									name="first_name"
									id="first_name"
									placeholder="First Name"
									value={formData.first_name}
									onChange={handleInputChange}
									className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
								/>
								<label
									htmlFor="first_name"
									className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-100 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
									First Name
								</label>
							</div>
							<div className="relative mt-9">
								<input
									type="text"
									name="last_name"
									id="last_name"
									placeholder="Last Name"
									value={formData.last_name}
									onChange={handleInputChange}
									className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
								/>
								<label
									htmlFor="last_name"
									className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-100 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
									Last Name
								</label>
							</div>
							<div className="relative mt-9">
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									value={formData.email}
									onChange={handleInputChange}
									className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
								/>
								<label
									htmlFor="email"
									className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-300 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
									Email
								</label>
							</div>
							<div className="relative mt-9">
								<input
									type="file"
									name="profile_pic"
									id="profile_pic"
									accept="image/*"
									onChange={handleFileChange}
									className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
								/>
								{previewImage && (
									<img
										src={previewImage}
										alt="Profile Preview"
										className="mt-4 w-20 mx-auto rounded-full"
									/>
								)}
							</div>
							<div className="mt-9 text-right">
								<button
									type="submit"
									className="bg-blue-600 text-white dark:bg-blue-900 dark:text-gray-200 px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 dark:hover:bg-blue-800">
									Update Profile
								</button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Background;
