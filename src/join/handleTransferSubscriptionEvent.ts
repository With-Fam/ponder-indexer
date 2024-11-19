import { Context, Event } from "@/generated";
import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";

const handleTransferSubscriptionEvent = async ({
  event,
  context,
}: {
  event: Event;
  context: Context;
}) => {
  // Get the contract address emitting the event
  const contractAddress = event.log.address;

  try {
    // Get all parties configured for this hypersub contract
    const hypersubEvents = await getPartiesForHypersubSet(contractAddress);

    // If no parties are configured for this hypersub, it's not configured
    if (hypersubEvents.length === 0) {
      console.log(
        `Contract ${contractAddress} is not configured with ManageFamAuthority`
      );
      return;
    }

    // Log successful configuration - using the most recent party configuration
    const mostRecentConfig = hypersubEvents[hypersubEvents.length - 1];
    console.log(
      `Contract ${contractAddress} is configured with ManageFamAuthority - Party: ${mostRecentConfig.party}`
    );

    // TODO: Continue with subscription transfer handling
    // The party address is available in mostRecentConfig.party
  } catch (error) {
    console.error("Error verifying hypersub configuration:", error);
    return;
  }
};

export default handleTransferSubscriptionEvent;
