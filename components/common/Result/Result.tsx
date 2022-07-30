import React from "react";

interface ResultProps {
  label: string;
  result: string;
  error: string;
}

const Result = ({ label, result, error }: ResultProps) => {
  return (
    <div className="h-[80vh] flex flex-col">
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</div>
      <pre className="h-full text-xs overflow-y-scroll block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600  dark:text-white">
        {error ? (
          <span className="text-red-500">Error {JSON.stringify(error, null, 2)} </span>
        ) : (
          JSON.stringify(result, null, 2)
        )}
      </pre>
    </div>
  );
};

export default Result;
