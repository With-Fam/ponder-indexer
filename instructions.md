# Instructions

## Goal: Index all subscription events to call methods on the ManageFamAuthority

1. Index all HypersubSet events on the ManageFamAuthority contract
2. Store the data using the Stack SDK
3. create a lib getPartiesForHypersubSet to getEvents from the Stack SDK
4. Decode Transfer event logs using viem parseEventLogs method
5. Verify the contractAddress emmitting the transfer event is configured with the ManageFamAuthority by updating handleTransferSubscriptionEvent. Lookup getPartiesForHypersubSet to get the parties for the hypersub being subscribed to
6. simulate call to `join` to see if there are any errors.
7. Call the `join` method on the ManageFamAuthority with the correct arguments.
