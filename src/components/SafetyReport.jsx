import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FiAlertCircle, FiClipboard } from "react-icons/fi";

function SafetyReport({ response }) {
  if (!response) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
      {/* Report Header */}
      <div className="bg-blue-600 px-6 py-3 flex items-center gap-2 text-white">
        <FiClipboard className="text-xl" />
        <h2 className="font-bold tracking-wide">CLINICAL ANALYSIS REPORT</h2>
      </div>

      {/* Report Body */}
      <div className="p-6 md:p-8 prose dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            // Custom styling for markdown elements
            h1: ({node, ...props}) => <h1 className="text-xl font-bold text-blue-600 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2 border-b border-gray-100 dark:border-gray-800 pb-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-blue-700 dark:text-blue-400" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
            li: ({node, ...props}) => <li className="pl-1" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
          }}
        >
          {response}
        </ReactMarkdown>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-start gap-3">
        <FiAlertCircle className="text-amber-500 mt-1 flex-shrink-0" />
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
          IMPORTANT: This AI-generated analysis is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
        </p>
      </div>
    </div>
  );
}

export default SafetyReport;