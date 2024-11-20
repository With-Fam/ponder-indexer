import { Address } from "viem";
import { publicClient } from "../viem/publicClient";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";

const getBalanceOf = async (hypersub: Address, subscriber: Address) => {
  const balance = await publicClient.readContract({
    address: hypersub,
    abi: SubscriptionTokenV1Abi,
    functionName: "balanceOf",
    args: [subscriber],
  });
  return balance;
};

export default getBalanceOf;
