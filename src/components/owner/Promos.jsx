import DiscountIcon from "@mui/icons-material/Discount";import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";import Modal from "@mui/material/Modal";import { useState, useEffect } from "react";import api from "../../assets/api";

function Promos() {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [promos, setPromos] = useState([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchPromos = async () => {
			try {
				const response = await api.get("/api/user-promos/");
				setPromos(response.data);
			} catch (error) {
				console.error("Error fetching promos:", error.response?.data || error.message);
			}
		};
		fetchPromos();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await api.post("/api/active-promo/", {
				title,
				description,
			});
			console.log("Promo added successfully:", response.data);
			setTitle("");
			setDescription("");
			handleClose();
			const updatedResponse = await api.get("/api/user-promos/");
			setPromos(updatedResponse.data);
		} catch (error) {
			console.error("Error adding promo:", error.response?.data || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (promoId) => {
		if (window.confirm("Are you sure you want to delete this promo?")) {
			try {
				await api.delete(`/api/delete-promo/${promoId}/`);
				setPromos(promos.filter((promo) => promo.id !== promoId));
			} catch (error) {
				console.error("Error deleting promo:", error.response?.data || error.message);
			}
		}
	};
	return (
		<>
			<div className="mx-6 mt-6 mb-4">
				<div className="flex flex-row justify-between items-center">
					<p className="font-semibold">Your Promos</p>
					<button
						onClick={handleOpen}
						className="text-blue-400">
						<AddCircleOutlineOutlinedIcon />
					</button>
				</div>

				<div className="flex flex-col mt-4">
					{promos.length ? (
						promos.map((promo) => (
							<div
								key={promo.id}
								className="flex flex-row justify-between items-center bg-gray-200 dark:bg-gray-800 my-4 px-4 py-3 rounded-3xl">
								<div className="flex flex-row items-center">
									<DiscountIcon
										fontSize="large"
										className="text-green-800 dark:text-green-200 bg-green-200 dark:bg-green-800 p-2 rounded-full"
									/>
									<div className="ml-4">
										<p className="text-lg font-bold">{promo.title}</p>
										<p className="text-xs my-1 text-green-800 dark:text-green-400">{promo.description}</p>
									</div>
								</div>
								<button
									className="text-red-600"
									onClick={() => handleDelete(promo.id)}>
									<DeleteForeverOutlinedIcon />
								</button>
							</div>
						))
					) : (
						<p className="text-gray-500 dark:text-gray-400">No promos available</p>
					)}
				</div>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-white dark:bg-gray-900 shadow-xl p-4">
					<p className="text-gray-800 dark:text-white text-xl flex items-center">
						Add New Promo
						<AddCircleOutlineOutlinedIcon
							fontSize="small"
							className="ml-2"
						/>
					</p>
					<div className="mt-4">
						<form onSubmit={handleSubmit}>
							<div className="relative mb-4">
								<input
									type="text"
									name="title"
									id="title"
									placeholder="Promo Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="peer w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-2 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
									autoComplete="off"
									required
								/>
								<label
									htmlFor="title"
									className="pointer-events-none absolute top-0 left-0 -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-100 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
									Promo Title
								</label>
							</div>
							<div className="relative mb-4 mt-8">
								<input
									type="text"
									name="description"
									id="description"
									placeholder="Promo Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="peer w-full border-b-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-0 py-2 placeholder:text-transparent focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none"
									autoComplete="off"
									rows="4"
									required
								/>
								<label
									htmlFor="description"
									className="pointer-events-none absolute top-0 left-0 -translate-y-1/2 transform text-sm opacity-75 text-gray-800 dark:text-gray-100 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 dark:peer-focus:text-gray-300">
									Promo Description
								</label>
							</div>

							<button
								type="submit"
								className="w-full rounded-md bg-orange-400 dark:bg-blue-600 px-3 py-2 text-white focus:bg-gray-600 dark:focus:bg-gray-700 focus:outline-none"
								disabled={loading}>
								{loading ? "Adding..." : "Add"}
							</button>
						</form>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Promos;
