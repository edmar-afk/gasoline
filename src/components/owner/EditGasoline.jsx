import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import api from "../../assets/api";

// eslint-disable-next-line react/prop-types
function EditGasoline({ id, open, handleClose, refetchGasolines }) {
	const [gasolineName, setGasolineName] = useState("");
	const [price, setPrice] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (id) {
			const fetchGasoline = async () => {
				try {
					const response = await api.get(`/api/view-gasoline/${id}/`);
					const { type = "", price = "" } = response.data;
					console.log("Fetched Data:", { type, price });
					setGasolineName(type);
					setPrice(price);
				} catch (error) {
					console.error("Error fetching gasoline data", error);
				}
			};

			fetchGasoline();
		}
	}, [id]);

	const handleEditSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await api.put(`/api/gasoline/${id}/update/`, {
				type: gasolineName,
				price: price,
			});

			console.log("Update response:", response.data);

			alert("Gasoline updated successfully!");
			handleClose(); // Close the modal after successful update
			refetchGasolines(); // Refetch gasoline list from parent component
		} catch (error) {
			console.error("Error updating gasoline data", error);
			alert("Error updating gasoline. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] bg-white dark:bg-gray-900 shadow-xl p-4">
				<p className="dark:text-white text-xl">Edit Gasoline</p>

				<form onSubmit={handleEditSubmit}>
					<div className="relative mt-6">
						<input
							type="text"
							name="gasolineName"
							id="gasolineName"
							placeholder="Name of Gasoline"
							value={gasolineName}
							onChange={(e) => setGasolineName(e.target.value)}
							className="peer mt-1 w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-1 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
							autoComplete="off"
							required
						/>
						<label
							htmlFor="gasolineName"
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
		</Modal>
	);
}

export default EditGasoline;
