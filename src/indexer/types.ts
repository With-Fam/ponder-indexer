import { Address, Hash, Hex } from 'viem';

export interface BaseEvent {
  name: string;
  args: Record<string, any>;
  log: Log;
  block: Block;
  transaction: Transaction;
}