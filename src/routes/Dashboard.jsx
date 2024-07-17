import Map from "../components/Map";

function Dashboard() {
	return (
		<>
			<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white duration-300">
				<main className="p-4">
					<h1 className="text-2xl">Dashboard</h1>
					<Map/>
				</main>
			</div>
		</>
	);
}

export default Dashboard;
