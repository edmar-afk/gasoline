/* eslint-disable react/prop-types */ import { useState, useEffect } from "react";import Modal from "@mui/material/Modal";
import api from "../../assets/api";

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
			handleClose();
			refetchGasolines();
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
				<p className="dark:text-white text-xl">Edit Gasoline Price</p>

				<form onSubmit={handleEditSubmit}>
					<div className="w-full mt-8">
						<div className="relative hidden">
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
						</div>
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
