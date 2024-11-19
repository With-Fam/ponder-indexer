import { Context, Event } from "@/generated";
import { stack } from "../stack/client";

const handleHypersubSetEvent = async ({
  event,
  context,
}: {
  event: Event;
  context: Context;
}) => {
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

  console.log(
    `Hypersub ${event.args.hypersub} is configured with Party ${event.args.party} in ManageFamAuthority`
  );
};

export default handleHypersubSetEvent;
