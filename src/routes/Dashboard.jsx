import Map from "../components/Map";
import DarkModeToggle from "../components/DarkModeToggle";
import Result from "../components/dashboard/Result";
import { useState, useEffect } from "react";
import api from "../assets/api";
import Navbar from '../components/NavBar'

function Dashboard() {
	const [searchQuery, setSearchQuery] = useState("");
	const [results, setResults] = useState([]);

	// Default text when searchQuery is empty
	const displayText = searchQuery ? searchQuery : "Search for a location of";

	useEffect(() => {
		api
			.get(`/api/search/${displayText}`)
			.then((response) => {
				setResults(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the data!", error);
			});
	}, [displayText]); // Add displayText to the dependency array

	const handleSearchQueryChange = (query) => {
		setSearchQuery(query);
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white duration-300 h-full">
			<main>
				<DarkModeToggle />
				<Map onSearchQueryChange={handleSearchQueryChange} />

				<h5 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 ml-8">
					<span className="text-gray-800 dark:text-white capitalize">{displayText}</span> <br /> Gasoline Station
				</h5>

				<div className="p-2 mb-24">
					<Result results={results} />
				</div>
			</main>
			<Navbar/>
		</div>
	);
}

export default Dashboard;
