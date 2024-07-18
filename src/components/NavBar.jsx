import * as React from "react";import PropTypes from "prop-types";import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { Global } from "@emotion/react";

const drawerBleeding = 56;

function NarBar(props) {
	const { window } = props;
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// This is used only for the example
	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className="h-full bg-gray-100 dark:bg-gray-900">
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(20% - ${drawerBleeding}px)`,
						overflow: "visible",
					},
				}}
			/>

			<SwipeableDrawer
				className="bg-white/20 dark:bg-gray-800/20 duration-300"
				container={container}
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}>
				<div
					className="absolute top-[-56px] bg-bg-gray-800 dark:bg-white w-full rounded-t-2xl"
					style={{
						visibility: "visible",
						right: 0,
						left: 0,
					}}>
					<div className="w-7.5 h-1.5 bg-gray-300 dark:bg-gray-900 rounded absolute left-1/2 transform -translate-x-1/2" />
					<Typography className="p-2 text-center text-gray-500">
						<MenuIcon /> Menu
					</Typography>
				</div>
				<div className="px-2 pb-2 h-full overflow-auto">
					{open && (
						<motion.p
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
							}}>
							Hello
						</motion.p>
					)}
				</div>
			</SwipeableDrawer>
		</div>
	);
}

NarBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default NarBar;
