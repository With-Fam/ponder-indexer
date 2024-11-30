import type { Address } from "viem";
import type { ContractConfig, IndexerConfig, NetworkConfig } from "./types";
import { baseSepolia } from "viem/chains";
import { SubscriptionTokenV1Abi, ManageFamAuthorityAbi } from "./abis";
import {
  BASE_SEPOLIA_RPC_URL,
  MANAGE_FAM_AUTHORITY_ADDRESS,
  START_BLOCK,
  CHAIN_ID,
} from "./constants";

// Base Sepolia network configuration
const networks: Record<string, NetworkConfig> = {
  baseSepolia: {
    chainId: CHAIN_ID,
    rpcUrl: BASE_SEPOLIA_RPC_URL,
    startBlock: START_BLOCK,
  },
};

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
    address: MANAGE_FAM_AUTHORITY_ADDRESS as Address,
    abi: [...SubscriptionTokenV1Abi],
    startBlock: START_BLOCK,
  },
};

// Export the complete config
export const config: IndexerConfig = {
  networks,
  contracts,
};
