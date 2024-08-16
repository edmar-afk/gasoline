/* eslint-disable no-unused-vars */
import NoInterConnection from "./components/NoInternetConnection";
import Homepage from "./routes/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import { DarkModeProvider } from "./context/DarkModeContext";
import Login from "./routes/Login";
import Register from "./routes/Register";
import OwnerDashboard from "./routes/OwnerDashboard";
import { useEffect } from "react";

function Logout() {
	localStorage.clear();
	return <Navigate to="/" />;
}

function RegisterAndLogout() {
	localStorage.clear();
	return;
}

const disableZoom = () => {
	// Disable zoom on mouse wheel
	window.addEventListener(
		"wheel",
		(e) => {
			if (e.ctrlKey) {
				e.preventDefault();
			}
		},
		{ passive: false }
	);

	// Disable zoom on keydown (Ctrl + '+' or '-' or '0')
	window.addEventListener("keydown", (e) => {
		if (
			(e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) ||
			(e.key === "Meta" && (e.key === "+" || e.key === "-" || e.key === "0"))
		) {
			e.preventDefault();
		}
	});
};

function App() {
	useEffect(() => {
		disableZoom();

		return () => {
			// Cleanup event listeners on unmount
			window.removeEventListener("wheel", disableZoom);
			window.removeEventListener("keydown", disableZoom);
		};
	}, []);
	return (
		<>
			<NoInterConnection>
				<DarkModeProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path="/home"
								element={<OwnerDashboard />}
							/>
							<Route
								path="/"
								element={<Homepage />}
							/>
							<Route
								path="/login"
								element={<Login />}
							/>
							<Route
								path="/register"
								element={<Register />}
							/>
							<Route
								path="/dashboard"
								element={
									<>
										<Dashboard />
									</>
								}
							/>

							<Route
								path="/logout"
								element={
									<>
										<Logout />
									</>
								}
							/>
						</Routes>
					</BrowserRouter>
				</DarkModeProvider>
			</NoInterConnection>
		</>
	);
}

export default App;
