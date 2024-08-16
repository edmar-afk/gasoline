import { useState } from "react";import Background from "../components/owner/Background";
import Images from "../components/owner/Images";
import Pricing from "../components/owner/Pricing";
import Promos from "../components/owner/Promos";
import Price from "../components/owner/Price";
import { Link } from "react-router-dom"; // Corrected import statement

function OwnerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));

	const [selectedView, setSelectedView] = useState("promos");

	return (
		<>
			<Background />
			<Images />
			<Pricing
				selectedView={selectedView}
				setSelectedView={setSelectedView}
			/>
			{selectedView === "promos" ? <Promos /> : <Price />}

			<div>
				<Link to={"/logout"}>Logout</Link> {/* Added text for the link */}
			</div>
		</>
	);
}

export default OwnerDashboard;
