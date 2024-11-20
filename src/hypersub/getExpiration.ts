import { Address } from "viem";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";
import { publicClient } from "../viem/publicClient";

const getExpiration = async (hypersub: Address, subscriber: Address) => {
  const subscriptionData = await publicClient.readContract({
    address: hypersub,
    abi: SubscriptionTokenV1Abi,
    functionName: "balanceOf",
    args: [subscriber],
  });
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expiration = (
    subscriptionData + BigInt(currentTimeInSeconds)
  ).toString();
  return expiration;
};

export default getExpiration;
