import { useState } from "react";
import { motion } from "framer-motion"

const AIPoweredInsights = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      const response = await fetch("http://localhost:8080/ai-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Failed to get an answer. Please try again.");
    }
  };

  return (
    <motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}

		>
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-800 text-white ">
      <input
        className="w-full p-2 text-white rounded-lg"
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleAsk} className="w-full mt-2 bg-[#36454F] px-4 py-2 rounded-lg">
        Ask
      </button>
      <textarea
        className="w-full mt-2 p-2 text-white rounded-lg"
        value={answer}
        readOnly
        placeholder="Answer will appear here..."
      />
    </div>
    </motion.div>
  );
};

export default AIPoweredInsights;
