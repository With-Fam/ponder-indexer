import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import type {
  Block,
  BlockchainClient,
  Log,
  NetworkConfig,
  Transaction,
} from "./types";

export class ViemClient implements BlockchainClient {
  private client;

  constructor(config: NetworkConfig) {
    this.client = createPublicClient({
      chain: baseSepolia,
      transport: http(config.rpcUrl),
    });
  }

  async getBlock(blockNumber: bigint): Promise<Block> {
    const block = await this.client.getBlock({ blockNumber });
    return {
      hash: block.hash,
      number: block.number,
      timestamp: block.timestamp,
      parentHash: block.parentHash,
    };
  }

  async getLogs(filter: {
    fromBlock: bigint;
    toBlock: bigint;
    address?: string | string[];
    topics?: (string | string[] | null)[];
  }): Promise<Log[]> {
    const logs = await this.client.getLogs(filter);
    return logs.map((log) => ({
      address: log.address,
      topics: log.topics,
      data: log.data,
      blockHash: log.blockHash,
      blockNumber: log.blockNumber,
      transactionHash: log.transactionHash,
      transactionIndex: log.transactionIndex,
      logIndex: log.logIndex,
      removed: log.removed,
    }));
  }

  async getTransaction(hash: string): Promise<Transaction> {
    const tx = await this.client.getTransaction({ hash });
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      input: tx.input,
      value: tx.value,
      blockHash: tx.blockHash,
      blockNumber: tx.blockNumber,
      transactionIndex: tx.transactionIndex,
    };
  }
}
