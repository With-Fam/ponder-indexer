import { createConfig } from "@ponder/core";
import { http } from "viem";

import { SubscriptionTokenV1Abi } from "./abis/SubscriptionTokenV1Abi";
import { baseSepolia } from "viem/chains";
import { ManageFamAuthorityAbi } from "./abis/ManageFamAuthorityAbi";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: baseSepolia.id,
      transport: http(
        process.env.PONDER_RPC_URL_84532 ||
          "https://base-sepolia.blockpi.network/v1/rpc/public"
      ),
    },
  },
  contracts: {
    ManageFamAuthority: {
      network: "baseSepolia",
      abi: ManageFamAuthorityAbi,
      startBlock: 17218719,
      address: "0x8eaC17a5A609976507734e979873d7c3B3eEbeb6",
    },
    SubscriptionTokenV1Contract: {
      network: "baseSepolia",
      abi: SubscriptionTokenV1Abi,
      startBlock: 18128556,
    },
  },
});
