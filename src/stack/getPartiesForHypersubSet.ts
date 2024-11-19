import { StackClient } from "@stackso/js-core";
import { stack } from "./client";

// Initialize Stack client

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
    // Get all events for the hypersub_set event type
    const response = await stack.getEvents({
      eventName: "hypersub_set",
      filters: {
        // Filter events where the hypersub address matches
        account: hypersubAddress.toLowerCase(),
      },
    });

    // Map the events to our expected format
    return response.events.map((event) => ({
      party: event.metadata.party as string,
      hypersub: event.account,
      blockNumber: event.metadata.blockNumber as string,
      transactionHash: event.metadata.transactionHash as string,
    }));
  } catch (error) {
    console.error("Error fetching HypersubSet events:", error);
    throw error;
  }
}
