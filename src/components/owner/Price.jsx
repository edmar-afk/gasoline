import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
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
			setGasolineName("");
			setPrice("");
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
									<div className="relative mt-6">
										<input
											type="text"
											name="gasolineName"
											id="gasoline"
											placeholder="Name of Gasoline"
											value={gasolineName}
											onChange={(e) => setGasolineName(e.target.value)}
											className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
											autoComplete="NA"
											required
										/>
										<label
											htmlFor="gasoline"
											className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-100 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
											Name of Gasoline
										</label>
									</div>
									<div className="relative mt-6">
										<input
											type="number"
											name="price"
											id="price"
											placeholder="Price(₱)"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
											required
										/>
										<label
											htmlFor="price"
											className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-300 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
											Price(₱)
										</label>
									</div>
									<div className="my-6">
										<button
											type="submit"
											className="w-full rounded-md bg-orange-400 dark:bg-blue-600 px-3 py-2 text-white focus:bg-gray-600 dark:focus:bg-gray-700 focus:outline-none"
											disabled={loading}>
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
