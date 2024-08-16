import { useEffect, useState } from "react";import api from "../../assets/api";import logo from "../../assets/img/logo.png";import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DarkModeToggle from "../DarkModeToggle";
import Modal from "@mui/material/Modal";

function Background() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to your user data structure
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
	// console.log(profile);
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	// Base URL of your Django server
	const baseURL = "https://gasstationapi.pythonanywhere.com";
	// https://gasstationapi.pythonanywhere.com
	// http://127.0.0.1:8000

	return (
		<>
			<DarkModeToggle />
			<div className="bg-red-400 dark:bg-red-900 relative">
				<div className="h-[240px] overflow-hidden">
					<img
						src={`${baseURL}/${profile.business_permit}`}
						alt="Logo"
						className=""
					/>
				</div>
				<div className="absolute top-[270px] left-4 dark:text-white font-bold text-sm w-[230px] z-50">
					<p>{userData.first_name}</p>
					<p className="text-xs font-light">{userData.email}</p>
				</div>
			</div>
			<div className="flex flex-col items-center z-50 absolute top-[150px] right-2">
				<img
					src={logo}
					className="w-[130px] bg-white rounded-full border-4 border-blue-800 shadow-xl"
					alt="Logo"
				/>
				<p
					onClick={handleOpen}
					className="mt-2 w-fit p-2 rounded-full text-xs  bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 shadow-xl">
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
					<p className="text-gray-800 dark:text-white">
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</p>
				</div>
			</Modal>
		</>
	);
}

export default Background;
