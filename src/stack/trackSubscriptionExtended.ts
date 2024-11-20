import { IndexerParams } from "../types";
import { stack } from "./client";
import getExpiration from "../hypersub/getExpiration";

const trackSubscriptionExtended = async ({ event, context }: IndexerParams) => {
  const subscriber = (event.args as any).to;
  const expiration = await getExpiration(event.log.address, subscriber);
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
