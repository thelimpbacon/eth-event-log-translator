import React, { ReactNode } from "react";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

interface Web3ProviderProps {
  children: ReactNode;
}

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
  const library = new Web3Provider(provider);
  return library;
};

const Web3Manager = ({ children }: Web3ProviderProps): JSX.Element => {
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};

export default Web3Manager;
