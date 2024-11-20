import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { Address } from "viem";
import { IndexerParams } from "../types";
import addPartyCards from "../manageFamAuthority/addPartyCards";

const handleTransferSubscriptionEvent = async ({
  event,
  context,
}: IndexerParams) => {
  const contractAddress = event.log.address;
  const subscriber = event.args.to;

  try {
    const hypersubEvents = await getPartiesForHypersubSet(contractAddress);
    if (hypersubEvents.length === 0) {
      console.log(
        `Contract ${contractAddress} is not configured with ManageFamAuthority`
      );
      return;
    }
    const mostRecentConfig = hypersubEvents[hypersubEvents.length - 1];
    const partyAddress = mostRecentConfig.party as Address;
    console.log(
      `Contract ${contractAddress} is configured with ManageFamAuthority - Party: ${partyAddress}`
    );
    await addPartyCards(partyAddress, subscriber);
  } catch (error) {
    console.error("Error verifying hypersub configuration:", error);
    return;
  }
};

export default handleTransferSubscriptionEvent;
