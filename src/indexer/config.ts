import type { Address } from "viem";
import type { ContractConfig, IndexerConfig, NetworkConfig } from "./types";
import { baseSepolia } from "viem/chains";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";
import { BASE_SEPOLIA_RPC_URL, MANAGE_FAM_AUTHORITY_ADDRESS } from "../consts";

// Base Sepolia network configuration
const networks: Record<string, NetworkConfig> = {
  baseSepolia: {
    chainId: baseSepolia.id,
    rpcUrl: BASE_SEPOLIA_RPC_URL,
    startBlock: 18207240,
  },
};

// Contract configurations
const contracts: Record<string, ContractConfig> = {
  ManageFamAuthority: {
    network: "baseSepolia",
    address: MANAGE_FAM_AUTHORITY_ADDRESS as Address,
    abi: ManageFamAuthorityAbi as any[],
    startBlock: 18207240,
  },
  SubscriptionTokenV1Contract: {
    network: "baseSepolia",
    address: "0x0000000000000000000000000000000000000000" as Address,
    abi: SubscriptionTokenV1Abi as any[],
    startBlock: 18207240,
  },
};

// Export the complete config
export const config: IndexerConfig = {
  networks,
  contracts,
};
