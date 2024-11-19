import { IndexerParams } from "../types";
import { stack } from "./client";

const trackHypersubSet = async ({ event, context }: IndexerParams) => {
  await stack.track("hypersub_set", {
    points: 1,
    account: event.args.hypersub,
    uniqueId: `${context.client.chain.id}-${event.log.transactionHash}`,
    metadata: {
      blockNumber: event.log.blockNumber.toString(),
      transactionHash: event.log.transactionHash,
      party: event.args.party,
    },
  });
};

export default trackHypersubSet;
