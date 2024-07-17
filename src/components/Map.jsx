import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter = [51.505, -0.09]; // Default to London if location access is denied

const Map = () => {
	const [userLocation, setUserLocation] = useState(defaultCenter);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation([position.coords.latitude, position.coords.longitude]);
					setIsLoaded(true);
				},
				(error) => {
					console.error("Error getting user location:", error);
					setIsLoaded(true); // Proceed to load the map with default center
				}
			);
		} else {
			setIsLoaded(true); // If geolocation is not available, proceed to load the map with default center
		}
	}, []);

	const customMarkerIcon = new L.Icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		shadowSize: [41, 41],
	});

	return (
		<div>
			{isLoaded && (
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
						<Popup>You are here</Popup>
					</Marker>
				</MapContainer>
			)}
		</div>
	);
};

export default Map;
