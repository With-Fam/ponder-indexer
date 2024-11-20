import { Address } from "viem";
import getBalanceOf from "./getBalanceOf";

const getExpiration = async (hypersub: Address, subscriber: Address) => {
  const balance = await getBalanceOf(hypersub, subscriber);
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expiration = (balance + BigInt(currentTimeInSeconds)).toString();
  return expiration;
};

export default getExpiration;
