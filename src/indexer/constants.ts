import { baseSepolia } from "viem/chains";

export const BASE_SEPOLIA_RPC_URL =
  process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
export const MANAGE_FAM_AUTHORITY_ADDRESS =
  "0x0000000000000000000000000000000000000000";
export const START_BLOCK = 18207240;
export const CHAIN_ID = baseSepolia.id;
