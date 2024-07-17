import { createContext, useState, useEffect } from "react";
const DarkModeContext = createContext();

// eslint-disable-next-line react/prop-types
const DarkModeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		const storedDarkMode = localStorage.getItem("darkMode");
		return storedDarkMode ? JSON.parse(storedDarkMode) : false;
	});

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	const toggleDarkMode = () => setDarkMode(!darkMode);

	return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

export { DarkModeContext, DarkModeProvider };
