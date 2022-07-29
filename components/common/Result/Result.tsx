import React from "react";

interface ResultProps {
  label: string;
  result: string;
}

const Result = ({ label, result }: ResultProps) => {
  return (
    <div className="max-h-[80vh]">
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</div>
      <pre className="h-full text-xs overflow-y-scroll block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600  dark:text-white">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default Result;
