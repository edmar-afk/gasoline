import { useState, useEffect } from "react";
import axios from "axios";

function Map() {
	const [townName, setTownName] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleGeolocation = async (position) => {
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
		};

		const handleError = (err) => {
			setError("Geolocation error: " + err.message);
			setLoading(false);
		};

		if (navigator.geolocation) {
			// Try to get the current position
			navigator.geolocation.getCurrentPosition(handleGeolocation, handleError, {
				enableHighAccuracy: true, // Request high accuracy
				timeout: 5000, // 5 seconds timeout
				maximumAge: 0, // No cache
			});
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
