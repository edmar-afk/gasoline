import DiscountIcon from "@mui/icons-material/Discount";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from "@mui/material/Modal";
import { useState } from "react";
function Promos() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<div className="mx-6 mt-6 mb-4">
				<div className="flex flex-row justify-between">
					<p className="font-semibold">Your Promos</p>
					<p onClick={handleOpen}>
						<AddCircleOutlineOutlinedIcon className="text-blue-400" />
					</p>
				</div>

				<div className="flex flex-col">
					<div className="mt-4 flex flex-row justify-between items-center bg-gray-200 dark:bg-gray-800 my-4 px-4 p-3 rounded-3xl">
						<div className="flex flex-row items-center">
							<DiscountIcon
								fontSize="large"
								className="text-green-800 dark:text-green-200 bg-green-200 dark:bg-green-800 p-2 rounded-full"
							/>
							<div className="ml-4 flex flex-col item">
								<p className="text-lg font-bold">Summer Sale</p>
								<p className="text-xs my-1 text-green-800 dark:text-green-400">0.5 pesos deduction per litre</p>
								<p className="flex items-center text-xs">
									Expires at: Aug 30, 2024
									<DateRangeOutlinedIcon
										fontSize="small"
										className="ml-1"
									/>
								</p>
							</div>
						</div>
						<div>
							<p className="text-red-600">
								<DeleteForeverOutlinedIcon />
							</p>
						</div>
					</div>
				</div>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white dark:bg-gray-900 shadow-xl p-4">
					<p className="text-gray-800 dark:text-white text-xl">
						Add New Promo <AddCircleOutlineOutlinedIcon fontSize="small" />
					</p>
					<p className="text-gray-800 dark:text-white">
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</p>
				</div>
			</Modal>
		</>
	);
}

export default Promos;
