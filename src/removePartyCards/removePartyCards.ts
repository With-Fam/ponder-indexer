import { walletClient } from "../viem/wallet";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";
import { MANAGE_FAM_AUTHORITY_ADDRESS } from "../consts";
import { publicClient } from "../viem/publicClient";
import { account } from "../viem/wallet";
import { Address } from "viem";

const removePartyCards = async (partyAddress: Address, tokenIds: bigint[]) => {
  try {
    console.log("Simulating removePartyCards", account.address);
    const { request } = await publicClient.simulateContract({
      account,
      address: MANAGE_FAM_AUTHORITY_ADDRESS,
      abi: ManageFamAuthorityAbi,
      functionName: "removePartyCards",
      args: [partyAddress, tokenIds],
    });

    console.log("removePartyCards simulation successful");
    const hash = await walletClient.writeContract(request);

    console.log("removePartyCards transaction sent:", hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(
      "removePartyCards transaction confirmed:",
      receipt.transactionHash
    );
  } catch (error: any) {
    console.error("Error executing removePartyCards:", error?.cause || error);
    return;
  }
};

export default removePartyCards;
