import { Keypair, PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../src";
import { getTestWallet, getWallet } from "./utils";

async function main() {
  const testWallet = getWallet();
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
    wallet: testWallet,
  }
  const client = new ClaimClient(config);

  const phaseInfoPub = new PublicKey("RPbaxALp8J2Mrxw8k4qioBwtXiaG3sLpZjby15ynXC3");
  const phase = await client.getPhase(phaseInfoPub);
  console.log(phase);

  const txHash = await client.claim(phaseInfoPub);
  console.log(`Transaction: ${txHash}`);
}

main();
