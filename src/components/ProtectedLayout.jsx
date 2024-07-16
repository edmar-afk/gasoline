import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedLayout = () => {
	return (
		<>
			<Outlet />
			<Navbar />
		</>
	);
};

export default ProtectedLayout;
