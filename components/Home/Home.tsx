import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { isAddress } from "ethers/lib/utils";
import { useGetLog } from "@lib/hooks";
import s from "./Home.module.css";
import { Result } from "@components/common";

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
    <div className="md:h-[90vh] grid w-full grid-cols-1 lg:grid-cols-3 text-white gap-6">
      <div>
        <form className="flex flex-col gap-4 col-span-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className={s.label}>Contract address</label>
            <input
              className={s.input}
              placeholder="0x90b1cba89ecc85d950c4ca4ae0e077fcabb19f93"
              {...register("contractAddress", {
                required: { value: true, message: "This is required" },
                validate: { validAddress: (value) => isAddress(value) || "Invalid address" },
              })}
            />

            <span className={s.error}>{formErrors.contractAddress?.message}</span>
          </div>

          <div className="flex flex-col">
            <label className={s.label}>Transaction hash</label>
            <input
              className={s.input}
              placeholder="0x601f30208c2e1bc28649ce37433e44a0ea4e6d4da38420dbd1b3ecf2694ed98f"
              {...register("transactionHash", {
                required: { value: true, message: "This is required" },
              })}
            />

            <span className={s.error}>{formErrors.transactionHash?.message}</span>
          </div>

          <div className="flex flex-col">
            <label className={s.label}>Contract ABI</label>
            <textarea
              rows={16}
              className={s.input}
              placeholder={sampleABI}
              {...register("abi", {
                required: { value: true, message: "This is required" },
              })}
            />

            <span className={s.error}>{formErrors.abi?.message}</span>
          </div>

          <div className="">
            <button
              type="submit"
              className="w-full lg:w-1/2 lg:max-w-[15em] inline-flex justify-center items-center py-2.5 px-4 font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <Result label="Receipt" result={receipt} />

      <Result label="Logs" result={logs} />
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
