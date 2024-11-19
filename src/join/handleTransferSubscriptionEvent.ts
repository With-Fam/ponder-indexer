import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { Address, createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";
import { account, walletClient } from "../viem/wallet";
import { BASE_SEPOLIA_RPC_URL, MANAGE_FAM_AUTHORITY_ADDRESS } from "../consts";
import { IndexerParams } from "../types";

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
    try {
      console.log("Simulating addPartyCards", account.address);
      const { request } = await publicClient.simulateContract({
        account,
        address: MANAGE_FAM_AUTHORITY_ADDRESS,
        abi: ManageFamAuthorityAbi,
        functionName: "addPartyCards",
        args: [partyAddress, [subscriber], [1n], [subscriber]],
      });

      console.log("addPartyCards simulation successful");
      const hash = await walletClient.writeContract(request);

      console.log("addPartyCards transaction sent:", hash);
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
