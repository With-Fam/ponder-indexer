import { ponder } from "@/generated";
import handleHypersubSetEvent from "./join/handleHypersubSetEvent";
import handleTransferSubscriptionEvent from "./join/handleTransferSubscriptionEvent";
import { checkSubscriptions } from "./removePartyCards/checkSubscriptions";

ponder.on(
  "SubscriptionTokenV1Contract:Transfer",
  handleTransferSubscriptionEvent
);

ponder.on("ManageFamAuthority:HypersubSet", handleHypersubSetEvent);

setInterval(async () => {
  try {
    await checkSubscriptions();
  } catch (error) {
    console.error("Error handling subscription expiration:", error);
  }
}, 30 * 1000);
