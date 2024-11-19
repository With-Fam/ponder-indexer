import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is not set");
}
export const account = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
export const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});
