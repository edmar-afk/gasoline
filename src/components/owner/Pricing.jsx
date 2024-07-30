import DiscountIcon from "@mui/icons-material/Discount";
function Pricing() {
	return (
		<>
			<div className="flex flex-row items-center p-6">
				<div className="flex flex-col items-center mr-4">
					<p className="bg-red-500 text-white p-2 rounded-full px-[13px] text-2xl shadow-xl">
						<DiscountIcon className="mb-1" />
					</p>
					<p className="text-xs font-bold text-red-400">Promos</p>
				</div>
				<div className="flex flex-col items-center ml-4">
					<p className="bg-blue-800 text-white p-2 rounded-full px-[17px] text-2xl shadow-xl">
						₱
					</p>
					<p className="text-xs font-bold text-blue-800 dark:text-blue-400">Pricing</p>
				</div>
			</div>
		</>
	);
}

export default Pricing;
