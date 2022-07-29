import React, { Fragment, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string | undefined;
}

const CustomInput = ({ label, error, ...inputProps }: CustomInputProps) => {
  return (
    <Fragment>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {label}
      </label>
      <input
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...inputProps}
      />

      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
        {error}
      </span>
    </Fragment>
  );
};

export default CustomInput;
