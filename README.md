# Claim contract, following getter and setter pattern

Please refer to the examples for usage.

## Get claim info

We gonna have each seperate account that manage a phase, call phase info account.

So to get claim info, we need to provide the phase info account pubkey, as well as the recipient's pubkey.

> No signing wallet is needed for getter function.

```bash
ts-node examples/getter/getClaimInfo.ts
```


```ts
import { PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../../src";
import { getTestWallet, getWallet } from "../utils";

async function main() {
  const phaseInfoPub = new PublicKey("RPbaxALp8J2Mrxw8k4qioBwtXiaG3sLpZjby15ynXC3");

  const user = new PublicKey("7FnkLkamj6jnaZKaJGQs4fuhSuJdGM1HeiyHF5hH15ra");
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
  }
  const client = new ClaimClient(config);
  const claimInfo = await client.getClaimInfo(phaseInfoPub, user);
  console.log(claimInfo);
}

main();

``` 

## Claim

To claim, we need to provide the phase info account pubkey, as well as the signing wallet 

For FE, the signing wallet should be taken from the wallet adapter
```ts
  const testWallet = getTestWallet();
```


```ts
import { Keypair, PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../src";
import { getTestWallet, getWallet } from "./utils";

async function main() {
  const phaseInfoPub = new PublicKey("RPbaxALp8J2Mrxw8k4qioBwtXiaG3sLpZjby15ynXC3");
  const testWallet = getTestWallet();
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
    keypair: testWallet,
  }
  const client = new ClaimClient(config);

  const phase = await client.getPhase(phaseInfoPub, 1);
  console.log(phase);

  const txHash = await client.claim(phaseInfoPub);
  console.log(`Transaction: ${txHash}`);
}

main();
``` 
