import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";


const TransactionsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");

	/*const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = transactions.filter(
			(product) => product.category.toLowerCase().includes(term) || product.type.toLowerCase().includes(term)
		);

		setFilteredProducts(filtered);
	};*/
	
	const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);
  //const [filteredProducts, setFilteredProducts] = useState("");

  const user = JSON.parse(localStorage.getItem("userData"));

  const handleEdit = async (transaction) => {
	const updatedAmount = prompt("Enter new amount:", transaction.amount);
	if (!updatedAmount) return;
  
	try {
	  const response = await fetch(`http://localhost:8082/transaction/${transaction.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...transaction, amount: updatedAmount }),
	  });
  
	  if (!response.ok) throw new Error("Failed to update transaction");
  
	  // Refresh transactions after update
	  setTransactions((prev) =>
		prev.map((t) => (t.id === transaction.id ? { ...t, amount: updatedAmount } : t))
	  );
	} catch (error) {
	  console.error("Error updating transaction:", error);
	}
  };


  const handleDelete = async (transactionId) => {
	if (!window.confirm("Are you sure you want to delete this transaction?")) return;
  
	try {
	  const response = await fetch(`http://localhost:8082/transaction/${transactionId}`, {
		method: "DELETE",
	  });
  
	  if (!response.ok) throw new Error("Failed to delete transaction");
  
	  // Remove the deleted transaction from state
	  setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
	} catch (error) {
	  console.error("Error deleting transaction:", error);
	}
  };
  
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:8082/transaction?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
		
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    if (user.id) {
      fetchTransactions();
    }
  }, [user.id]);

  

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}

		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Transaction History</h2>
				
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Tranasciton Date
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Amount
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Type
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Description
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{transactions.map((transaction) => (
							<motion.tr
								key={transactions.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									{new Date(transaction.transactionDate).toLocaleDateString()}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								₹ {transaction.amount}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								{transaction.category}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{transaction.type}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>{transaction.description}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleEdit(transaction)}>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300'  onClick={() => handleDelete(transaction.id)}>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default TransactionsTable;