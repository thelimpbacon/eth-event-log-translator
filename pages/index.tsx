import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { isAddress } from "ethers/lib/utils";
import { useGetLog } from "@lib/hooks";

export type FormInputs = {
  contractAddress: string;
  transactionHash: string;
  abi: string;
};

export default function Home() {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<FormInputs>();
  const { getReceipt, receipt, logs, errors } = useGetLog();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    getReceipt(data);
  };

  return (
    <div className="min-h-screen grid w-full grid-cols-3 text-white gap-6">
      <div>
        <form className="flex flex-col gap-4 col-span-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Contract address
            </label>
            <input
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0x90b1cba89ecc85d950c4ca4ae0e077fcabb19f93"
              {...register("contractAddress", {
                required: { value: true, message: "This is required" },
                validate: { validAddress: (value) => isAddress(value) || "Invalid address" },
              })}
            />

            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formErrors.contractAddress?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Transaction hash
            </label>
            <input
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0x601f30208c2e1bc28649ce37433e44a0ea4e6d4da38420dbd1b3ecf2694ed98f"
              {...register("transactionHash", {
                required: { value: true, message: "This is required" },
              })}
            />

            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formErrors.transactionHash?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Contract ABI
            </label>
            <textarea
              rows={15}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={sampleABI}
              {...register("abi", {
                required: { value: true, message: "This is required" },
              })}
            />

            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {formErrors.abi?.message}
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center items-center py-2.5 px-4 font-medium  text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 "
          >
            Submit
          </button>
        </form>

        <div className="text-red-600 mt-6">{JSON.stringify(errors, null, 2)}</div>
      </div>
      <div className="grid grid-cols-2 col-span-2">
        <div className="border border-gray-500 whitespace-pre-wrap overflow-hidden">
          {JSON.stringify(receipt, null, 2)}
        </div>
        <div className="border border-gray-500 whitespace-pre-wrap overflow-hidden">
          {JSON.stringify(logs, null, 2)}
        </div>
      </div>
    </div>
  );
}

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
