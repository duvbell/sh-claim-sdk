import { Keypair, PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../src";
import { getWallet } from "./utils";

async function main() {
  const wallet = getWallet();

  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
    keypair: wallet,
  }
  const client = new ClaimClient(config);
  const txHash = await client.initPhase(1);
  console.log("Tx hash: ", txHash);
}

main();
