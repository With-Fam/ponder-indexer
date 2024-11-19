import { walletClient } from "../viem/wallet";
import { ManageFamAuthorityAbi } from "../../abis/ManageFamAuthorityAbi";
import { MANAGE_FAM_AUTHORITY_ADDRESS } from "../consts";
import { publicClient } from "../viem/publicClient";
import { account } from "../viem/wallet";
import { Address } from "viem";

const addPartyCards = async (partyAddress: Address, subscriber: Address) => {
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
};

export default addPartyCards;
