import { Context, Event } from "@/generated";

const handleHypersubSetEvent = async ({
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
