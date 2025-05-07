import { Keypair, PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../src";
import { getTestWallet, getWallet } from "./utils";
import { BN } from "@coral-xyz/anchor";



async function main() {
  const keypair = getWallet();
  const recipient = new PublicKey("BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i");
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
    keypair: keypair,
  }
  const client = new ClaimClient(config);

  const txHash = await client.setClaimInfo(recipient, 1, new BN(100000000));
  console.log(`Transaction: ${txHash}`);
}

main();
