import { useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

class MetamaskQueue {
  private static instance: MetamaskQueue;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private account: string | null = null;
  private error: string | null = null;
  private queue: (() => Promise<void>)[] = [];
  private processing = false;

  private constructor() {}

  // Singleton instance to ensure a single connection request is processed at a time
  public static getInstance(): MetamaskQueue {
    if (!MetamaskQueue.instance) {
      MetamaskQueue.instance = new MetamaskQueue();
    }
    return MetamaskQueue.instance;
  }

  // Function to connect to MetaMask with a queue system to manage requests
  public async connectWallet(): Promise<{ provider: ethers.BrowserProvider | null; signer: ethers.JsonRpcSigner | null; account: string | null; error: string | null }> {
    return new Promise((resolve) => {
      this.queue.push(async () => {
        try {
          if (!window.ethereum) {
            this.error = "MetaMask not installed.";
            return;
          }

          this.provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await this.provider.send("eth_requestAccounts", []);
          this.signer = await this.provider.getSigner();
          this.account = accounts[0];
          this.error = null;
        } catch (err: any) {
          console.error("MetaMask connection error:", err);
          this.error = "Error connecting to MetaMask.";
        } finally {
          resolve({
            provider: this.provider,
            signer: this.signer,
            account: this.account,
            error: this.error,
          });
          this.processing = false;
          this.processQueue();
        }
      });

      if (!this.processing) {
        this.processing = true;
        this.processQueue();
      }
    });
  }

  // Process the queue to handle one request at a time
  private async processQueue() {
    if (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) await task();
    }
  }
}

// Custom hook to interact with MetaMask and handle account connection
export const useMetamaskQueue = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const metamask = MetamaskQueue.getInstance();

  // Method to connect wallet
  const connectWallet = async () => {
    const { provider, signer, account, error } = await metamask.connectWallet();
    setProvider(provider);
    setSigner(signer);
    setAccount(account);
    setError(error);
  };

  // Effect to auto-connect to MetaMask on component mount
  useEffect(() => {
    connectWallet(); // Auto-connect on load
  }, []);

  return { provider, signer, account, error, connectWallet }; // Return all relevant states and connectWallet function
};