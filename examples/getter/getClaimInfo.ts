import { PublicKey } from "@solana/web3.js";
import { ClaimClient, Config } from "../../src";
import { getTestWallet, getWallet } from "../utils";

async function main() {
  const user = new PublicKey("7FnkLkamj6jnaZKaJGQs4fuhSuJdGM1HeiyHF5hH15ra");
  const config: Config = {
    rpcUrl: "https://api.devnet.solana.com",
  }
  const client = new ClaimClient(config);
  const phaseInfoPub = new PublicKey("RPbaxALp8J2Mrxw8k4qioBwtXiaG3sLpZjby15ynXC3");
  const claimInfo = await client.getClaimInfo(phaseInfoPub, user);
  console.log(claimInfo);
}

main();
