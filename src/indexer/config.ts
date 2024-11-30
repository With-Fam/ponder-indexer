import type { Address } from "viem";
import type { ContractConfig, IndexerConfig, NetworkConfig } from "./types";
import { baseSepolia } from "viem/chains";
import { SubscriptionTokenV1Abi, ManageFamAuthorityAbi } from "./abis";
import { http } from "viem";

// Import values from ponder.config.ts
const BASE_SEPOLIA_RPC_URL =
  process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
const MANAGE_FAM_AUTHORITY_ADDRESS =
  "0x0000000000000000000000000000000000000000"; // TODO: Import from env
const START_BLOCK = 18207240;

// Base Sepolia network configuration
const networks: Record<string, NetworkConfig> = {
  baseSepolia: {
    chainId: baseSepolia.id,
    rpcUrl: BASE_SEPOLIA_RPC_URL,
    startBlock: START_BLOCK,
  },
} as const;

// Contract configurations
const contracts: Record<string, ContractConfig> = {
  ManageFamAuthority: {
    network: "baseSepolia",
    address: MANAGE_FAM_AUTHORITY_ADDRESS as Address,
    abi: [...ManageFamAuthorityAbi],
    startBlock: START_BLOCK,
  },
  SubscriptionTokenV1Contract: {
    network: "baseSepolia",
    address: MANAGE_FAM_AUTHORITY_ADDRESS as Address, // TODO: Get correct address
    abi: [...SubscriptionTokenV1Abi],
    startBlock: START_BLOCK,
  },
} as const;

// Export the complete config
export const config: IndexerConfig = {
  networks,
  contracts,
} as const;
