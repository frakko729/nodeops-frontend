import { useNotification } from "./notification";
import { computed, reactive, Ref, ref } from "vue";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

const address = <Ref<string>>ref();
const isConnected = ref(false);
let provider: Web3Provider | undefined = undefined;
let signer: JsonRpcSigner | undefined = undefined;

const getAddress = computed((): string => address.value);

const blockTime = 8000;
const gas = <Ref<number>>ref();

const connect = async () => {
  if (provider) {
    try {
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      signer = provider.getSigner();

      if (signer) {
        address.value = await signer.getAddress();
        isConnected.value = true;
        console.log("Connected: ", address.value);
      }
    } catch (error) {
      console.log(error);
      isConnected.value = false;
    }
  }
};

const mint = async (amount: number) => {
  const { showError, showSuccess } = useNotification();
  if (isConnected.value) {
    if (amount === 1) {
      showSuccess("You successfully minted your NFT.");
    } else {
      showSuccess("You successfully minted your NFT's.");
    }
  } else {
    showError("You need to connect to your wallet.");
  }
};

const getGas = () => {
  if (provider) {
    try {
      provider.getGasPrice().then((data: BigNumber) => {
        gas.value = Number(ethers.utils.formatUnits(data, "gwei"));
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("no web3 provider found!");
  }
};

export const useWallet = () => {
  if (!provider) {
    const { ethereum } = window;
    if (ethereum) {
      provider = new ethers.providers.Web3Provider(ethereum);
      getGas();
    }
  }

  setInterval(getGas, blockTime);

  return { connect, getGas, getAddress, isConnected, gas, mint };
};
