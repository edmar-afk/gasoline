
import Background from "../components/owner/Background";
import Images from "../components/owner/Images";
import Price from "../components/owner/Price";
import { Link } from "react-router-dom"; // Corrected import statement

function OwnerDashboard() {
	
	

	return (
		<>
			<Background />
			<Images />
			
			<Price />

			<div className="mx-4 mb-4">
				<Link
					to={"/logout"}
					className="bg-red-400 dark:bg-red-600 text-white w-full flex justify-center py-2 rounded-full">
					Logout
				</Link>{" "}
				{/* Added text for the link */}
			</div>
		</>
	);
}

export default OwnerDashboard;
