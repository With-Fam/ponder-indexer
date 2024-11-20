import { publicClient } from "../viem/publicClient";
import { Address } from "viem";
import getAllSubscriptionExtendedEvents from "../stack/getAllSubscriptionExtendedEvents";
import removePartyCards from "./removePartyCards";
import { getPartiesForHypersubSet } from "../stack/getPartiesForHypersubSet";
import { PartyAbi } from "../../abis/PartyAbi";
import getBalanceOf from "../hypersub/getBalanceOf";

export async function handleSubscriptionExpiration() {
  const expiringSubscriptions = await getAllSubscriptionExtendedEvents();

  for (const subscription of expiringSubscriptions) {
    const subscriber = subscription.address as Address;
    const contractAddress = subscription.metadata?.hypersub as Address;
    const expiration = BigInt(subscription.metadata?.expiration);
    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    const isExpired = currentTime > expiration;
    if (!isExpired) continue;
    if (!subscriber || !contractAddress) continue;
    const balance = await getBalanceOf(contractAddress, subscriber);
    if (balance === 0n) continue;
    const parties = await getPartiesForHypersubSet(contractAddress);
    const partyAddress = parties?.[0]?.party;
    if (parties.length === 0 || !partyAddress) continue;
    const balanceOf = await publicClient.readContract({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "balanceOf",
      args: [subscriber],
    });
    if (balanceOf === 0n) continue;
    const tokenCount = await publicClient.readContract({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "tokenCount",
    });
    const calls = Array.from({ length: Number(tokenCount) }, (_, i) => ({
      address: partyAddress,
      abi: PartyAbi,
      functionName: "ownerOf",
      args: [BigInt(i + 1)],
    }));
    const results = await publicClient.multicall({
      contracts: calls,
    } as any);

    const ownedTokenIds: bigint[] = [];

    results.forEach((result, index) => {
      if (result.status === "success" && result.result === subscriber) {
        ownedTokenIds.push(BigInt(index + 1));
      }
    });
    if (ownedTokenIds.length > 0) {
      await removePartyCards(partyAddress, ownedTokenIds);
    }
  }
}
