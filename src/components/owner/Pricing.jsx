import DiscountIcon from "@mui/icons-material/Discount";
const Pricing = ({ selectedView, setSelectedView }) => {
	const handleToggle = (view) => {
		setSelectedView(view);
	};

	return (
		<div className="flex flex-col ml-6 mt-12">
			<div className="flex mb-0">
				<div
					onClick={() => handleToggle("promos")}
					className={`flex flex-col items-center mr-4 cursor-pointer ${
						selectedView === "promos" ? "opacity-100" : "opacity-50"
					}`}>
					<p className="bg-red-500 text-white p-2 rounded-full px-[13px] text-2xl shadow-xl">
						<DiscountIcon className="mb-1" />
					</p>
					<p className="text-xs font-bold text-red-400">Promos</p>
				</div>
				<div
					onClick={() => handleToggle("pricing")}
					className={`flex flex-col items-center ml-4 cursor-pointer ${
						selectedView === "pricing" ? "opacity-100" : "opacity-50"
					}`}>
					<p className="bg-blue-800 text-white p-2 rounded-full px-[17px] text-2xl shadow-xl">₱</p>
					<p className="text-xs font-bold text-blue-800 dark:text-blue-400">Pricing</p>
				</div>
			</div>
		</div>
	);
};

export default Pricing;
