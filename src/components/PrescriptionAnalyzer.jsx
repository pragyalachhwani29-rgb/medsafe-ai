import { useState } from "react";
import ReactMarkdown from "react-markdown"; 
import { askAi } from "../services/aiAPI"; 
import { FiFileText, FiSearch } from "react-icons/fi";

function PrescriptionAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult("");

    const prompt = `Analyze this prescription text:\n\n${text}\n\nIdentify medicines and provide safety warnings or general usage instructions.`;
    
    try {
      const response = await askAi(prompt);
      setResult(response);
    } catch (error) {
      setResult("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex justify-center items-center gap-2">
          <FiFileText className="text-purple-500" /> Prescription Analyzer
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Paste your prescription details below for AI analysis.
        </p>
      </div>

      <div className="mb-6">
        <textarea
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 min-h-[150px]"
          placeholder="Paste prescription text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={analyze}
        disabled={loading || !text.trim()}
        className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
      >
        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <FiSearch />}
        {loading ? "Analyzing..." : "Analyze Prescription"}
      </button>

      {result && (
        <div className="mt-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
          <div className="bg-purple-600 px-6 py-3 text-white font-bold">
            ANALYSIS RESULTS
          </div>
          <div className="p-6 md:p-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* THIS COMPONENT FIXES THE MARKDOWN ERROR */}
            <ReactMarkdown
              components={{
                h1: ({...props}) => <h1 className="text-xl font-bold text-purple-600 mb-4" {...props} />,
                h2: ({...props}) => <h2 className="text-lg font-bold mt-6 mb-2 border-b dark:border-gray-800 pb-1" {...props} />,
                ul: ({...props}) => <ul className="list-disc ml-5 space-y-2 mb-4" {...props} />,
                li: ({...props}) => <li className="pl-1" {...props} />,
                p: ({...props}) => <p className="mb-4" {...props} />,
                strong: ({...props}) => <strong className="text-purple-700 dark:text-purple-400 font-bold" {...props} />
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrescriptionAnalyzer;