import getAllSubscriptionExtendedEvents from "../stack/getAllSubscriptionExtendedEvents";
import handleSubscription from "./handleSubscription";

export async function checkSubscriptions() {
  const expiringSubscriptions = await getAllSubscriptionExtendedEvents();
  for (const subscription of expiringSubscriptions) {
    await handleSubscription(subscription);
  }
}
