export const ManageFamAuthorityAbi = [
  {
    inputs: [],
    name: "ActiveSubscription",
    type: "error",
  },
  {
    inputs: [],
    name: "ArityMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPartyMember",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPartyMemberVotingPower",
    type: "error",
  },
  {
    inputs: [],
    name: "NoActiveSubscription",
    type: "error",
  },
  {
    inputs: [],
    name: "NoHypersubSet",
    type: "error",
  },
  {
    inputs: [],
    name: "NoPartyMembers",
    type: "error",
  },
  {
    inputs: [],
    name: "NoTokenIds",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "UserAlreadyHasPartyCard",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "hypersub",
        type: "address",
      },
    ],
    name: "HypersubSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "partyMember",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "newIntrinsicVotingPower",
        type: "uint96",
      },
    ],
    name: "PartyCardAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "PartyCardRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "newPartyMembers",
        type: "address[]",
      },
      {
        internalType: "uint96[]",
        name: "newPartyMemberVotingPowers",
        type: "uint96[]",
      },
      {
        internalType: "address[]",
        name: "initialDelegates",
        type: "address[]",
      },
    ],
    name: "addPartyCards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "partyToHypersub",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "removePartyCards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "party",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "hypersub",
        type: "address",
      },
    ],
    name: "setHypersub",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
