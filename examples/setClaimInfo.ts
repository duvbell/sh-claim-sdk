import { Keypair, PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../src";
import { getWallet } from "./utils";
import { BN } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";



async function main() {
  const wallet = getWallet();
  const recipient = new PublicKey("GyPcdYe7JrM3W172JecLvS9xUEScjQWhARHyYqT9mj8J");
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
    wallet: wallet,
  }
  const client = new ClaimClient(config);

  const txHash = await client.setClaimInfo(recipient, 1, new BN(100000000));
  console.log(`Transaction: ${txHash}`);
}

main();
