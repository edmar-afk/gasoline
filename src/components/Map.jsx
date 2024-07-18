import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const defaultCenter = [7.7114933, 123.2930602]; // Default to JHCSC Main Campus Gymnasium
// eslint-disable-next-line react/prop-types
const UpdateMapView = ({ center }) => {
	const map = useMap();
	map.setView(center, map.getZoom());
	return null;
};

const Map = () => {
	const [userLocation, setUserLocation] = useState(defaultCenter);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [locationText, setLocationText] = useState("");

	const fetchCoordinates = async (query) => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
			);
			const data = await response.json();
			if (data.length > 0) {
				const { lat, lon } = data[0];
				setUserLocation([parseFloat(lat), parseFloat(lon)]);
				setLocationText(data[0].display_name || `Latitude ${lat}, Longitude ${lon}`);
				setStatusMessage("");
			} else {
				setStatusMessage("Location not found.");
				setLocationText("");
			}
		} catch (error) {
			console.error("Error fetching coordinates:", error);
			setStatusMessage("Unable to retrieve location.");
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery) {
			fetchCoordinates(searchQuery);
		}
	};

	const customMarkerIcon = new L.Icon({
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
		shadowSize: [41, 41],
	});

	return (
		<div className="relative h-[400px]">
			<div className="absolute top-0 left-1/2 transform -translate-x-[50.3%] z-50 bg-white/60 dark:bg-black/60 duration-300 w-full h-full p-2 shadow-md"></div>
			<form
				onSubmit={handleSearch}
				className="absolute bottom-24 left-[10%] z-50 shadow-md mx-auto">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Enter location"
					className="p-2 border rounded text-gray-800"
				/>
				<button
					type="submit"
					className="ml-2 p-2 bg-blue-500 text-white rounded">
					Search
				</button>
			</form>
			<p className="absolute bottom-5 text-center left-0 p-2 z-50 w-full">{locationText}</p>
			<div className="absolute inset-0 z-10">
				{statusMessage && <p className="absolute top-0 left-0 mt-8 bg-white p-2">{statusMessage}</p>}
				<MapContainer
					center={userLocation}
					zoom={12}
					style={{ height: "100%", width: "100%" }}
					scrollWheelZoom={false}
					doubleClickZoom={false}
					dragging={false}
					touchZoom={false}
					zoomControl={false} // Hide the zoom control buttons
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<UpdateMapView center={userLocation} />
					<Marker
						position={userLocation}
						icon={customMarkerIcon}
					/>
				</MapContainer>
			</div>
		</div>
	);
};

export default Map;
