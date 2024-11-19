/* eslint-disable react/prop-types */ import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";import { motion } from "framer-motion";import { Link } from "react-router-dom";

function Result({ results }) {
	console.log(results);

	return (
		<div className="w-full max-w-md p-1 mb-24">
			{/* Conditionally render the result count */}
			{results.length > 0 && (
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xs font-extralight text-gray-900 dark:text-white">Number of Gasoline: {results.length}</h2>
				</div>
			)}
			<div className="flow-root">
				<ul
					role="list"
					className="divide-y divide-gray-200 dark:divide-gray-700">
					{results.length > 0 ? (
						results.map((result) => (
							<motion.li
								key={result.id} // Add a unique key for each list item
								className="py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl mb-4"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}>
								<div className="flex items-center">
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-gray-900 truncate dark:text-white">{result.first_name}</p>
										<p className="text-sm text-gray-500 truncate dark:text-gray-400 text-ellipsis">
											{result.last_name}
										</p>

										{/* Map over gasoline_entries */}
										{result.gasoline_entries && result.gasoline_entries.length > 0 ? (
											<div className="mt-2">
												<p className="font-semibold text-gray-700 dark:text-white text-xs">Gasoline Entries:</p>
												<ul className="mt-1">
													{result.gasoline_entries.map((gasoline) => (
														<li
															key={gasoline.type}
															className="text-xs text-gray-600 dark:text-gray-400">
															{gasoline.type}: ₱{gasoline.price} per litre
														</li>
													))}
												</ul>
											</div>
										) : (
											<p className="text-sm text-gray-500 dark:text-gray-400">No gasoline entries</p>
										)}
									</div>
									<Link
										to={`/station/${result.id}`}
										className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
										<RemoveRedEyeSharpIcon />
									</Link>
								</div>
							</motion.li>
						))
					) : (
						<p>No results found</p>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Result;
