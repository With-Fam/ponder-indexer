import { IndexerParams } from "../types";
import { stack } from "./client";
import { publicClient } from "../viem/publicClient";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";

const trackSubscriptionExtended = async ({ event, context }: IndexerParams) => {
  // Get subscription details using subscriptionOf method
  const subscriptionData = await publicClient.readContract({
    address: event.log.address,
    abi: SubscriptionTokenV1Abi,
    functionName: "balanceOf",
    args: [event.args.to],
  });
  console.log("subscriptionData", subscriptionData);

  //   await stack.track("subscription_extended", {
  //     points: 1,
  //     account: event.args.to,
  //     uniqueId: `${context.client.chain.id}-${event.log.transactionHash}`,
  //     metadata: {
  //       blockNumber: event.log.blockNumber.toString(),
  //       transactionHash: event.log.transactionHash,
  //       expiration: subscriptionData[3].toString(), // expiresAt from subscriptionOf
  //       tokenId: event.args.tokenId.toString(),
  //     },
  //   });
};

export default trackSubscriptionExtended;
