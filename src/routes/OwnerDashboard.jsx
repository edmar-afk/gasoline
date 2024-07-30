import Background from "../components/owner/Background";
import Pricing from "../components/owner/Pricing";
import Promos from "../components/owner/Promos";
function OwnerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData);

	return (
		<>
            <Background />
            <Pricing />
            <Promos/>
		</>
	);
}

export default OwnerDashboard;
