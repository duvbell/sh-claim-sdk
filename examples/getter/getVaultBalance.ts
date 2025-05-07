import { PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../../src";
import { getTestWallet, getWallet } from "../utils";

async function main() {
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
  }
  const client = new ClaimClient(config);
  const phaseInfoPub = new PublicKey("RPbaxALp8J2Mrxw8k4qioBwtXiaG3sLpZjby15ynXC3");


  const vaultBalance = await client.getVaultBalance(phaseInfoPub);
  console.log(vaultBalance.toString());
}

main();
