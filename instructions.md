# Instructions

## Goal: Index all subscription events to call methods on the ManageFamAuthority

1. Index all HypersubSet events on the ManageFamAuthority contract
2. Store the data using the Stack SDK
3. create a lib getPartiesForHypersubSet to getEvents from the Stack SDK
4. Decode Transfer event logs using viem parseEventLogs method
5. Verify the contractAddress emmitting the transfer event is configured with the ManageFamAuthority
6. Verify balanceOf is greater than 0 for the SubscriptionTokenV1Contract
7. Verify balanceOf is zero for the Party NFT token.
8. Call the `join` method on the ManageFamAuthority with the correct arguments.
