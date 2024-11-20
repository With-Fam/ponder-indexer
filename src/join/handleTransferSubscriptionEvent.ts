import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { Address } from "viem";
import { IndexerParams } from "../types";
import addPartyCards from "../manageFamAuthority/addPartyCards";
import trackSubscriptionExtended from "../stack/trackSubscriptionExtended";

const handleTransferSubscriptionEvent = async ({
  event,
  context,
}: IndexerParams) => {
  const contractAddress = event.log.address;

  try {
    const hypersubEvents = await getPartiesForHypersubSet(contractAddress);
    if (hypersubEvents.length === 0) {
      console.log(
        `Contract ${contractAddress} is not configured with ManageFamAuthority`
      );
      return;
    }
    const mostRecentConfig = hypersubEvents[hypersubEvents.length - 1];
    if (!mostRecentConfig) return;
    const partyAddress = mostRecentConfig.party as Address;
    console.log(
      `Contract ${contractAddress} is configured with ManageFamAuthority - Party: ${partyAddress}`
    );
    await addPartyCards(partyAddress, subscriber);
    await trackSubscriptionExtended({ event, context });
  } catch (error) {
    console.error("Error verifying hypersub configuration:", error);
    return;
  }
};

export default handleTransferSubscriptionEvent;
