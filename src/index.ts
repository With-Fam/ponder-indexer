import { ponder } from "@/generated";
import handleHypersubSetEvent from "./join/handleHypersubSetEvent";
import handleTransferSubscriptionEvent from "./join/handleTransferSubscriptionEvent";

ponder.on(
  "SubscriptionTokenV1Contract:Transfer",
  handleTransferSubscriptionEvent
);

ponder.on("ManageFamAuthority:HypersubSet", handleHypersubSetEvent);
