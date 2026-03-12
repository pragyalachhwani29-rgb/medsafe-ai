import { useState } from "react";
import ReactMarkdown from "react-markdown"; 
import { askAi } from "../services/aiAPI"; 
import { FiMessageSquare, FiSend, FiCpu, FiAlertCircle } from "react-icons/fi";

function ChatAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    
    try {
      const result = await askAi(question);
      setAnswer(result);
    } catch (error) {
      setAnswer("⚠️ Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex justify-center items-center gap-2">
          <FiMessageSquare className="text-green-500" /> AI Medical Chat
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Ask any general medical safety or medication questions.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
          placeholder="Ask a medical question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="px-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl transition-all flex items-center justify-center shadow-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <FiSend className="text-xl" />
          )}
        </button>
      </div>

      {answer && (
        <div className="mt-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
          <div className="bg-green-600 px-6 py-3 flex items-center gap-2 text-white font-bold">
            <FiCpu className="text-xl" />
            <span>AI GUIDANCE</span>
          </div>

          <div className="p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              {/* THIS PART FIXES THE MARKDOWN ERROR */}
              <ReactMarkdown
                components={{
                  h1: ({...props}) => <h1 className="text-xl font-bold text-green-600 mb-4" {...props} />,
                  h2: ({...props}) => <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2 border-b dark:border-gray-800 pb-1" {...props} />,
                  strong: ({...props}) => <strong className="font-bold text-green-700 dark:text-green-400" {...props} />,
                  ul: ({...props}) => <ul className="list-disc ml-5 space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
                  li: ({...props}) => <li className="pl-1" {...props} />,
                  p: ({...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
                }}
              >
                {answer}
              </ReactMarkdown>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 px-6 py-3 border-t border-amber-100 dark:border-amber-900/30 flex items-center gap-2">
            <FiAlertCircle className="text-amber-600 flex-shrink-0" />
            <p className="text-[10px] text-amber-700 dark:text-amber-500 uppercase font-bold tracking-wider">
              Consult a doctor for official medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatAssistant;