/* eslint-disable react/no-unescaped-entities */ import { Link } from "react-router-dom";import logo from "../assets/img/logo.png";
import { motion } from "framer-motion";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

function Homepage() {
	return (
		<>
			<div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 h-screen pt-14">
				<div className="flex flex-col items-center float-start p-2 fixed">
					<Link to={"/login"}>
						<Person2OutlinedIcon className="text-blue-500" />
						<p className="text-blue-400 text-xs -mt-1">Login</p>
					</Link>
				</div>
				<div className="flex justify-center pt-12">
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
				</div>
				<section className=" mt-2">
					<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
							Gasoline <span className="text-purple-600">Station</span> Price Tracker
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1 }}
							className="mb-8 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
							Stay updated on the latest fuel prices at various stations from Lapuyan, San Miguel to Guipos to help you
							make informed decisions and save money on your next refuel.
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: 1, y: 20 }}
							transition={{ duration: 1 }}>
							<Link
								to={"/dashboard"}
								className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
								role="alert">
								<span className="text-xs bg-purple-800 rounded-full px-4 py-1.5 mr-3">Go</span>{" "}
								<span className="text-sm font-medium">Check the latest prices today</span>
								<svg
									className="ml-2 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clipRule="evenodd"></path>
								</svg>
							</Link>
						</motion.div>
					</div>
				</section>
			</div>
		</>
	);
}

export default Homepage;
