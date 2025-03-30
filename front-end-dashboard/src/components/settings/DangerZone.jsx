import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const DangerZone = () => {

	const [userId, setUserId] = [2]

		const handleDelete = async () => {
		  try {
			await axios.delete(`http://localhost:8080/users/${userId}`);
			alert("User deleted successfully!");
		  } catch (error) {
			console.error("Error deleting user:", error);
			alert("Failed to delete user.");
		  }
		};

	return (
		<motion.div
			className='bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='flex items-center mb-4'>
				<Trash2 className='text-red-400 mr-3' size={24} />
				<h2 className='text-xl font-semibold text-gray-100'>Danger Zone</h2>
			</div>
			<p className='text-gray-300 mb-4'>Permanently delete your account and all of your content.</p>
			<button
				className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200' onClick={handleDelete}
			>
				Delete Account
			</button>
		</motion.div>
	);
};
export default DangerZone;