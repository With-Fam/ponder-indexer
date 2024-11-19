import { ponder } from "@/generated";

ponder.on(
  "SubscriptionTokenV1Contract:Transfer",
  async ({ event, context }) => {
    console.log("EVENT", event);
  }
);
