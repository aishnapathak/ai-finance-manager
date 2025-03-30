import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

/*const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];
*/

const SalesOverviewChart = () => {

	const [savingsData, setSavingsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Define start and end date (full financial year)
	const startDate = "2024-01-01";
	const endDate = "2024-12-31";
	const userId = 1;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:8082/transaction/analytics?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

				// Example response: [{ month: 11, totalAmount: 5400 }, { month: 12, totalAmount: 7200 }]
				const apiData = response.data;

				// Define all 12 months and initialize with 0 sales
				const fullYearData = Array.from({ length: 12 }, (_, index) => ({
					month: new Date(2024, index, 1).toLocaleString("en-US", { month: "short" }), // Convert month number to name
					sales: 0, // Default value
				}));

				// Map API response to the correct month
				apiData.forEach(item => {
					const monthIndex = item.month - 1; // API gives months as 11, 12 (1-based index)
					if (monthIndex >= 0 && monthIndex < 12) {
						fullYearData[monthIndex].sales = item.totalAmount; // Assign values to respective months
					}
				});

				setSavingsData(fullYearData);
			} catch (error) {
				console.error("Error fetching savings data:", error);
				setError("Failed to load data.");
			} finally {
				setLoading(false);
			}
		};

		if (userId) fetchData(); // Only fetch if userId is available
	}, [userId]);


	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Sales Overview</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={savingsData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey="month" stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;