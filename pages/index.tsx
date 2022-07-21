import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetLog } from "@lib/hooks";

type Inputs = {
  contractAddress: string;
  transaction: string;
  abi: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { getReceipt, receipt, logs, errors } = useGetLog();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    getReceipt(data);
  };
  console.log(logs);
  return (
    <div className="min-h-screen grid w-full grid-cols-3 text-white gap-6">
      <div>
        <form className="flex flex-col gap-4 col-span-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="contractAddress">Contract address</label>
            <input className="text-black" {...register("contractAddress", { required: true })} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="transaction">Transaction</label>
            <input className="text-black" {...register("transaction", { required: true })} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="abi">ABI</label>
            <textarea className="text-black" rows={15} {...register("abi", { required: true })} />
          </div>

          <button type="submit">submit</button>

          <div className="text-red-600 mt-6">{JSON.stringify(errors, null, 2)}</div>
        </form>
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
