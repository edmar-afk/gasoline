import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";import Modal from "@mui/material/Modal";import { useState, useEffect } from "react";
import api from "../../assets/api";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EditGasoline from "./EditGasoline";

function Price() {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false); // State for editing modal
	const [currentEditId, setCurrentEditId] = useState(null); // State for storing the ID of the gasoline being edited
	const [gasolineName, setGasolineName] = useState("");
	const [price, setPrice] = useState("");
	const [loading, setLoading] = useState(false);
	const [gasolines, setGasolines] = useState([]);
	const [fetching, setFetching] = useState(true);
	const [error, setError] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleEditClose = () => setEditOpen(false); // Function to close the edit modal
	const [priceError, setPriceError] = useState(false); // State to handle price error

	const handlePriceChange = (e) => {
		const value = e.target.value;
		setPrice(value);
		setPriceError(value > 80); // Set error if price exceeds 80
	};

	const fetchGasolines = async () => {
		try {
			const response = await api.get("/api/gasoline/");
			setGasolines(response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchGasolines();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await api.post("/api/gasoline/create/", {
				type: gasolineName,
				price: price,
			});
			console.log("Gasoline added successfully:", response.data);
			setGasolineName(""); // Reset the gasoline name after submission
			setPrice(""); // Reset the price after submission
			handleClose(); // Close the modal after successful submission
			fetchGasolines(); // Refetch the gasoline list
		} catch (error) {
			console.error("Error adding gasoline:", error.response?.data || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this gasoline?")) {
			try {
				setFetching(true);
				await api.delete(`/api/gasoline/${id}/delete/`);
				setGasolines((prevGasolines) => prevGasolines.filter((gasoline) => gasoline.id !== id));
				setError(null);
				alert("Gasoline deleted successfully.");
			} catch (err) {
				setError("Failed to delete gasoline.");
				alert("There was an error deleting the gasoline.");
			} finally {
				setFetching(false);
			}
		}
	};

	const handleEditClick = (id) => {
		setCurrentEditId(id); // Set the ID of the gasoline to be edited
		setEditOpen(true); // Open the edit modal
	};

	return (
		<>
			<div className="mx-6 mt-6 mb-4">
				<div className="flex flex-row justify-between">
					<p className="font-semibold">Your Gasoline Prices</p>
					<p onClick={handleOpen}>
						<AddCircleOutlineOutlinedIcon className="text-blue-400" />
					</p>
				</div>

				<div className="flex flex-col">
					<div className="mt-4 flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800 my-4 px-4 p-3 rounded-3xl">
						{fetching ? (
							<p>Loading...</p>
						) : error ? (
							<p className="text-red-600">Error: {error}</p>
						) : gasolines.length > 0 ? (
							gasolines.map((gasoline) => (
								<div
									key={gasoline.id} // Ensure gasoline.id is unique
									className="flex flex-row w-full items-center p-2 rounded-lg shadow-sm mb-2">
									<div className="flex flex-row items-center">
										<LocalGasStationOutlinedIcon
											fontSize="small"
											className="mr-2"
										/>
										<div className="flex flex-col">
											<p className="text-lg font-bold">{gasoline.type}</p>
											<p className="text-sm">₱{gasoline.price} per litre</p>
										</div>
									</div>
									<div className="ml-auto flex flex-row items-center">
										<BorderColorOutlinedIcon
											className="text-blue-600 cursor-pointer mr-1"
											onClick={() => handleEditClick(gasoline.id)} // Trigger edit modal
										/>
										<DeleteForeverOutlinedIcon
											className="text-red-600 cursor-pointer"
											onClick={() => handleDelete(gasoline.id)}
										/>
									</div>
								</div>
							))
						) : (
							<p>No gasolines available.</p>
						)}
					</div>
				</div>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white dark:bg-gray-900 shadow-xl p-4">
					<p className="dark:text-white text-xl">
						Add new Gasoline <AddCircleOutlineOutlinedIcon fontSize="small" />
					</p>

					<div className="relative mx-auto w-full px-2">
						<div className="w-full">
							<div className="text-left">
								<p className="mb-2 mt-4 text-gray-500">Set up updated price to your Gasolines</p>
							</div>
							<div className="mt-5">
								<form onSubmit={handleSubmit}>
									<div className="w-full mt-8">
										<div className="relative">
											<select
												className="w-full bg-transparent placeholder:text-slate-400 dark:text-gray-300 text-slate-700 text-sm border border-slate-200 dark:border-gray-700 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 dark:focus:border-gray-500 hover:border-slate-400 dark:hover:border-gray-500 shadow-sm focus:shadow-md appearance-none cursor-pointer"
												value={gasolineName}
												onChange={(e) => setGasolineName(e.target.value)}
												required>
												<option
													style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
													value="">
													Select Gasoline Type
												</option>
												<option
													style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
													value="Premium">
													Premium
												</option>
												<option
													style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
													value="Diesel">
													Diesel
												</option>
												<option
													style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
													value="Regular">
													Regular
												</option>
											</select>

											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.2"
												stroke="currentColor"
												className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700 dark:text-gray-300">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
												/>
											</svg>
										</div>
										<p className="flex items-center mt-2 text-xs text-slate-500 dark:text-gray-400">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-5 h-5 mr-2">
												<path
													fillRule="evenodd"
													d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
													clipRule="evenodd"></path>
											</svg>
											Select the type of Gasoline.
										</p>
									</div>
									<div className="relative mt-6">
										<input
											type="number"
											name="price"
											id="price"
											placeholder="Price(₱)"
											value={price}
											onChange={handlePriceChange}
											className={`peer mt-1 w-full border-b-2 ${
												priceError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
											} bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:outline-none`}
											required
										/>
										<label
											htmlFor="price"
											className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-300 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
											Price(₱)
										</label>
										{priceError && <p className="mt-2 text-xs text-red-500">Price must not exceed ₱80.</p>}
									</div>
									<div className="my-6">
										<button
											type="submit"
											className={`w-full rounded-md px-3 py-2 text-white ${
												priceError
													? "bg-red-500 cursor-not-allowed"
													: "bg-orange-400 dark:bg-blue-600 focus:bg-gray-600 dark:focus:bg-gray-700"
											} focus:outline-none`}
											disabled={loading || priceError}>
											{loading ? "Saving..." : "Save"}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			{/* Edit Modal */}
			<Modal
				open={editOpen}
				onClose={handleEditClose}
				aria-labelledby="modal-edit-title"
				aria-describedby="modal-edit-description">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white dark:bg-gray-900 shadow-xl p-4">
					<EditGasoline
						id={currentEditId}
						open={editOpen}
						handleClose={handleEditClose}
						refetchGasolines={fetchGasolines} // Pass refetch function as prop
					/>
				</div>
			</Modal>
		</>
	);
}

export default Price;
