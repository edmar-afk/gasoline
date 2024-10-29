import { useEffect, useState } from "react";import { useParams } from "react-router-dom";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import api from "../../assets/api";

function GasolineLists() {
	const { userId } = useParams();
	const [gasolines, setGasolines] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGasolines = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/api/gasoline/${userId}/`);
				setGasolines(response.data);
			} catch (err) {
				setError("Failed to fetch gasolines.");
			} finally {
				setLoading(false);
			}
		};

		if (userId) fetchGasolines();
	}, [userId]);

	return (
		<div className="mx-6 mt-6 mb-4">
			<div className="flex flex-row justify-between">
				<p className="font-semibold">Gasoline Lists in this Station</p>
			</div>

			<div className="flex flex-col">
				<div className="mt-4 flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-800 my-4 px-4 p-3 rounded-3xl">
					{loading ? (
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
							</div>
						))
					) : (
						<p>No gasolines available.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default GasolineLists;
