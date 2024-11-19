import { createConfig } from "@ponder/core";
import { http } from "viem";

import { SubscriptionTokenV1Abi } from "./abis/SubscriptionTokenV1Abi";
import { baseSepolia } from "viem/chains";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: baseSepolia.id,
      transport: http("https://base-sepolia.blockpi.network/v1/rpc/public"),
    },
  },
  contracts: {
    SubscriptionTokenV1Contract: {
      network: "baseSepolia",
      abi: SubscriptionTokenV1Abi,
      startBlock: 11111111,
    },
  },
});
