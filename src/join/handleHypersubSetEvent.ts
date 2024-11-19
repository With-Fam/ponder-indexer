import { Context, Event } from "@/generated";
import { StackClient } from "@stackso/js-core";

// Initialize Stack client
const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY!,
  pointSystemId: parseInt(process.env.STACK_POINT_SYSTEM_ID!),
});

const handleHypersubSetEvent = async ({
  event,
  context,
}: {
  event: Event;
  context: Context;
}) => {
  // Get the contract address emitting the event
  const contractAddress = event.log.address;

  // Store the HypersubSet event in Stack
  // Using uniqueId to prevent duplicate events
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

  // TODO: We need to add ManageFamAuthority contract configuration and ABI
  // to verify if this contract is configured

  // // Example verification (you'll need to implement the actual check):
  // read from 0x8eaC17a5A609976507734e979873d7c3B3eEbeb6 (ManageFamAuthority) on baseSepolia

  // if (!isConfigured) {
  //   console.log(
  //     `Contract ${contractAddress} is not configured with ManageFamAuthority`
  //   );
  //   return;
  // }

  console.log(
    `Contract ${contractAddress} is configured with ManageFamAuthority`
  );
};

export default handleHypersubSetEvent;
