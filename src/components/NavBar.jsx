import * as React from "react";import PropTypes from "prop-types";import { Global } from "@emotion/react";import { styled } from "@mui/material/styles";import CssBaseline from "@mui/material/CssBaseline";import { grey } from "@mui/material/colors";import Typography from "@mui/material/Typography";import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { motion } from "framer-motion";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[800],
}));

const StyledBox = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#1e3a8a" : "#1e40af", // Example: Dark blue shades for light and dark mode
}));

const Puller = styled("div")(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
	borderRadius: 3,
	position: "absolute",
	top: 8,
	left: "calc(50% - 15px)",
}));

function NarBar(props) {
	const { window, results } = props;
	const [open, setOpen] = React.useState(false);
	console.log('results from cheapest',results)
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

const findCheapestGasoline = (stations) => {
	const cheapestPrices = {};

	stations.forEach((station) => {
		console.log("Checking station:", station);
		station.gasoline_entries.forEach((entry) => {
			const price = parseFloat(entry.price); // Ensure price is a number
			console.log("Checking gasoline entry:", entry);

			// Update if the type is not in cheapestPrices or if the current price is cheaper
			if (!cheapestPrices[entry.type] || price < cheapestPrices[entry.type].price) {
				cheapestPrices[entry.type] = {
					station: station,
					price: price,
				};
				console.log(`Updated cheapest for ${entry.type}:`, cheapestPrices[entry.type]);
			}
		});
	});

	return cheapestPrices;
};



	// Get the cheapest gasoline prices for each type
	const cheapestGasPrices = findCheapestGasoline(results);
	const gasolineTypes = Object.keys(cheapestGasPrices);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Root>
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(78% - ${drawerBleeding}px)`,
						overflow: "visible",
						backgroundColor: "#e0f7fa", // Drawer background color
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
					},
				}}
			/>
			<SwipeableDrawer
				container={container}
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{ keepMounted: true }}>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0,
					}}>
					<Puller />
					<Typography
						sx={{ p: 3, color: "text.secondary" }}
						className="text-center">
						<p className="text-white text-sm">View Cheapest Price</p>
					</Typography>
				</StyledBox>
				<StyledBox sx={{ height: "100%", overflow: "auto" }}>
					<div className="text-gray-800  duration-300 p-3 bg-[#1e3a8a] pt-12">
						{open && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 260, damping: 20 }}>
								{gasolineTypes.length > 0 ? (
									gasolineTypes.map((type, index) => {
										const { station, price } = cheapestGasPrices[type];
										return (
											<div
												key={type}
												className="my-3 rounded-lg shadow-md">
												<label className="cursor-pointer">
													<input
														type="radio"
														className="peer sr-only"
														name="pricing"
													/>
													<div className="w-full rounded-md mb-2 bg-gray-50 dark:bg-gray-900 p-5 text-gray-600 dark:text-gray-300 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
														<div className="flex flex-col gap-1">
															<div className="flex items-center justify-between">
																<p className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
																	{station?.first_name || "Unknown Station"}
																</p>
																<div>
																	<LocalGasStationIcon />
																</div>
															</div>
															<div className="flex items-end justify-between">
																<p>
																	cheapest <span className="text-lg font-bold">{type}</span> gasoline:
																</p>
																<p className="text-sm font-bold">₱{price || "N/A"}/litre</p>
															</div>
														</div>
													</div>
												</label>
											</div>
										);
									})
								) : (
									<p className="text-sm text-gray-500 dark:text-gray-400">No gasoline entries available</p>
								)}
							</motion.div>
						)}
					</div>
				</StyledBox>
			</SwipeableDrawer>
		</Root>
	);
}

NarBar.propTypes = {
	window: PropTypes.func,
	area: PropTypes.string,
	results: PropTypes.array.isRequired,
};

export default NarBar;
