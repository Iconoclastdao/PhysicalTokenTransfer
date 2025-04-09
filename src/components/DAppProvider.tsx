import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

interface DAppContextProps {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  address: string;
  connectWallet: () => Promise<void>;
  wrongNetwork: boolean;
}

const DAppContext = createContext<DAppContextProps>({
  provider: null,
  signer: null,
  address: "",
  connectWallet: async () => {},
  wrongNetwork: false,
});

const EXPECTED_CHAIN_ID = 42161; // For example, Goerli testnet chain ID

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#f7f8fa",
        color: "gray.800",
      },
    },
  },
});

export const DAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string>("");
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        await newProvider.send("eth_requestAccounts", []);
        const newSigner = await newProvider.getSigner();
        const userAddress = await newSigner.getAddress();
        const network = await newProvider.getNetwork();

        setProvider(newProvider);
        setSigner(newSigner);
        setAddress(userAddress);
        // Convert chainId to a number for comparison if needed
        setWrongNetwork(Number(network.chainId) !== EXPECTED_CHAIN_ID);
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
        alert("Failed to connect to MetaMask. Check the console for details.");
      }
    } else {
      alert("MetaMask not detected. Please install or enable it.");
    }
  }, []);

  useEffect(() => {
    if (window.ethereum && provider) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.");
          setSigner(null);
          setAddress("");
        } else {
          const newSigner = await provider.getSigner();
          setAddress(await newSigner.getAddress());
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const chainId = Number(BigInt(chainIdHex)); // Convert hex string to number
        setWrongNetwork(chainId !== EXPECTED_CHAIN_ID);
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [provider]);

  return (
    <ChakraProvider theme={theme}>
      <DAppContext.Provider value={{ provider, signer, address, connectWallet, wrongNetwork }}>
        {children}
      </DAppContext.Provider>
    </ChakraProvider>
  );
};

export const useDApp = () => useContext(DAppContext);


