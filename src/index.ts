import { ponder } from "@/generated";
import handleHypersubSetEvent from "./join/handleHypersubSetEvent";

// ponder.on(
//   "SubscriptionTokenV1Contract:Transfer",
//   handleTransferSubscriptionEvent
// );

ponder.on("ManageFamAuthority:HypersubSet", handleHypersubSetEvent);
