export enum Chain {
  ETHEREUM = 1,
  RINKEBY = 4,
  ROPSTEN = 3,
  KOVAN = 42,
  AURORA = 1313161554,
  AURORA_TESTNET = 1313161555,
}

export interface Currency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface ChainInformation {
  name: string;
  /**block chain explorer */
  explorer: string;
  docs?: string;
  nativeCurrency?: Currency;
  rpcUrls?: Array<string>;
}

export type ChainId = number;

const chainList: Record<ChainId, ChainInformation> = {
  [Chain.ETHEREUM]: {
    name: "Ethereum",
    docs: "https://docs.uniswap.org",
    explorer: "https://etherscan.io",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [Chain.RINKEBY]: {
    name: "Rinkeby",
    explorer: "https://rinkeby.etherscan.io",
    rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    nativeCurrency: {
      name: "Rinkeby ETH",
      symbol: "rinkETH",
      decimals: 18,
    },
  },

  [Chain.AURORA]: {
    name: "Aurora",
    explorer: "https://aurorascan.dev",
    rpcUrls: ["https://mainnet.aurora.dev"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
  [Chain.AURORA_TESTNET]: {
    name: "Aurora Testnet",
    explorer: "https://testnet.aurorascan.dev",
    rpcUrls: ["https://testnet.aurora.dev"],

    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

export default chainList;
