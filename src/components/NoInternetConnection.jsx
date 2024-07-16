/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const NoInternetConnection = (props) => {
	// state variable holds the state of the internet connection
	const [isOnline, setOnline] = useState(true);

	// On initization set the isOnline state.
	useEffect(() => {
		setOnline(navigator.onLine);
	}, []);

	// event listeners to update the state
	window.addEventListener("online", () => {
		setOnline(true);
	});

	window.addEventListener("offline", () => {
		setOnline(false);
	});

	// if user is online, return the child component else return a custom component
	if (isOnline) {
		return props.children;
	} else {
		return <h1 className="text-center text-red-800 mt-40 font-bold text-4xl">No Internet Connection. Please try again later.</h1>;
	}
};

export default NoInternetConnection;
