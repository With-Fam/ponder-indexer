import { createConfig } from "@ponder/core";
import { http } from "viem";
import { SubscriptionTokenV1Abi } from "./abis/SubscriptionTokenV1Abi";
import { baseSepolia } from "viem/chains";
import { ManageFamAuthorityAbi } from "./abis/ManageFamAuthorityAbi";
import {
  BASE_SEPOLIA_RPC_URL,
  MANAGE_FAM_AUTHORITY_ADDRESS,
} from "./src/consts";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: baseSepolia.id,
      transport: http(BASE_SEPOLIA_RPC_URL),
    },
  },
  contracts: {
    ManageFamAuthority: {
      network: "baseSepolia",
      abi: ManageFamAuthorityAbi,
      startBlock: 17218719,
      address: MANAGE_FAM_AUTHORITY_ADDRESS,
    },
    SubscriptionTokenV1Contract: {
      network: "baseSepolia",
      abi: SubscriptionTokenV1Abi,
      startBlock: 18128556,
    },
  },
});
