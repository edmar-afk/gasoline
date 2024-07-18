import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { motion } from "framer-motion";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[800],
}));

const StyledBox = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
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
	const { window } = props;
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// This is used only for the example
	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Root>
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(50% - ${drawerBleeding}px)`,
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
						sx={{ p: 2, color: "text.secondary" }}
						className="text-center">
						<b className="text-blue-400 font-bold animate-bounce">0</b> Active promos around Guipos area
					</Typography>
				</StyledBox>
				<StyledBox
					sx={{
						height: "100%",
						overflow: "auto",
					}}>
					<div className="bg-white text-gray-800 dark:text-white dark:bg-gray-800 duration-300 p-3 h-screen">
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
				</StyledBox>
			</SwipeableDrawer>
		</Root>
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
