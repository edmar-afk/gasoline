import Background from "../components/owner/Background";
function OwnerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData);

	return (
		<>
			<Background />
		</>
	);
}

export default OwnerDashboard;
