import { stack } from "./client";

export async function getNextSubscriptionExpiration(): Promise<string | null> {
  try {
    const response = await stack.getEvents({
      query: stack
        .eventsQuery()
        .where({
          eventType: "subscription_extended",
        })
        .build(),
    });
    console.log("SWEETS getNextSubscriptionExpiration response", response);

    if (!response || response.length === 0) {
      return null;
    }

    return (response[0]?.metadata?.expiration as string) || null;
  } catch (error) {
    console.error("Error fetching next subscription expiration:", error);
    return null;
  }
}
