import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import  Sidebar  from "../components/common/Sidebar";

const SettingsPage = () => {
	return (
		<div className="flex h-full w-screen overflow-hidden bg-gray-900">
			{/* Sidebar on the left */}
			<Sidebar />

			{/* Main content area */}
			<div className="flex-1 flex flex-col">
				{/* Header at the top */}
				<Header title="Settings" />

			<main className='w-full max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
			</div>
		</div>
	);
};
export default SettingsPage;