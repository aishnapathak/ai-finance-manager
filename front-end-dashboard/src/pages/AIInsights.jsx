import Header from "../components/common/Header";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import  Sidebar  from "../components/common/Sidebar";

const AIInsights = () => {
	return (
		<div className='flex h-screen w-screen overflow-hidden realtive z-10 bg-gray-900'>

		<Sidebar className="h-full"/>

			<div className="flex-1 flex flex-col w- full h-full">
			<Header title="AI Powered Insights" />

			<main className='w-full max-w-7xl mx-auto overflow-auto py-6 px-4 lg:px-8'>

				<AIPoweredInsights />
			</main>
		</div>
		</div>
	);
};
export default AIInsights;
