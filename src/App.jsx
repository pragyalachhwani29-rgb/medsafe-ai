import { useState } from "react";
import Navbar from "./components/Navbar";
import InteractionChecker from "./components/InteractionChecker";
import ChatAssistant from "./components/ChatAssistant";
import PrescriptionAnalyzer from "./components/PrescriptionAnalyzer";
import { FiActivity, FiMessageSquare, FiFileText } from "react-icons/fi";

function App() {
  const [tab, setTab] = useState("interaction");

  const tabs = [
    { id: "interaction", label: "Interactions", icon: <FiActivity /> },
    { id: "chat", label: "AI Chat", icon: <FiMessageSquare /> },
    { id: "prescription", label: "Analyzer", icon: <FiFileText /> },
  ];

  return (
    <div className="min-h-screen bg-studio text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />

      <main className="max-w-3xl mx-auto pt-16 px-6 pb-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Intelligence for <span className="text-blue-600">Health Safety</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Advanced AI analysis for medication interactions and prescription clarity.
          </p>
        </div>

        {/* Minimalist Tab Switcher */}
        <div className="flex justify-center gap-1 mb-10 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-2xl w-fit mx-auto border border-gray-200 dark:border-gray-700">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === t.id
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Component Display */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-[0.07] dark:opacity-[0.15]"></div>
          <div className="relative">
            {tab === "interaction" && <InteractionChecker />}
            {tab === "chat" && <ChatAssistant />}
            {tab === "prescription" && <PrescriptionAnalyzer />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;