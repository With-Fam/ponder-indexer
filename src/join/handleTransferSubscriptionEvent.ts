import { Context, Event } from "@/generated";
import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { Address, createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";
import { account, walletClient } from "../viem/wallet";
import { BASE_SEPOLIA_RPC_URL } from "../consts";
import { IndexerParams, IndexerParams } from "../types";

const MANAGE_FAM_AUTHORITY_ADDRESS =
  "0x8eaC17a5A609976507734e979873d7c3B3eEbeb6";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA_RPC_URL),
});

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

    // Simulate the addPartyCards call
    try {
      console.log("Simulating addPartyCards", account.address);
      // const { request } = await publicClient.simulateContract({
      //   account: account.address,
      //   address: MANAGE_FAM_AUTHORITY_ADDRESS,
      //   abi: ManageFamAuthorityAbi,
      //   functionName: "addPartyCards",
      //   args: [partyAddress, [subscriber], [1n], [subscriber]],
      // });

      // console.log("addPartyCards simulation successful");

      // Execute the actual transaction
      const hash = await walletClient.writeContract({
        account,
        address: MANAGE_FAM_AUTHORITY_ADDRESS,
        abi: ManageFamAuthorityAbi,
        functionName: "addPartyCards",
        args: [partyAddress, [subscriber], [1n], [subscriber]],
        chain: baseSepolia,
      });

      console.log("addPartyCards transaction sent:", hash);

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      console.log(
        "addPartyCards transaction confirmed:",
        receipt.transactionHash
      );
    } catch (error) {
      console.error("Error executing addPartyCards:", error);
      return;
    }
  } catch (error) {
    console.error("Error verifying hypersub configuration:", error);
    return;
  }
};

export default handleTransferSubscriptionEvent;
