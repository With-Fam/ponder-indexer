import { Context, Event } from "@/generated";

const handleTransferSubscriptionEvent = async ({
  event,
  context,
}: {
  event: Event;
  context: Context;
}) => {
  // Get the contract address emitting the event
  const contractAddress = event.log.address;

  // TODO: We need to add ManageFamAuthority contract configuration and ABI
  // to verify if this contract is configured

  // // Example verification (you'll need to implement the actual check):
  // const isConfigured =
  //   await context.contracts.ManageFamAuthority.read.isConfiguredContract([
  //     contractAddress,
  //   ]);

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

export default handleTransferSubscriptionEvent;
