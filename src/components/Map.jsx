import { useState, useEffect } from "react";
import axios from "axios";

function Map() {
	const [placeName, setPlaceName] = useState("");
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

						if (response.data && response.data.display_name) {
							setPlaceName(response.data.display_name);
						} else {
							setPlaceName("No address found");
						}
					} catch (err) {
						setError("Error fetching place name: " + err.message);
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
					<p>Place: {placeName}</p>
				</>
			)}
		</>
	);
}

export default Map;
