import { Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import idl from "../artifacts/claim.json";
import { ClaimContract } from "../artifacts/claim";
import { Orao } from "@orao-network/solana-vrf";


export type Config = {
  rpcUrl: string;
  keypair?: Keypair;
}

export type Fixture = {
  program: Program<ClaimContract>;
  vrf: Orao;
  provider: AnchorProvider;
}

export const getFixture = (config: Config): Fixture => {
  const connection = new Connection(config.rpcUrl);

  // TODO: mock wallet, since we don't need to sign transactions
  if (!config.keypair) {
    config.keypair = Keypair.generate();
  }
  const wallet = new Wallet(config.keypair);
  const provider = new AnchorProvider(connection, wallet);
  const program = new Program(idl, provider) as Program<ClaimContract>;
  const vrf = new Orao(provider);
  return { program, vrf, provider };
}

