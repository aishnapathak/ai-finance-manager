import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useState } from "react";

const Profile = () => {

	// ✅ Get user from localStorage
	const user = JSON.parse(localStorage.getItem("userData"));
	const [name, setName] = useState(user.fullName);
	const [email, setEmail] = useState(user.email);
	const handleEdit = async () => {
		const updatedusername = prompt("Enter new username:");
		if (!updatedusername) return;
		const updatedfullname = prompt("Enter new fullname:");
		if (!updatedfullname) return;
		const updatedemail = prompt("Enter new email:");
		if (!updatedemail) return;
		const updatedphone = prompt("Enter new phone number:");
		if (!updatedphone) return;
		try {
			const response = await fetch(`http://localhost:8080/users/${user.id}`, {
			  method: "PUT",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ username: updatedusername, email: updatedemail,fullName: updatedfullname,phoneNumber: updatedphone }),
			});
		
			if (!response.ok) throw new Error("Failed to update details");
			alert("Details updated!");
			// Refresh transactions after update
			setName(updatedfullname);
			setEmail(updatedemail);
		  } catch (error) {
			console.error("Error updating profile:", error);
		  }
		};

	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{name}</h3>
					<p className='text-gray-400'>{email}</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto' onClick = {handleEdit}>
				Edit Profile
			</button>
		</SettingSection>
	);
};
export default Profile;