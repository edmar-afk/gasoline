import React from "react";import Button from "@mui/material/Button";import TextField from "@mui/material/TextField";import { Link } from "react-router-dom";import Paper from "@mui/material/Paper";import Grid from "@mui/material/Grid";import logo from "../assets/img/logo.png";import { motion } from "framer-motion";import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
export default function Login() {
	const [account, setAccount] = React.useState({ username: "", password: "" });

	const handelAccount = (property, event) => {
		const accountCopy = { ...account };
		accountCopy[property] = event.target.value;

		setAccount(accountCopy);
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
				<div className="flex flex-col items-center justify-center pt-4 mb-2">
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
						Login
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
						elevation={0} // Make sure elevation is set to 0
						square
						className="flex flex-col items-center justify-center p-8 bg-transparent">
						<form
							className="w-full mt-1 bg-transparent"
							noValidate>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
								}}>
								<TextField
									onChange={(event) => handelAccount("username", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoFocus
									className="bg-transparent" // Add this class
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.1,
								}}>
								<TextField
									onChange={(event) => handelAccount("password", event)}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									className="mb-4 bg-transparent" // Add this class
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</motion.div>
							<br />

							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									stiffness: 160,
									damping: 30,
									delay: 0.2,
								}}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className="mt-8 mb-2">
									Sign In
								</Button>
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
									<Grid item>
										<Link
											to={'/'}
											variant="body2">
											{"Don't have an account? Sign Up"}
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
