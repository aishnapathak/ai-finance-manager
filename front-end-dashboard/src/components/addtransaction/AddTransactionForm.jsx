import { useState } from "react";
import { motion } from "framer-motion";

const AddTransactionForm = ({ userId = 1, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    amount: "",
    transactionDate: "",
    category: "",
    description: "",
    type: "expense", // Default type
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: userId }),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      const newTransaction = await response.json();
      setFormData({ amount: "", transactionDate: "", category: "", description: "", type: "expense" }); // Reset form
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}

		>
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Add New Transaction</h2>

      <div className="mb-4">
        <label className="text-gray-400">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-400">Transaction Date</label>
        <input
          type="date"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-400">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-400">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-400">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Transaction
      </button>
    </form>
    </motion.div>
  );
};

export default AddTransactionForm;
