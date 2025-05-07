/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/claim_contract.json`.
 */
export type ClaimContract = {
  "address": "4VpxCJkYsBMxp4kC5ZEV9amoZajjBftYqAZrUFNQ1snn",
  "metadata": {
    "name": "claimContract",
    "version": "0.6.1",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "claim",
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "phaseInfo",
          "writable": true
        },
        {
          "name": "recipient",
          "writable": true
        },
        {
          "name": "claimInfo",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initPhase",
      "discriminator": [
        81,
        205,
        114,
        86,
        147,
        115,
        163,
        110
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "phase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  104,
                  97,
                  115,
                  101,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "phaseId"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "phaseId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "phaseId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setClaimInfo",
      "discriminator": [
        160,
        133,
        55,
        107,
        88,
        223,
        3,
        34
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "phaseInfo"
          ]
        },
        {
          "name": "phaseInfo",
          "writable": true
        },
        {
          "name": "recipient",
          "writable": true
        },
        {
          "name": "claimInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "phaseInfo"
              },
              {
                "kind": "account",
                "path": "recipient"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "claimInfo",
      "discriminator": [
        129,
        190,
        22,
        157,
        235,
        64,
        38,
        111
      ]
    },
    {
      "name": "phaseInfo",
      "discriminator": [
        175,
        248,
        113,
        218,
        123,
        235,
        237,
        60
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "randomnessRequestSerializationError",
      "msg": "Unable to serialize a randomness request"
    },
    {
      "code": 6001,
      "name": "youMustPutInSomeForce",
      "msg": "You must put in some force"
    },
    {
      "code": 6002,
      "name": "notOwner",
      "msg": "Not owner"
    },
    {
      "code": 6003,
      "name": "alreadyClaimed",
      "msg": "Already claimed"
    },
    {
      "code": 6004,
      "name": "notClaimer",
      "msg": "Not claimer"
    },
    {
      "code": 6005,
      "name": "notVault",
      "msg": "Not vault"
    },
    {
      "code": 6006,
      "name": "notPhaseInfo",
      "msg": "Not phase info"
    }
  ],
  "types": [
    {
      "name": "claimInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "phaseInfoPubkey",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "phaseInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "phase",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "vaultPubkey",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
