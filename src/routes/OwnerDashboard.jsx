/* eslint-disable no-unused-vars */
import Background from "../components/owner/Background";
import Images from "../components/owner/Images";
import Pricing from "../components/owner/Pricing";
import Promos from "../components/owner/Promos";
function OwnerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	// console.log(userData);

	return (
		<>
            <Background />
            <Images/>
            <Pricing />
            <Promos/>
		</>
	);
}

export default OwnerDashboard;
