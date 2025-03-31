import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import OverviewChart from "../components/overview/OverviewChart";
import  Sidebar  from "../components/common/Sidebar";
import { useEffect, useState } from "react";

const HomePage = () => {

	const [balance, setBalance] = useState(null);
	const [userId, setUserId] = useState(1);
	const [spend, setSpend] = useState(null);

	useEffect(() => {
		const fetchBalance = async () => {
			try {
				const response = await axios.get(`http://localhost:8082/transaction/totalincome?userId=${userId}&startDate=2024-11-01&endDate=2024-11-30`);

				console.log(response.data)
				console.log(response.data[0].totalAmount)

				if (typeof response.data[0].totalAmount === "number") {
					setBalance(response.data[0].totalAmount);
				} else {
					console.error("Invalid totalAmount received:", balance);
					setBalance(0); // Default value in case of an error
				}
			} catch (error) {
				console.error("Error fetching balance:", error);
			}
		};

		fetchBalance();
	}, [userId]);

	useEffect(() => {
		const fetchSpend = async () => {
			try {
				const response = await axios.get(`http://localhost:8082/transaction/totalspending?userId=${userId}&startDate=2024-11-01&endDate=2024-11-30`);

				console.log(response.data)
				console.log(response.data[0].totalAmount)

				if (typeof response.data[0].totalAmount === "number") {
					setSpend(response.data[0].totalAmount);
				} else {
					console.error("Invalid totalAmount received:", balance);
					setSpend(0); // Default value in case of an error
				}
			} catch (error) {
				console.error("Error fetching balance:", error);
			}
		};

		fetchSpend();
	}, [userId]);

	return (
		<div className='flex h-full w-screen overflow-hidden relative z-10'>
			<Sidebar />

			<div className="flex-1 flex flex-col w- full h-full">
			<Header title='Overview' />
			<main className='w-full max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Income' icon={TrendingUp} value= {balance !== null ? `₹ ${balance.toLocaleString("en-IN")}` : "Loading..."} color='#00A300' />
					<StatCard name='Total Expenses' icon={TrendingDown} value={spend !== null ? `₹ ${spend.toLocaleString("en-IN")}` : "Loading..."} color='#D01110' />
				</motion.div>

				{/* CHARTS */}

				<div /*className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8'*/>
					<OverviewChart/>
				</div>
			</main>
			</div>
		</div>
	);
};
export default HomePage;