import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Arbitrum One chainId in hex (42161 decimal)
  const ARBITRUM_CHAIN_ID = "0xA4B1";

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("❌ MetaMask is not installed. Please install it.");
      return;
    }

    try {
      // ✅ Request MetaMask connection
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);

      // ✅ Get the current chain ID
      const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== ARBITRUM_CHAIN_ID) {
        try {
          // ✅ Switch to Arbitrum
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ARBITRUM_CHAIN_ID }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            // ✅ Add Arbitrum One to MetaMask
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: ARBITRUM_CHAIN_ID,
                    chainName: "Arbitrum One",
                    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                    blockExplorerUrls: ["https://arbiscan.io"],
                  },
                ],
              });
            } catch (addError) {
              console.error("❌ Failed to add Arbitrum network:", addError);
              setError("Failed to add Arbitrum One network.");
            }
          } else {
            console.error("❌ Failed to switch network:", switchError);
            setError("Failed to switch to Arbitrum One.");
          }
        }
      }

      // ✅ Set up ethers provider and signer
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();

      setProvider(_provider);
      setSigner(_signer);
    } catch (err) {
      console.error("❌ Wallet connection error:", err);
      setError("Error connecting to MetaMask.");
    }
  };

  // ✅ Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);

  return { account, provider, signer, error, connectWallet };
};