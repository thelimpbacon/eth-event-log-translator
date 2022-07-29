import React, { Fragment, TextareaHTMLAttributes } from "react";

const sampleABI = `[
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]`;

interface AbiTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error: string | undefined;
}

const AbiTextArea = ({ error, ...textAreaProps }: AbiTextAreaProps) => {
  return (
    <Fragment>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Contract ABI
      </label>
      <textarea
        rows={15}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={sampleABI}
        {...textAreaProps}
      />

      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
        {error}
      </span>
    </Fragment>
  );
};

export default AbiTextArea;
