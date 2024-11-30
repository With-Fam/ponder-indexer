# Instructions

## Problem: The current codebase works locally but fails when deployed to the digital ocean droplet. Issue seems to arise from sqlite / wasm packages.

## Goal: directly integrating the indexing functionality from Ponder into ponder-join-indexer

### Analysis & Planning

1. Core indexing functionality needed from Ponder:

   - Event listening and filtering
   - Block processing
   - Contract event parsing
   - No database dependencies

2. Integration Strategy:
   - Remove all database dependencies
   - Use viem directly for blockchain interaction
   - Implement minimal event system
   - Store data in memory or simple file storage

### Implementation Plan

1. Create new directory structure:

```
src/
  indexer/
    types.ts       - Event types, blockchain types, config interfaces
    client.ts      - Viem client wrapper for blockchain interaction
    events.ts      - Minimal event emitter system
    config.ts      - Network and contract configuration
    index.ts       - Main indexer implementation
    store.ts       - Simple data storage (in-memory or file-based)
```

2. Implementation Steps:
   a. Create minimal type definitions

   - Event types (Transfer, HypersubSet)
   - Blockchain types (Block, Log, Transaction)
   - Configuration interfaces

   b. Create Minimal Working Version:

   1. Create simple client.ts

      - Implement only getBlock and getLogs
      - Use viem's public client
      - Test with base sepolia testnet

   2. Create basic config.ts

      - Single network (base sepolia testnet)
      - Single contract (SubscriptionTokenV1Contract)
      - Hardcoded ABI for testing

   3. Create simple test script
      - Connect to network
      - Fetch recent blocks
      - Get logs for our contract
      - Log results to console

   c. Test & Verify:

   - Run test script
   - Verify block fetching
   - Verify log filtering
   - Debug any connection issues

   d. Iterate & Expand:

   - Add event parsing
   - Implement event emission
   - Add checkpoint management
   - Add error handling

3. Future Steps:
   - Complete remaining implementation steps
   - Add comprehensive testing
   - Integrate with main application
   - Deploy and verify

Would you like me to proceed with implementing the minimal client.ts and config.ts files to get a working test version?
