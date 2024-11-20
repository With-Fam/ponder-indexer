import { IndexerParams } from "../types";
import { stack } from "./client";
import { publicClient } from "../viem/publicClient";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";

const trackSubscriptionExtended = async ({ event, context }: IndexerParams) => {
  const subscriber = (event.args as any).to;
  const subscriptionData = await publicClient.readContract({
    address: event.log.address,
    abi: SubscriptionTokenV1Abi,
    functionName: "balanceOf",
    args: [subscriber],
  });
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expiration = (
    subscriptionData + BigInt(currentTimeInSeconds)
  ).toString();
  const expirationHumanReadable = new Date(
    Number(expiration) * 1000
  ).toISOString();
  await stack.track("subscription_extended", {
    points: 1,
    account: subscriber,
    uniqueId: `${(context.client as any).chain.id}-${
      event.log.transactionHash
    }`,
    metadata: {
      blockNumber: event.log.blockNumber.toString(),
      transactionHash: event.log.transactionHash,
      hypersub: event.log.address,
      expiration,
      subscriber,
      tokenId: (event.args as any).tokenId.toString(),
      expirationHumanReadable,
    },
  });
};

export default trackSubscriptionExtended;
