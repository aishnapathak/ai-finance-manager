import Header from "../components/common/Header";
import TransactionsTable from "../components/transaction/TransactionsTable";
import  Sidebar  from "../components/common/Sidebar";

const TransactionsPage = () => {
	return (
		<div className="flex h-full min-h-screen w-screen overflow-hidden bg-gray-900">
			{/* Sidebar on the left */}
			<Sidebar />

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Header at the top */}
				<Header title="Transactions" />


			<main className='w-full max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<TransactionsTable />

	
			</main>
			</div>
		</div>
	);
};
export default TransactionsPage;