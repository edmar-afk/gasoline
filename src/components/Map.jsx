import { useState, useEffect } from "react";import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter = [7.0515, 126.0885]; // Default to Mati, San Miguel ZDS

const Map = () => {
	const [userLocation, setUserLocation] = useState(defaultCenter);
	const [isLoaded, setIsLoaded] = useState(false);
	const [useUserLocation, setUseUserLocation] = useState(true);
	const [statusMessage, setStatusMessage] = useState("");
	const [locationText, setLocationText] = useState("");

	useEffect(() => {
		const fetchAddress = async (latitude, longitude) => {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
				);
				const data = await response.json();
				setLocationText(data.display_name || `Latitude ${latitude.toFixed(4)}, Longitude ${longitude.toFixed(4)}`);
			} catch (error) {
				console.error("Error fetching address:", error);
				setLocationText(`Latitude ${latitude.toFixed(4)}, Longitude ${longitude.toFixed(4)}`);
			}
		};

		if (useUserLocation && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation([latitude, longitude]);
					fetchAddress(latitude, longitude);
					setIsLoaded(true);
					setStatusMessage(""); // Clear status message when location is on
				},
				(error) => {
					console.error("Error getting user location:", error);
					setIsLoaded(true); // Proceed to load the map with default center
					if (error.code === error.PERMISSION_DENIED) {
						setStatusMessage("Please enable GPS to use location features.");
					} else {
						setStatusMessage("Unable to retrieve location.");
					}
					setLocationText("Latitude 7.0515, Longitude 126.0885"); // Default location text
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for better accuracy
			);
		} else {
			setIsLoaded(true); // If location is off, load map with default center
			if (!useUserLocation) {
				setStatusMessage("You turned off your location");
				setLocationText("Latitude 7.0515, Longitude 126.0885"); // Default location text
			}
		}
	}, [useUserLocation]);

	const customMarkerIcon = new L.Icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		shadowSize: [41, 41],
	});

	const handleToggleLocation = () => {
		setUseUserLocation((prev) => {
			const newValue = !prev;
			if (newValue) {
				window.location.reload(); // Refresh the page when toggled on
			} else {
				setLocationText("Latitude 7.0515, Longitude 126.0885"); // Update location text for default center
			}
			return newValue;
		});
	};

	return (
		<div>
			<label>
				<input
					type="checkbox"
					checked={useUserLocation}
					onChange={handleToggleLocation}
				/>
				Use my location
			</label>
			<p>{locationText}</p>
			{statusMessage && <p>{statusMessage}</p>}
			{useUserLocation && isLoaded && (
				<MapContainer
					center={userLocation}
					zoom={13}
					style={{ height: "400px", width: "100%" }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker
						position={userLocation}
						icon={customMarkerIcon}>
						<Popup>{useUserLocation ? "You are here" : "Default location"}</Popup>
					</Marker>
				</MapContainer>
			)}
		</div>
	);
};

export default Map;
