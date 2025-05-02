import React, { useState } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { sendMessageToAI } from "../utils/aiService";

const AIInsights = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello Sushil! How can I assist you with your finances today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    const userMessage = { sender: "user", text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");

    try {
      const aiResponse = await sendMessageToAI(userInput);
      setMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden relative z-10 bg-gray-900">
      <Sidebar className="h-full" />
      <div className="flex-1 flex flex-col w-full h-full">
        <Header title="AI Powered Insights" />
        <main className="w-full max-w-7xl mx-auto overflow-auto py-6 px-4 lg:px-8">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    message.sender === "ai" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs p-3 bg-blue-500 text-white rounded-lg">
                    Analyzing your transactions...
                  </div>
                </div>
              )}
            </div>

            <div className="flex p-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
                placeholder="Ask about your finances..."
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={isLoading || !userInput.trim()}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIInsights;


// import React, { useState } from "react";
// import Header from "../components/common/Header";
// import Sidebar from "../components/common/Sidebar";
// // import { sendMessageToAI } from "../utils/aiService";  // Assume this function sends the query to your AI service

// const AIInsights = () => {
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hello! How can I assist you with your finances today?" }
//   ]);
//   const [userInput, setUserInput] = useState("");

//   const handleSendMessage = async (message) => {
//     // Add user's message
//     setMessages([...messages, { sender: "user", text: message }]);

//     // Send message to AI service and get the response
//     const aiResponse = await sendMessageToAI(message);

//     // Add AI's response
//     setMessages([...messages, { sender: "user", text: message }, { sender: "ai", text: aiResponse }]);

//     // Clear input field
//     setUserInput("");
//   };

//   const handleSuggestionClick = async (suggestion) => {
//     // Handle pre-defined suggestion click
//     setMessages([...messages, { sender: "user", text: suggestion }]);

//     // Send the suggestion to AI service
//     const aiResponse = await sendMessageToAI(suggestion);

//     // Add AI's response
//     setMessages([...messages, { sender: "user", text: suggestion }, { sender: "ai", text: aiResponse }]);
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden relative z-10 bg-gray-900">
//       <Sidebar className="h-full" />
      
//       <div className="flex-1 flex flex-col w-full h-full">
//         <Header title="AI Powered Insights" />
        
//         <main className="w-full max-w-7xl mx-auto overflow-auto py-6 px-4 lg:px-8">
//           <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {/* Render messages */}
//               {messages.map((message, index) => (
//                 <div key={index} className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"}`}>
//                   <div
//                     className={`max-w-xs p-3 rounded-lg ${
//                       message.sender === "ai" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
//                     }`}
//                   >
//                     {message.text}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Predefined suggestions */}
//             <div className="flex space-x-4 py-4">
//               <button
//                 onClick={() => handleSuggestionClick("Tell me about my last transaction")}
//                 className="bg-gray-700 text-white py-2 px-4 rounded-lg"
//               >
//                 Tell me about my last transaction
//               </button>
//               <button
//                 onClick={() => handleSuggestionClick("What was my expense-saving ratio last month?")}
//                 className="bg-gray-700 text-white py-2 px-4 rounded-lg"
//               >
//                 What was my expense-saving ratio last month?
//               </button>
//             </div>

//             {/* Chat input */}
//             <div className="flex p-4">
//               <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage(userInput)}
//                 className="flex-1 p-3 bg-gray-800 text-white rounded-lg"
//                 placeholder="Ask a question..."
//               />
//               <button
//                 onClick={() => handleSendMessage(userInput)}
//                 className="ml-4 p-3 bg-blue-500 text-white rounded-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AIInsights;


// import Header from "../components/common/Header";
// import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
// import  Sidebar  from "../components/common/Sidebar";

// const AIInsights = () => {
// 	return (
// 		<div className='flex h-screen w-screen overflow-hidden realtive z-10 bg-gray-900'>

// 		<Sidebar className="h-full"/>

// 			<div className="flex-1 flex flex-col w- full h-full">
// 			<Header title="AI Powered Insights" />

// 			<main className='w-full max-w-7xl mx-auto overflow-auto py-6 px-4 lg:px-8'>

// 				<AIPoweredInsights />
// 			</main>
// 		</div>
// 		</div>
// 	);
// };
// export default AIInsights;
