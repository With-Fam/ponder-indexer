import { config } from "./config";
import { ViemClient } from "./client";
import type { BaseEvent } from "./types";

// Initialize the blockchain client
const network = config.networks.baseSepolia;
const client = new ViemClient(network);

// Event handlers
export const handleTransferSubscriptionEvent = async (event: BaseEvent) => {
  console.log("Transfer event:", event);
  // TODO: Implement event handling
};

export const handleHypersubSetEvent = async (event: BaseEvent) => {
  console.log("HypersubSet event:", event);
  // TODO: Implement event handling
};

// Initialize indexer
export const startIndexing = async () => {
  const latestBlock = await client.getBlock(BigInt(network.startBlock));
  console.log("Starting indexer at block:", latestBlock.number.toString());

  // Get logs for our contracts
  const logs = await client.getLogs({
    fromBlock: BigInt(config.contracts.ManageFamAuthority.startBlock),
    toBlock: latestBlock.number,
    address: config.contracts.ManageFamAuthority.address,
  });

  console.log("Found logs:", logs.length);

  // TODO: Implement event filtering and emission
};
