import { useState, useEffect } from "react";import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter = [7.0515, 126.0885]; // Default to Mati, San Miguel ZDS

const Map = () => {
	const [userLocation, setUserLocation] = useState(defaultCenter);
	const [isLoaded, setIsLoaded] = useState(false);
	const [useUserLocation, setUseUserLocation] = useState(true);
	const [statusMessage, setStatusMessage] = useState("");

	useEffect(() => {
		if (useUserLocation && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation([position.coords.latitude, position.coords.longitude]);
					setIsLoaded(true);
					setStatusMessage(""); // Clear status message when location is on
				},
				(error) => {
					console.error("Error getting user location:", error);
					setIsLoaded(true); // Proceed to load the map with default center
				}
			);
		} else {
			setIsLoaded(true); // If location is off, load map with default center
			if (!useUserLocation) {
				setStatusMessage("You turned off your location");
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
		setUseUserLocation((prev) => !prev);
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
