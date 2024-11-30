import { config } from "./config";
import { ViemClient } from "./client";
import type { BaseEvent } from "./types";

// Initialize the blockchain client
const network = config.networks.baseSepolia;
if (!network) {
  throw new Error("Base Sepolia network configuration not found");
}

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

  const manageFamAuthority = config.contracts.ManageFamAuthority;
  const subscriptionToken = config.contracts.SubscriptionTokenV1Contract;

  if (!manageFamAuthority || !subscriptionToken) {
    throw new Error("Contract configurations not found");
  }

  // Get logs for both contracts
  const [manageFamLogs, subscriptionLogs] = await Promise.all([
    client.getLogs({
      fromBlock: BigInt(manageFamAuthority.startBlock),
      toBlock: latestBlock.number,
      address: manageFamAuthority.address,
    }),
    client.getLogs({
      fromBlock: BigInt(subscriptionToken.startBlock),
      toBlock: latestBlock.number,
      address: subscriptionToken.address,
    }),
  ]);

  console.log("Found ManageFamAuthority logs:", manageFamLogs.length);
  console.log("Found SubscriptionToken logs:", subscriptionLogs.length);

  // TODO: Implement event filtering and emission
};
