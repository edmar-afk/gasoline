/* eslint-disable react/no-unescaped-entities */ import React from "react";import Button from "@mui/material/Button";import TextField from "@mui/material/TextField";import { useNavigate, Link } from "react-router-dom";import Paper from "@mui/material/Paper";import Grid from "@mui/material/Grid";
import logo from "../assets/img/logo.png";
import { motion } from "framer-motion";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import api from "../assets/api";

export default function Register() {
	const [loading, setLoading] = React.useState(false);
	const [apiErrors, setApiErrors] = React.useState({});

	const navigate = useNavigate();

	const [account, setAccount] = React.useState({
		address: "",
		email: "",
		stationName: "",
		password: "",
		password2: "",
		businessPermit: null,
	});

	const [errors, setErrors] = React.useState({
		address: "",
		email: "",
		stationName: "",
		password: "",
		password2: "",
	});

	const [buttonColor, setButtonColor] = React.useState("primary");

	const handleAccountChange = (property, event) => {
		const accountCopy = { ...account };
		if (property === "businessPermit") {
			accountCopy[property] = event.target.files[0];
		} else {
			accountCopy[property] = event.target.value;
		}
		setAccount(accountCopy);
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			address: "",
			email: "",
			stationName: "",
			password: "",
			password2: "",
		};

		if (!account.address) {
			newErrors.address = "Address is required.";
			isValid = false;
		}

		if (!account.email) {
			newErrors.email = "Email is required.";
			isValid = false;
		}

		if (!account.stationName) {
			newErrors.stationName = "Station Name is required.";
			isValid = false;
		}

		if (!account.password) {
			newErrors.password = "Password is required.";
			isValid = false;
		}
		if (!account.password2) {
			newErrors.password2 = "Re-type Password is required.";
			isValid = false;
		} else if (account.password !== account.password2) {
			newErrors.password = "Passwords do not match.";
			newErrors.password2 = "Passwords do not match.";
			isValid = false;
		}

		setErrors(newErrors);
		setButtonColor(isValid ? "primary" : "error");

		return isValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}

		setLoading(true); // Start loading
		setApiErrors({}); // Clear previous errors

		const formData = new FormData();
		formData.append("first_name", account.stationName);
		formData.append("last_name", account.address);
		formData.append("email", account.email);
		formData.append("username", account.email); // Assuming username is same as email
		formData.append("password", account.password);
		formData.append("password2", account.password2); // For password confirmation
		formData.append("business_permit", account.businessPermit);

		try {
			const res = await api.post("/api/register/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (res.status === 201) {
				console.log("Registration successful:", res.data);
				// Handle successful registration

				navigate("/login", { state: { registrationSuccess: true } }); // Pass state
			}
		} catch (error) {
			if (error.response && error.response.data) {
				console.log("Registration error:", error.response.data);
				setApiErrors(error.response.data); // Set API errors
			} else {
				console.error("Unexpected error:", error);
			}
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<>
			<div className="h-screen bg-white">
				<Link
					to={"/"}
					className="p-3 flex items-center fixed">
					<ArrowBackIosOutlinedIcon className="text-gray-800" />
					<p className="text-gray-800 text-sm -mt-1 font-bold">Back</p>
				</Link>
				<div className="flex flex-col items-center justify-center pt-12 mb-2">
					<motion.img
						initial={{ scale: 0 }}
						animate={{ rotate: 360, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 160,
							damping: 30,
						}}
						src={logo}
						className="w-40"
						alt=""
					/>
					<motion.p
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 160,
							damping: 30,
						}}
						className="text-gray-800 font-bold text-4xl">
						Sign up
					</motion.p>
				</div>
				<Grid
					container
					component="main"
					className="flex items-center justify-center">
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={0}
						square
						className="flex flex-col items-center justify-center p-8 bg-transparent">
						<form
							className="w-full mt-1 bg-transparent"
							noValidate
							onSubmit={handleSubmit}>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
								}}>
								<TextField
									onChange={(event) => handleAccountChange("stationName", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="stationName"
									label="Gasoline Station Name"
									name="stationName"
									autoFocus
									className={`bg-transparent ${errors.stationName ? "border-red-500" : ""}`}
								/>
								{errors.stationName && <p className="text-red-500 text-sm">{errors.stationName}</p>}
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.2,
								}}>
								<TextField
									onChange={(event) => handleAccountChange("email", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Your Email"
									name="email"
									autoFocus
									className={`bg-transparent ${errors.email ? "border-red-500" : ""}`}
								/>
								{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.2,
								}}>
								<TextField
									onChange={(event) => handleAccountChange("address", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="address"
									label="Address (Purok, Barangay, City, Province)"
									name="address"
									autoFocus
									className={`bg-transparent ${errors.address ? "border-red-500" : ""}`}
								/>
								{errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
								<p className="text-xs text-gray-400 mb-8">
									Complete your address so consumers can see your gasoline station{" "}
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.3,
								}}
								className="font-[sans-serif] w-full my-3 mx-auto">
								<input
									type="file"
									onChange={(event) => handleAccountChange("businessPermit", event)}
									className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
								/>
								<p className="text-xs text-gray-400 mt-2">PNG, JPG are Allowed for your Business Permit.</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.4,
								}}>
								<TextField
									onChange={(event) => handleAccountChange("password", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									className={`mb-4 bg-transparent ${errors.password ? "border-red-500" : ""}`}
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.4,
								}}></motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.5,
								}}>
								<TextField
									onChange={(event) => handleAccountChange("password2", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									className={`mb-4 bg-transparent ${errors.password2 ? "border-red-500" : ""}`}
									name="password2"
									label="Re-type Password"
									type="password"
									id="password2"
									autoComplete="current-password"
								/>
								{errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
							</motion.div>
							<br />
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.7,
								}}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color={buttonColor}
									className="mt-8 mb-2"
									disabled={loading} // Disable button when loading
								>
									{loading ? "Checking Credentials..." : "Sign Up"}
								</Button>

								{/* Display API errors */}
								{Object.keys(apiErrors).length > 0 && (
									<div className="mt-4 text-red-500">
										{Object.keys(apiErrors).map((key) => (
											<p
												key={key}
												className="text-red-500 text-sm">
												{apiErrors[key]}
											</p>
										))}
									</div>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.4,
								}}>
								<Grid
									container
									className="mt-2">
									Already Have an Account?
									<Grid item>
										<Link
											to={"/login"}
											variant="body2"
											className="ml-0.5 text-blue-400 font-bold">
											{"Sign In"}
										</Link>
									</Grid>
								</Grid>
							</motion.div>
						</form>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
