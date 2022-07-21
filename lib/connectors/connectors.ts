import { InjectedConnector } from "@web3-react/injected-connector";
import { Chain } from "@lib/constants";

export const injected = new InjectedConnector({
  supportedChainIds: [Chain.ETHEREUM, Chain.AURORA, Chain.AURORA_TESTNET, Chain.RINKEBY],
});
