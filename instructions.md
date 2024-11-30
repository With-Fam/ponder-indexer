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

   b. Implement blockchain client using viem

   - Block fetching
   - Log filtering
   - Transaction retrieval
   - ABI handling

   c. Create event emitter system

   - Event subscription
   - Event filtering
   - Event emission

   d. Build configuration management

   - Network configuration
   - Contract configuration
   - ABI management

   e. Implement main indexer class

   - Block processing
   - Event handling
   - Error handling
   - Checkpoint management

   f. Add tests

   - Unit tests for each component
   - Integration tests for indexer
   - Mock blockchain data

3. Integration Steps:
   a. Remove existing Ponder dependencies
   b. Integrate new indexer
   c. Update event handlers
   d. Migrate data storage

4. Testing & Deployment:
   a. Local testing
   b. Digital Ocean deployment testing
   c. Performance monitoring
   d. Error handling verification
