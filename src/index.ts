import { ponder } from "@/generated";
import handleHypersubSetEvent from "./join/handleHypersubSetEvent";
import handleTransferSubscriptionEvent from "./join/handleTransferSubscriptionEvent";
import { handleSubscriptionExpiration } from "./removePartyCards/handleSubscriptionExpiration";

ponder.on(
  "SubscriptionTokenV1Contract:Transfer",
  handleTransferSubscriptionEvent
);

ponder.on("ManageFamAuthority:HypersubSet", handleHypersubSetEvent);

setInterval(async () => {
  try {
    await handleSubscriptionExpiration();
  } catch (error) {
    console.error("Error handling subscription expiration:", error);
  }
}, 30 * 1000); // Check every 30 seconds
