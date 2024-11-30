import { Address, Hash, Hex } from "viem";

// Event Types
export interface BaseEvent {
  name: string;
  args: Record<string, any>;
  log: Log;
  block: Block;
  transaction: Transaction;
}

export interface TransferEvent extends BaseEvent {
  name: "Transfer";
  args: {
    from: Address;
    to: Address;
    amount: bigint;
  };
}

export interface HypersubSetEvent extends BaseEvent {
  name: "HypersubSet";
  args: {
    authority: Address;
    hypersub: boolean;
  };
}

// Blockchain Types
export interface Block {
  hash: Hash;
  number: bigint;
  timestamp: bigint;
  parentHash: Hash;
}

export interface Log {
  address: Address;
  topics: Hash[];
  data: Hex;
  blockHash: Hash;
  blockNumber: bigint;
  transactionHash: Hash;
  transactionIndex: number;
  logIndex: number;
  removed: boolean;
}

export interface Transaction {
  hash: Hash;
  from: Address;
  to: Address | null;
  input: Hex;
  value: bigint;
  blockHash: Hash;
  blockNumber: bigint;
  transactionIndex: number;
}

// Configuration Types
export interface NetworkConfig {
  chainId: number;
  rpcUrl: string;
}

export interface ContractConfig {
  network: string;
  address: Address;
  abi: any[]; // We'll type this more strictly when we implement ABI handling
  startBlock: number;
}

export interface IndexerConfig {
  networks: Record<string, NetworkConfig>;
  contracts: Record<string, ContractConfig>;
}

// Event Handler Types
export type EventHandler = (event: BaseEvent) => Promise<void>;

export interface EventEmitter {
  on(eventName: string, handler: EventHandler): void;
  emit(eventName: string, event: BaseEvent): Promise<void>;
}

// Client Types
export interface BlockchainClient {
  getBlock(blockNumber: bigint): Promise<Block>;
  getLogs(filter: {
    fromBlock: bigint;
    toBlock: bigint;
    address?: Address | Address[];
    topics?: (Hash | Hash[] | null)[];
  }): Promise<Log[]>;
  getTransaction(hash: Hash): Promise<Transaction>;
}

// Checkpoint Management
export interface Checkpoint {
  blockNumber: bigint;
  blockHash: Hash;
  timestamp: bigint;
}

// Error Types
export class IndexerError extends Error {
  constructor(message: string, public readonly details?: any) {
    super(message);
    this.name = "IndexerError";
  }
}
