import { getAddress } from "viem";
import { stack } from "./client";

export interface HypersubSetEvent {
  party: string;
  hypersub: string;
  blockNumber: string;
  transactionHash: string;
}

export async function getPartiesForHypersubSet(
  hypersubAddress: string
): Promise<HypersubSetEvent[]> {
  try {
    const response = await stack.getEvents({
      query: stack
        .eventsQuery()
        .where({
          eventType: "user_signup",
          associatedAccount: getAddress(hypersubAddress.toLowerCase()),
        })
        .offset(0)
        .build(),
    });
    console.log("Stack API Response:", JSON.stringify(response, null, 2));
    if (!response || !response.length) {
      console.error("Invalid response format from Stack API");
      return [];
    }

    return response.map((event) => ({
      party: event.metadata.party as string,
      hypersub: event.account,
      blockNumber: event.metadata.blockNumber as string,
      transactionHash: event.metadata.transactionHash as string,
    }));
  } catch (error) {
    console.error("Error fetching HypersubSet events:", error);
    return [];
  }
}
