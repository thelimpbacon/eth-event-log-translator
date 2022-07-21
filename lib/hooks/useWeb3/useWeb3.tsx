import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";

const useWeb3 = (): Web3ReactContextInterface<Web3Provider> => {
  return useWeb3React<Web3Provider>();
};

export default useWeb3;
