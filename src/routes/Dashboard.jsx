import Map from "../components/Map";
import DarkModeToggle from '../components/DarkModeToggle'
function Dashboard() {
	return (
		<>
			<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white duration-300">
				<main className="">
					<DarkModeToggle/>
					<Map />
					<h1 className="text-2xl  top-5 left-6">Dashboard</h1>
				</main>
			</div>
		</>
	);
}

export default Dashboard;
