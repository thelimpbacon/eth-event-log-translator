import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useGetLog } from "@lib/hooks";
import { AbiTextArea, CustomInput } from "@components/common";
import { isAddress } from "ethers/lib/utils";

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
            <CustomInput
              label="Contract address"
              placeholder="0x90b1cba89ecc85d950c4ca4ae0e077fcabb19f93"
              {...register("contractAddress", {
                required: { value: true, message: "This is required" },
                validate: { validAddress: (value) => isAddress(value) || "Invalid address" },
              })}
              error={formErrors.contractAddress?.message}
            />
          </div>
          <div className="flex flex-col">
            <CustomInput
              label="Transaction hash"
              placeholder="0x601f30208c2e1bc28649ce37433e44a0ea4e6d4da38420dbd1b3ecf2694ed98f"
              {...register("transactionHash", {
                required: { value: true, message: "This is required" },
                validate: { validAddress: (value) => isAddress(value) || "Invalid address" },
              })}
              error={formErrors.transactionHash?.message}
            />
          </div>
          <div className="flex flex-col">
            <AbiTextArea
              {...register("abi", {
                required: { value: true, message: "This is required" },
              })}
              error={formErrors.abi?.message}
            />
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
