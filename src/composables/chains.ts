import { computed, markRaw } from "vue";
import avaxLogo from "@/assets/svgs/avax-logo.svg";
import bnbLogo from "@/assets/svgs/bnb-logo.svg";
import ethereumLogo from "@/assets/svgs/ethereum-logo.svg";
import polygonLogo from "@/assets/svgs/polygon-logo.svg";
const chains = [
  {
    name: "Ethereum Mainnet",
    chainId: "0x1",
    icon: markRaw(ethereumLogo as {}),
    isMainnet: true,
  },
  {
    name: "Ropsten (Ethereum Testnet)",
    chainId: "0x3",
    icon: markRaw(ethereumLogo as {}),
    isMainnet: false,
  },
  {
    name: "Rinkeby (Ethereum Testnet)",
    chainId: "0x4",
    icon: markRaw(ethereumLogo as {}),
    isMainnet: false,
  },
  {
    name: "Goerli (Ethereum Testnet)",
    chainId: "0x",
    icon: markRaw(ethereumLogo as {}),
    isMainnet: false,
  },
  {
    name: "Kovan (Ethereum Testnet)",
    chainId: "0x2a",
    icon: markRaw(ethereumLogo as {}),
    isMainnet: false,
  },
  {
    name: "Binance Smart Chain Mainnet",
    chainId: "0x38",
    icon: markRaw(bnbLogo as {}),
    isMainnet: true,
  },
  {
    name: "Binance Smart Chain Testnet",
    chainId: "0x61",
    icon: markRaw(bnbLogo as {}),
    isMainnet: false,
  },
  {
    name: "Polygon (Matic) Mainnet",
    chainId: "0x89",
    icon: markRaw(polygonLogo as {}),
    isMainnet: true,
  },
  {
    name: "Mumbai (Matic Testnet)",
    chainId: "0x13881",
    icon: markRaw(polygonLogo as {}),
    isMainnet: false,
  },
  {
    name: "Avalanche Mainnet",
    chainId: "0xa86a",
    icon: markRaw(avaxLogo as {}),
    isMainnet: true,
  },
  {
    name: "Avalanche Testnet",
    chainId: "0xa869",
    icon: markRaw(avaxLogo as {}),
    isMainnet: false,
  },
];

const mainnetChains = computed(() =>
  chains.filter((item) => item.isMainnet === true)
);

const testnetChains = computed(() =>
  chains.filter((item) => item.isMainnet === false)
);

export const useChain = () => {
  return { chains, mainnetChains, testnetChains };
};
