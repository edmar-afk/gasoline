/* eslint-disable no-unused-vars */
import NoInterConnection from "./components/NoInternetConnection";
import Homepage from "./routes/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
	localStorage.clear();
	return <Navigate to="/" />;
}

function RegisterAndLogout() {
	localStorage.clear();
	return;
}

function App() {
	return (
		<>
			<NoInterConnection>
				<BrowserRouter>
					<Routes>
						<Route
							path="/home"
							element={<ProtectedRoute></ProtectedRoute>}
						/>
						<Route
							path="/"
							element={<Homepage />}
						/>
					</Routes>
				</BrowserRouter>
			</NoInterConnection>
		</>
	);
}

export default App;
