import React, { useCallback, useState } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3 } from "../useWeb3";

interface GetLogProps {
  contractAddress: string;
  transaction: string;
  abi: string;
}

const useGetLog = () => {
  const { library } = useWeb3();
  const [receipt, setReceipt] = useState<any>();
  const [logs, setLogs] = useState<any>();

  const getReceipt = useCallback(
    async ({ contractAddress, transaction, abi }: GetLogProps) => {
      if (!contractAddress || !abi || !library || !transaction) {
        return null;
      }
      try {
        const contract = new Contract(contractAddress, abi, library.getSigner());
        const receipt = await library.getTransactionReceipt(transaction);
        setReceipt(receipt);
        let iface = new ethers.utils.Interface(abi);
        let log = iface.parseLog(receipt.logs[2]);
        setLogs(log);
      } catch (error) {
        console.error(error);
      }
    },
    [library]
  );

  return { getReceipt, receipt, logs };
};

export default useGetLog;
