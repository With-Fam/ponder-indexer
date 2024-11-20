import { publicClient } from "../viem/publicClient";
import { SubscriptionTokenV1Abi } from "../../abis/SubscriptionTokenV1Abi";
import { getNextSubscriptionExpiration } from "../stack/getNextSubscriptionExpiration";
import { stack } from "../stack/client";
import { Address } from "viem";
import getAllSubscriptionExtendedEvents from "../stack/getAllSubscriptionExtendedEvents";
import removePartyCards from "./removePartyCards";
import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { PartyAbi } from "../../abis/PartyAbi";

export async function handleSubscriptionExpiration() {
  console.log("SWEETS handleSubscriptionExpiration starting...");
  const currentTime = Math.floor(Date.now() / 1000).toString();
  const nextExpiration = await getNextSubscriptionExpiration();
  console.log("SWEETS nextExpiration", nextExpiration);

  if (!nextExpiration || currentTime < nextExpiration) {
    return;
  }

  const expiringSubscriptions = await getAllSubscriptionExtendedEvents();
  console.log("SWEETS expiringSubscriptions", expiringSubscriptions);

  for (const subscription of expiringSubscriptions) {
    const subscriber = subscription.address as Address;
    const contractAddress = subscription.metadata?.hypersub as Address;
    const expiration = BigInt(subscription.metadata?.expiration);
    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    const isExpired = currentTime > expiration;
    console.log("SWEETS isExpired", isExpired);
    console.log("SWEETS subscriber", subscriber);
    console.log("SWEETS contractAddress", contractAddress);
    if (!isExpired) continue;
    if (!subscriber || !contractAddress) continue;

    // Check current balance
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: SubscriptionTokenV1Abi,
      functionName: "balanceOf",
      args: [subscriber],
    });
    console.log("if balance = 0, removePartyCards", balance);
    const parties = await getPartiesForHypersubSet(contractAddress);
    console.log("parties", parties);
    const partyAddress = parties?.[0]?.party;
    if (parties.length === 0 || !partyAddress) continue;

    const balanceOf = await publicClient.readContract({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "balanceOf",
      args: [subscriber],
    });
    console.log("SWEETS PARTY balanceOf = 0? EXIT", balanceOf);

    const tokenCount = await publicClient.readContract({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "tokenCount",
    });

    console.log(
      "SWEETS PARTY tokenCount - use this with multicall to find which tokenId(s) are owned by this wallet.",
      tokenCount
    );

    const calls = Array.from({ length: Number(tokenCount) }, (_, i) => ({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "ownerOf",
      args: [BigInt(i + 1)],
    }));
    console.log("SWEETS calls", calls);

    const results = await publicClient.multicall({
      contracts: calls,
    } as any);

    const ownedTokenIds: bigint[] = [];

    results.forEach((result, index) => {
      if (result.status === "success" && result.result === subscriber) {
        ownedTokenIds.push(BigInt(index + 1));
      }
    });

    console.log("SWEETS Found owned tokenIds:", ownedTokenIds);

    if (ownedTokenIds.length > 0) {
      await removePartyCards(partyAddress, ownedTokenIds);
    }
  }
}
