import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownSharpIcon from "@mui/icons-material/TrendingDownSharp";
import { motion } from "framer-motion";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
function Result() {
	return (
		<>
			<div className="w-full max-w-md p-4 sm:p-8">
				<div className="flex items-center justify-between mb-4"></div>
				<div className="flow-root">
					<ul
						role="list"
						className="divide-y divide-gray-200 dark:divide-gray-700">
						<motion.li
							className="py-3 sm:py-4"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}>
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-red-200 rounded-full p-0.5">
									<TrendingUpIcon className="text-red-800" />
								</div>
								<div className="flex-1 min-w-0 ms-4">
									<p className="text-sm font-medium text-gray-900 truncate dark:text-white">Shell Gasoline Station</p>
									<p className="text-sm text-gray-500 truncate dark:text-gray-400 text-ellipsis">
										Ubos atbang Bulangan sa Guipos
									</p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									<RemoveRedEyeSharpIcon />
								</div>
							</div>
						</motion.li>
						<motion.li
							className="py-3 sm:py-4"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}>
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-green-200 rounded-full p-0.5">
									<TrendingDownSharpIcon className="text-green-800" />
								</div>
								<div className="flex-1 min-w-0 ms-4">
									<p className="text-sm font-medium text-gray-900 truncate dark:text-white">Neri Store</p>
									<p className="text-sm text-gray-500 truncate dark:text-gray-400">Crossing Elementary</p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									<RemoveRedEyeSharpIcon />
								</div>
							</div>
						</motion.li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Result;
