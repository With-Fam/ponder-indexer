// Simplified ABIs with just the events we need
export const SubscriptionTokenV1Abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
] as const;

export const ManageFamAuthorityAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "authority",
        type: "address",
      },
      {
        indexed: false,
        name: "hypersub",
        type: "bool",
      },
    ],
    name: "HypersubSet",
    type: "event",
  },
] as const;
