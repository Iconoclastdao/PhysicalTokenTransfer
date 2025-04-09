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

const HARD_CODED_CONTRACT_ADDRESS = "0x4ec7C1ef91654C432381a3450AAe42CEdD3E2b19"; // Replace with your contract address

const  HARD_CODED_ABI = `[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "allocateTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "revealData",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "nonce",
        "type": "bytes32"
      }
    ],
    "name": "approveTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      }
    ],
    "name": "assessRisk",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "riskLevel",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "commitment",
        "type": "bytes32"
      }
    ],
    "name": "commitRandomness",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "pools",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "coordinateRelayArbitrage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownerAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "label",
        "type": "string"
      }
    ],
    "name": "createCapsule",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "capsuleId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "capsuleId",
        "type": "uint256"
      }
    ],
    "name": "depositToCapsule",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "callTo",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "approveAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "contractOutputsToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
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
      }
    ],
    "name": "executeFlashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "inputs": [],
    "name": "ArbitrageTriggered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "capsuleId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "CapsuleCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "dataURI",
        "type": "string"
      }
    ],
    "name": "DataSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "droneId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "command",
        "type": "bytes"
      }
    ],
    "name": "DroneCommandIssued",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "EmergencyTriggered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "proposal",
        "type": "bytes32"
      }
    ],
    "name": "GovernanceProposalSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "commitHash",
        "type": "bytes32"
      }
    ],
    "name": "initiateTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "droneId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "command",
        "type": "bytes"
      }
    ],
    "name": "issueDroneCommand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mixFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "proposal",
        "type": "bytes32"
      }
    ],
    "name": "proposeGovernanceAction",
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
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Received",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "eventType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "details",
        "type": "string"
      }
    ],
    "name": "recordAnalyticsEvent",
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
        "internalType": "uint256",
        "name": "randomNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "revealRandomness",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "riskLevel",
        "type": "uint256"
      }
    ],
    "name": "RiskAssessed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "capsuleId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "routeCapsuleTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "dataURI",
        "type": "string"
      }
    ],
    "name": "submitData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "txHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "TransactionApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "commitHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "TransactionInitiated",
    "type": "event"
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
    "inputs": [],
    "name": "triggerArbitrage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "triggerEmergency",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "acl",
    "outputs": [
      {
        "internalType": "contract IACL",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "aiGovernance",
    "outputs": [
      {
        "internalType": "contract IAIGovernance",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "arbitrageController",
    "outputs": [
      {
        "internalType": "contract IArbitrageController",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "capsuleController",
    "outputs": [
      {
        "internalType": "contract ICapsuleController",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "capsuleFactory",
    "outputs": [
      {
        "internalType": "contract ICapsuleFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "capsuleRouter",
    "outputs": [
      {
        "internalType": "contract ICapsuleRouter",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "capsuleWallet",
    "outputs": [
      {
        "internalType": "contract ICapsuleWallet",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "congressAPI",
    "outputs": [
      {
        "internalType": "contract ICongressAPI",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dataSubmission",
    "outputs": [
      {
        "internalType": "contract IDataSubmission",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decentralizedWebAnalytics",
    "outputs": [
      {
        "internalType": "contract IDecentralizedWebAnalytics",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "droneRegistry",
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
    "name": "evaCoordinator",
    "outputs": [
      {
        "internalType": "contract IEVACoordinator",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeManager",
    "outputs": [
      {
        "internalType": "contract IFeeManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "foiaRequest",
    "outputs": [
      {
        "internalType": "contract IFOIARequest",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getAvailableLiquidity",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      }
    ],
    "name": "getTokenPrice",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserRandom",
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
    "name": "hiveCapsuleWallet",
    "outputs": [
      {
        "internalType": "contract IHiveCapsuleWallet",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "iconoclastAIToken",
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
    "name": "iconoclastHiveController",
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
    "name": "kmsVerifier",
    "outputs": [
      {
        "internalType": "contract IKMSVerifier",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityFragmentationExploiter",
    "outputs": [
      {
        "internalType": "contract ILiquidityFragmentationExploiter",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityManager",
    "outputs": [
      {
        "internalType": "contract ILiquidityManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "merkleCommit",
    "outputs": [
      {
        "internalType": "contract IMerkleTree",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "merkleTree",
    "outputs": [
      {
        "internalType": "contract IMerkleTree",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mixerPool",
    "outputs": [
      {
        "internalType": "contract IMixerPool",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "moduleRegistry",
    "outputs": [
      {
        "internalType": "contract IModuleRegistry",
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
    "name": "petition",
    "outputs": [
      {
        "internalType": "contract IPetition",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "physicalTokenTransfer",
    "outputs": [
      {
        "internalType": "contract IPhysicalTokenTransfer",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceAggregator",
    "outputs": [
      {
        "internalType": "contract IPriceAggregator",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomnessManager",
    "outputs": [
      {
        "internalType": "contract IRandomnessManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "relayArbitrageCoordinator",
    "outputs": [
      {
        "internalType": "contract IRelayArbitrageCoordinator",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "riskManagementModule",
    "outputs": [
      {
        "internalType": "contract IRiskManagementModule",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "settlement",
    "outputs": [
      {
        "internalType": "contract ISettlement",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shardedTaskManager",
    "outputs": [
      {
        "internalType": "contract IShardedTaskManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sovereignComputeRegistry",
    "outputs": [
      {
        "internalType": "contract ISovereignComputeRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sovereignFreedomProtocol",
    "outputs": [
      {
        "internalType": "contract ISovereignFreedomProtocol",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stablecoinPegArbitrageMachine",
    "outputs": [
      {
        "internalType": "contract IStablecoinPegArbitrageMachine",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taskManager",
    "outputs": [
      {
        "internalType": "contract ITaskManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taskMarketplace",
    "outputs": [
      {
        "internalType": "contract ITaskMarketplace",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tfheExecutor",
    "outputs": [
      {
        "internalType": "contract ITFHEExecutor",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenWeightedGovernance",
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
    "name": "tradeProposalManager",
    "outputs": [
      {
        "internalType": "contract ITradeProposalManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "contract ITreasury",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unifiedOracleDrone",
    "outputs": [
      {
        "internalType": "contract IUnifiedOracleDrone",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voting",
    "outputs": [
      {
        "internalType": "contract IVoting",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`;


const MultiInterface: React.FC = () => {
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
        Iconoclast MultiInterface
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
export default MultiInterface;