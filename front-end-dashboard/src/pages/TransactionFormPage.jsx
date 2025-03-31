import Header from "../components/common/Header";
import AddTransactionForm from "../components/addtransaction/AddTransactionForm";
import  Sidebar  from "../components/common/Sidebar";

const TransactionFormPage = () => {
	return (
		<div className="flex h-full w-screen overflow-hidden bg-gray-900">
			{/* Sidebar on the left */}
			<Sidebar  />

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Header at the top */}
				<Header title="Add Transaction" />


			<main className='w-full max-w-7xl mx-auto py-6 px-4 lg:px-8'>

				<AddTransactionForm />

			</main>
			</div>
		</div>
	);
};
export default TransactionFormPage;
