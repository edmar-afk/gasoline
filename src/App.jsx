/* eslint-disable no-unused-vars */
import NoInterConnection from "./components/NoInternetConnection";
import Homepage from "./routes/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./routes/Dashboard";
import { DarkModeProvider } from "./context/DarkModeContext";
import NavBar from "./components/NavBar";
import Login from "./routes/Login";
import Register from "./routes/Register";
import OwnerDashboard from "./routes/OwnerDashboard";

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
										<NavBar />
										<Dashboard />
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
