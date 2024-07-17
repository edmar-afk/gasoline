import { useState, useEffect } from "react";
import axios from "axios";

function Map() {
	const [townName, setTownName] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;

					try {
						const response = await axios.get(
							`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
						);

						if (response.data && response.data.address) {
							const address = response.data.address;
							const town = address.town || address.village || address.city || address.locality;
							setTownName(town || "No town found");
						} else {
							setTownName("No town found");
						}
					} catch (err) {
						setError("Error fetching town name: " + err.message);
					} finally {
						setLoading(false);
					}
				},
				(err) => {
					setError("Geolocation error: " + err.message);
					setLoading(false);
				}
			);
		} else {
			setError("Geolocation is not supported by this browser.");
			setLoading(false);
		}
	}, []);

	return (
		<>
			{loading ? (
				<p>Loading location...</p>
			) : (
				<>
					{error && <p>Error: {error}</p>}
					<p>Town: {townName}</p>
				</>
			)}
		</>
	);
}

export default Map;
