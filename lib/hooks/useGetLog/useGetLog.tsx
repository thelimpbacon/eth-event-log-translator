import { useCallback, useState } from "react";
import { useWeb3 } from "../useWeb3";
import eventParser from "@lib/utils/eventParser";

interface GetLogProps {
  contractAddress: string;
  transactionHash: string;
  abi: string;
}

const useGetLog = () => {
  const { library } = useWeb3();
  const [receipt, setReceipt] = useState<any>();
  const [logs, setLogs] = useState<any>();
  const [errors, setErrors] = useState<{ receipt: any; logs: any }>({ receipt: null, logs: null });

  const getReceipt = useCallback(
    async ({ contractAddress, transactionHash, abi }: GetLogProps) => {
      setErrors({ receipt: null, logs: null });
      setLogs(undefined);
      setReceipt(undefined);

      if (!contractAddress || !abi || !library || !transactionHash) {
        return null;
      }
      try {
        const receipt = await library.getTransactionReceipt(transactionHash);
        setReceipt(receipt);
      } catch (error) {
        setErrors({ receipt: error, logs: error }); // if reciept fails, set error on logs as well then bounce
        return;
      }

      try {
        const logs = eventParser(receipt, abi);
        setLogs(logs);
      } catch (error) {
        setErrors({ ...errors, logs: error });
      }
    },
    [library]
  );

  return { getReceipt, receipt, logs, errors };
};

export default useGetLog;
