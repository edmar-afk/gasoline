import Map from "../components/Map";import DarkModeToggle from "../components/DarkModeToggle";
import Result from "../components/dashboard/Result";

function Dashboard() {
	return (
		<>
			<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white duration-300 h-full">
				<main className="">
					<DarkModeToggle />
					<Map />
					<h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white mt-12 ml-2">
						Guipos <br /> Gasoline Station
					</h5>

					<div className="p-2 mb-24">
						<Result />
					</div>
				</main>
			</div>
		</>
	);
}

export default Dashboard;
