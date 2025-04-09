import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMetamask } from "../hooks/useMetamask";

interface ABIInput {
  name: string;
  type: string;
}

interface ABIItem {
  name: string;
  type: string;
  stateMutability?: string;
  inputs?: ABIInput[];
}

// Hardcoded contract address and ABI
const HARD_CODED_CONTRACT_ADDRESS = "0x48D8C18F34d8A27383ADfb118522c1e3b7242168"; // Replace with your contract address
const HARD_CODED_ABI = `[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "passwordHash",
        "type": "bytes32"
      }
    ],
    "name": "depositERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "passwordHash",
        "type": "bytes32"
      }
    ],
    "name": "depositETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeCollector",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "ContractPaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "ContractUnpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newFeeCollector",
        "type": "address"
      }
    ],
    "name": "FeeCollectorUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "voucherId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "redeemVoucher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newFeeCollector",
        "type": "address"
      }
    ],
    "name": "setFeeCollector",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "voucherId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "oldPassword",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "newPasswordHash",
        "type": "bytes32"
      }
    ],
    "name": "transferVoucher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voucherId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "netAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isEth",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      }
    ],
    "name": "VoucherCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voucherId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "netAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isEth",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "redeemedAt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      }
    ],
    "name": "VoucherRedeemed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "voucherId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "transferCount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lastTransferAt",
        "type": "uint256"
      }
    ],
    "name": "VoucherTransferred",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "FEE_DENOMINATOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FEE_NUMERATOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeCollector",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "vouchers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "secretHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "transferCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "redeemed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isEth",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastTransferAt",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`;

const PhysicalTokenTransfer: React.FC = () => {
    const { account, connectWallet, signer } = useMetamask();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [response, setResponse] = useState<string>("");
  const [abiMethods, setAbiMethods] = useState<ABIItem[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [interfaceCode, setInterfaceCode] = useState<string>("");

  // Generate a TypeScript interface based on the ABI methods
  const generateInterfaceCode = (abi: ABIItem[]) => {
    const code = `
interface ContractInterface {
  ${abi
    .map(
      (fn) =>
        `${fn.name}(${fn.inputs
          ?.map((input) => `${input.name}: ${input.type}`)
          .join(", ")}): Promise<any>;`
    )
    .join("\n  ")}
}
    `;
    console.log("Generated TypeScript Interface:\n", code);
    return code;
  };

  // Initialize the contract instance using the hardcoded address and ABI
  const initializeContract = async () => {
    try {
      if (!signer) {
        setResponse("❌ Please connect your wallet.");
        return;
      }

      // Parse the hardcoded ABI and filter only functions
      const parsedABI: ABIItem[] = JSON.parse(HARD_CODED_ABI);
      const filteredMethods = parsedABI.filter((fn) => fn.type === "function");

      // Create a new contract instance using the hardcoded address and ABI
      const contractInstance = new ethers.Contract(
        HARD_CODED_CONTRACT_ADDRESS,
        parsedABI,
        signer
      );

      setAbiMethods(filteredMethods);
      setContract(contractInstance);
      setInterfaceCode(generateInterfaceCode(filteredMethods));
      setResponse("✅ Contract Initialized!");
    } catch (error: any) {
      console.error("🚨 Error initializing contract:", error);
      setResponse("❌ Invalid ABI or contract address.");
    }
  };


  const executeFunction = async (methodName: string, isView: boolean) => {
    if (!contract) {
      alert("⚠️ Contract not initialized!");
      return;
    }
    setResponse("");

    try {
      const args = inputValues[methodName] || [];
      const result = isView
        ? await contract[methodName](...args)
        : await (await contract[methodName](...args)).wait();

      const formattedResult = Array.isArray(result)
        ? result.map((item) => (typeof item === "bigint" ? item.toString() : item))
        : typeof result === "bigint"
        ? result.toString()
        : result;

      setResponse(
        isView
          ? `✅ Fetched: ${JSON.stringify(formattedResult)}`
          : `✅ Transaction successful`
      );
    } catch (error: any) {
      console.error(`🚨 Error executing ${methodName}:`, error);
      setResponse(`❌ Error: ${error.message || error}`);
    }
  };

  useEffect(() => {
    if (signer) {
      initializeContract();
    }
  }, [signer]);


   return (
    <div style={{
      padding: "24px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#1E1E2F", // Deep navy background
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
      color: "LavenderBlush",
      fontFamily: "'Bradley DJR Variable', sans-serif"
    }}>
      
      {/* 🔹 Logo at the Top */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <img src="/logo.jpeg" alt="App Logo" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
        Private Transfers Of Assets
      </h2>

      {/* 🔹 Wallet Connection */}
      {account ? (
        <p style={{ color: "lightgreen", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>
          ✅ Wallet Connected: {account}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "indigo",
            color: "LavenderBlush",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid darkgray",
            width: "100%",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "all 0.3s ease-in-out"
          }}
        >
          🔗 Connect Wallet
        </button>
      )}

     

      {/* 🔹 Response Messages */}
      {response && (
        <p
          style={{
            marginTop: "10px",
            color: response.includes("✅") ? "lightgreen" : "red",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {response}
        </p>
      )}

      {/* 🔹 Contract Methods Section */}
      {contract && (
        <>
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #555",
              borderRadius: "12px",
              background: "#2A2A3D",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}
          >
            {/* 🔹 Replacing "Contract Methods" Title with Logo */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img src="/logo.jpeg" alt="Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            </div>

            {abiMethods.map((fn) => (
              <div key={fn.name} style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{fn.name}</h4>

                {/* 🔹 Inputs for functions */}
                {fn.inputs?.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`${input.name} (${input.type})`}
                    value={inputValues[fn.name]?.[index] || ""}
                    onChange={(e) =>
                      setInputValues((prev) => {
                        const currentValues = prev[fn.name] ? [...prev[fn.name]] : [];
                        currentValues[index] = e.target.value;
                        return { ...prev, [fn.name]: currentValues };
                      })
                    }
                    style={{
                      marginBottom: "5px",
                      padding: "10px",
                      border: "1px solid darkgray",
                      borderRadius: "12px",
                      width: "100%",
                      backgroundColor: "#333",
                      color: "LavenderBlush",
                      fontSize: "1rem"
                    }}
                  />
                ))}

                {/* 🔹 Execute Button */}
                <button
                  onClick={() =>
                    executeFunction(fn.name, fn.stateMutability === "view")
                  }
                  style={{
                    backgroundColor: "indigo",
                    color: "LavenderBlush",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "2px solid darkgray",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginTop: "5px",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  {fn.stateMutability === "view" ? "Fetch" : "Execute"}
                </button>
              </div>
            ))}
          </div>

          {/* 🔹 Underlying Code Section (Now with Logo Instead of Gold Title) */}
          {interfaceCode && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #555",
                borderRadius: "12px",
                background: "#2A2A3D",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* 🔹 Replacing "Underlying Code for the GUI" Title with Logo */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img src="/logo.jpeg" alt="Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
              </div>

              <pre
                style={{
                  background: "#1E1E2F",
                  padding: "12px",
                  borderRadius: "8px",
                  overflowX: "auto",
                  color: "LavenderBlush",
                  fontSize: "14px"
                }}
              >
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhysicalTokenTransfer;