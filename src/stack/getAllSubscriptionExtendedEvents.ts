import { stack } from "./client";

const getAllSubscriptionExtendedEvents = async () => {
  const expiringSubscriptions = await stack.getEvents({
    query: stack
      .eventsQuery()
      .where({
        eventType: "subscription_extended",
      })
      .build(),
  });
  return expiringSubscriptions;
};

export default getAllSubscriptionExtendedEvents;
