import { Context, Event } from "@/generated";
import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";

const MANAGE_FAM_AUTHORITY_ADDRESS =
  "0x8eaC17a5A609976507734e979873d7c3B3eEbeb6";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://base-sepolia.blockpi.network/v1/rpc/public"),
});

const handleTransferSubscriptionEvent = async ({
  event,
  context,
}: {
  event: Event;
  context: Context;
}) => {
  // Get the contract address emitting the event
  const contractAddress = event.log.address;
  const subscriber = event.args.to;

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

    // Get the most recent party configuration
    const mostRecentConfig = hypersubEvents[hypersubEvents.length - 1];
    const partyAddress = mostRecentConfig.party;

    console.log(
      `Contract ${contractAddress} is configured with ManageFamAuthority - Party: ${partyAddress}`
    );

    // Simulate the addPartyCards call
    try {
      const { request } = await publicClient.simulateContract({
        account: subscriber,
        address: MANAGE_FAM_AUTHORITY_ADDRESS,
        abi: ManageFamAuthorityAbi,
        functionName: "addPartyCards",
        args: [
          partyAddress, // party address
          [subscriber], // newPartyMembers array with single subscriber
          [1n], // newPartyMemberVotingPowers array (1 voting power)
          [subscriber], // initialDelegates array (self-delegation)
        ],
      });

      console.log("addPartyCards simulation successful", request);
    } catch (simulationError) {
      console.error("addPartyCards simulation failed:", simulationError);
      return;
    }

    // TODO: If simulation successful, proceed with actual addPartyCards call
  } catch (error) {
    console.error("Error verifying hypersub configuration:", error);
    return;
  }
};

export default handleTransferSubscriptionEvent;
