import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { useWeb3 } from "@lib/hooks";

const useContract = <Type extends Contract = Contract>(address: string, ABI: any): Type | null => {
  const { library, account, chainId } = useWeb3();
  // cache it
  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account as string));
    } catch (error) {
      throw Error("Failed To Get Contract");
    }
  }, [address, ABI, library, account, chainId]) as Type;
};

export default useContract;
