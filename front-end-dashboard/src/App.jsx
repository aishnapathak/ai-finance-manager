import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TransactionsPage from "./pages/TransactionsPage";
import TransactionFormPage from "./pages/TransactionFormPage";
import AIInsights from "./pages/AIInsights";
import SettingsPage from "./pages/SettingsPage";
import FirstPage from "./pages/FirstPage";

function App() {
	return (
		<div className='bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG 
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
			*/}

			
			
			<Routes>
				<Route path='/' element={<FirstPage />}/>
				<Route path='/overview' element={<HomePage />} />
				<Route path='/transaction' element={<TransactionsPage />} />
				<Route path='/addtransaction' element={<TransactionFormPage />} />
				<Route path='/analytics' element={<AIInsights />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;