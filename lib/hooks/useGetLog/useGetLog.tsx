import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../useWeb3";

interface GetLogProps {
  contractAddress: string;
  transactionHash: string;
  abi: string;
}

const useGetLog = () => {
  const { library } = useWeb3();
  const [receipt, setReceipt] = useState<any>();
  const [logs, setLogs] = useState<any>();
  const [errors, setErrors] = useState<any>();

  const getReceipt = useCallback(
    async ({ contractAddress, transactionHash, abi }: GetLogProps) => {
      setErrors(undefined);
      setLogs(undefined);
      setReceipt(undefined);

      if (!contractAddress || !abi || !library || !transactionHash) {
        return null;
      }
      try {
        const receipt = await library.getTransactionReceipt(transactionHash);
        setReceipt(receipt);

        let iface = new ethers.utils.Interface(abi);
        if (receipt.logs.length === 0) return;

        let parsedEvents = [];

        for (let event of receipt.logs) {
          try {
            const ethersParsed = iface.parseLog(event);
            parsedEvents.push(ethersParsed);
          } catch (error) {
            setLogs(undefined);
            setReceipt(undefined);
            setErrors(error);
          }
        }

        setLogs(parsedEvents);
      } catch (error) {
        console.error(error);
        setLogs(undefined);
        setReceipt(undefined);
        setErrors(error);
      }
    },
    [library]
  );

  return { getReceipt, receipt, logs, errors };
};

export default useGetLog;
