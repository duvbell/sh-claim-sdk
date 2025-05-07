import { ClaimClient, Config } from "../../src";
import { getWallet } from "../utils";

async function main() {
  const wallet = getWallet();

  // dont need signing wallet for getter function
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
  }
  const client = new ClaimClient(config);
  const phase = await client.getPhase(wallet.publicKey, 1);
  console.log(phase);
}

main();
