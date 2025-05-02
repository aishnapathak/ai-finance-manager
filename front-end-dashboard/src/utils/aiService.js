import axios from "axios";

// const API_URL = "http://localhost:8001/financial-rag-chat"; // Replace with actual FastAPI endpoint

// export const sendMessageToAI = async (email, message) => {
//   try {
//     const response = await axios.post(API_URL, { email, query: message });
//     return response.data.response; // Extract AI response
//   } catch (error) {
//     console.error("Error communicating with AI service:", error);
//     return "Sorry, I couldn't process that request.";
//   }
// };
export const sendMessageToAI = async (query) => {
  try {
    const response = await fetch("http://localhost:8001/financial-rag-chat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: "sushil@gmail.com", // Hardcoded email
        query: query 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I couldn't process your request.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};
  
