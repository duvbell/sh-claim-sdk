import { Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet as NodeWallet} from "@coral-xyz/anchor";
import idl from "../artifacts/claim.json";
import { ClaimContract } from "../artifacts/claim";
import { Orao } from "@orao-network/solana-vrf";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";

export type Config = {
  rpcUrl: string;
  wallet?: Wallet;
}

export type Fixture = {
  program: Program<ClaimContract>;
  vrf: Orao;
  provider: AnchorProvider;
}

export const getFixture = (config: Config): Fixture => {
  const connection = new Connection(config.rpcUrl);

  // TODO: mock wallet, since we don't need to sign transactions
  if (!config.wallet) {
    config.wallet = new NodeWallet(Keypair.generate());
  }
  const provider = new AnchorProvider(connection, config.wallet);
  const program = new Program(idl, provider) as Program<ClaimContract>;
  const vrf = new Orao(provider);
  return { program, vrf, provider };
}

