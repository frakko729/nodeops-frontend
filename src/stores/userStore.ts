import { markRaw } from "vue";
import { useNotification } from "./../composables/notification";
import { defineStore } from "pinia";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useApi } from "@/composables/api";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Router } from "vue-router";
import Cookies from "js-cookie";

const signLoginMessage = "Login to LinkConnect";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false as boolean,
    isWeb3Connected: false as boolean,
    address: undefined as string | undefined,
    email: undefined as string | undefined,
    provider: undefined as Web3Provider | undefined,
    signer: undefined as JsonRpcSigner | undefined,
    $router: undefined as Router | undefined,
  }),

  getters: {
    shortAdress: (state): string =>
      state.address
        ? `${state.address.substring(0, 5)}...${state.address.substring(
            38,
            42
          )}`
        : "",
  },
  actions: {
    async connectWeb3() {
      try {
        // create ethers provider by windows ethereum object
        const { ethereum } = window;
        this.provider = markRaw(new ethers.providers.Web3Provider(ethereum));

        if (this.provider) {
          // MetaMask requires requesting permission to connect users accounts
          await this.provider.send("eth_requestAccounts", []);

          // The MetaMask plugin also allows signing transactions to
          // send ether and pay to change state within the blockchain.
          // For this, you need the account signer...
          this.signer = this.provider.getSigner();

          if (this.signer) {
            this.address = await this.signer.getAddress();
            this.isWeb3Connected = true;
          }
        }
      } catch (error) {
        console.log(error);
        this.isWeb3Connected = false;
      }
    },
    async connectWeb3Modal() {
      try {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "b1e07b5ba6fc4b6ebc64fbe70755250d", // required
            },
          },
        };

        const web3Modal = new Web3Modal({
          network: "mainnet", // optional
          cacheProvider: true, // optional
          providerOptions, // required
        });

        const instance = await web3Modal.connect();

        this.provider = markRaw(new ethers.providers.Web3Provider(instance));

        if (this.provider) {
          // MetaMask requires requesting permission to connect users accounts
          await this.provider.send("eth_requestAccounts", []);

          // The MetaMask plugin also allows signing transactions to
          // send ether and pay to change state within the blockchain.
          // For this, you need the account signer...
          this.signer = this.provider.getSigner();

          if (this.signer) {
            this.address = await this.signer.getAddress();
            this.isWeb3Connected = true;
          }
        }
      } catch (error) {
        console.log(error);
        this.isWeb3Connected = false;
      }
    },
    async login() {
      const { showError } = useNotification();
      try {
        // create web3 connectivity
        await this.connectWeb3Modal();

        // get csrf cookie for authentication  https://laravel.com/docs/9.x/sanctum#spa-authenticating
        const { get: getCsrfCookie } = useApi("sanctum/csrf-cookie");
        await getCsrfCookie();

        // sign message to make sure user is owner of wallet
        const signature = await this.signer?.signMessage(signLoginMessage);

        // send message, signature and address to backend for authentication
        const { post: authenticate, error } =
          useApi<Backend.Models.User>("api/user/login");

        const result = await authenticate({
          message: signLoginMessage,
          signature: signature,
          address: this.address,
        });

        // check for errors from backend and set authentication status and email
        if (!error.value) {
          this.email = result.email;
          this.isAuthenticated = true;

          if (this.$router) {
            this.$router.push({ name: "dashboard" });
          }
        } else {
          console.log(error.value);
          this.isAuthenticated = false;
          showError();
        }
      } catch (error) {
        console.log(error);
        this.isAuthenticated = false;
        showError();
      }
    },
    async loginFromToken(redirect: string) {
      try {
        const { get, error } = useApi<Backend.Models.User>("api/user");

        const result = await get();
        if (!error.value) {
          this.email = result.email;
          this.address = result.eth_address;
          this.isAuthenticated = true;

          if (this.$router) {
            this.$router.push({ path: redirect });
          }
        } else {
          console.log(error.value);
          this.isAuthenticated = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateEmail(email: string) {
      if (this.isAuthenticated && email !== this.email) {
        try {
          const { patch, error } =
            useApi<Backend.Models.User>("api/user/email");

          const result = await patch({ email: email });

          if (!error.value) {
            const { showSuccess } = useNotification();
            this.email = result.email;
            showSuccess("Your email address sucessfully updaded.");
          } else {
            console.log(error.value);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.isWeb3Connected = false;
      this.address = undefined;
      this.email = undefined;
      this.provider = undefined;
      this.signer = undefined;

      Cookies.remove("XSRF-TOKEN");

      this.$router?.push("/");
    },
  },
});
