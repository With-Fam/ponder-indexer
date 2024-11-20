# Instructions

## Goal: Index all subscription events to call methods on the ManageFamAuthority

### addPartyCards

1. Index all HypersubSet events on the ManageFamAuthority contract
2. Store the data using the Stack SDK
3. create a lib getPartiesForHypersubSet to getEvents from the Stack SDK
4. Decode Transfer event logs using viem parseEventLogs method
5. Verify the contractAddress emmitting the transfer event is configured with the ManageFamAuthority by updating handleTransferSubscriptionEvent. Lookup getPartiesForHypersubSet to get the parties for the hypersub being subscribed to
6. simulate call to `addPartyCards` to see if there are any errors.
7. Call the `addPartyCards` method on the ManageFamAuthority with the correct arguments.

### removePartyCards

8. SubscriptionTokenV1Contract:Transfer - create a new lib in the lib/stack/ directory to store the subscription event. Name the event subscription_extended. Please include the `expiration` data of the subscription in the metadata for the event using the Stack SDK. Points should be assigned to the wallet address of the subscriber.
9. create a function to get the next subscription_extended event which will expire. when the indexer starts, get the expiration timestamp of the subscription_extended event with lowest event.metadata.expiration and set nextSubscriptionExpiration to that value.
10. SubscriptionTokenV1Contract:Transfer - if the expiration timestamp is less than the nextSubscriptionExpiration, update the nextSubscriptionExpiration with the new timestamp.
11. once currentTime = nextSubscriptionExpiration, call balanceOf on the SubscriptionTokenV1Contract for the subscriber. If the balance is greater than 0, track subscription_extended event with the new expiration timestamp for the subscriber. if the expiration timestamp is less than the nextSubscriptionExpiration, update the nextSubscriptionExpiration with the new timestamp.
12. once currentTime = nextSubscriptionExpiration, If the balanceOf is 0, removePartyCards for the expired subscription.
