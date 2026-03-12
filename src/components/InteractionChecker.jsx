import { useState } from "react";
import { askAi } from "../services/aiAPI";
import SafetyReport from "./SafetyReport";
import { FiShield, FiLoader } from "react-icons/fi";

function InteractionChecker() {
  const [med1, setMed1] = useState("");
  const [med2, setMed2] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const checkInteraction = async () => {
    if (!med1 || !med2) return;
    setLoading(true);
    setResponse("");

    const prompt = `Check interaction between Medicine A: ${med1} and Medicine B: ${med2}. Provide: Safety Level, Interaction Risk, and Recommendation.`;
    const result = await askAi(prompt);

    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Check Drug Interactions</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Enter two medications to analyze potential safety risks.</p>
      </div>

      <div className="space-y-4 mb-6">
        <input
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          placeholder="Medicine A (e.g., Aspirin)"
          value={med1}
          onChange={(e) => setMed1(e.target.value)}
        />
        <input
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          placeholder="Medicine B (e.g., Warfarin)"
          value={med2}
          onChange={(e) => setMed2(e.target.value)}
        />
      </div>

      <button
        onClick={checkInteraction}
        disabled={loading || !med1 || !med2}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-blue-500/30"
      >
        {loading ? <FiLoader className="animate-spin text-xl" /> : <FiShield className="text-xl" />}
        {loading ? "Analyzing Safety..." : "Check Safety"}
      </button>

      <SafetyReport response={response} />
    </div>
  );
}

export default InteractionChecker;