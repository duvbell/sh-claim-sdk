import { Wallet } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
export const getWallet = () => {
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from(require(`/root/.config/solana/id.json`))
  );
  return new Wallet(keypair);
};

export const getTestWallet = () => {
  return new Wallet(Keypair.fromSecretKey(
    Uint8Array.from(require(`/root/.config/solana/test1.json`))
  ));
};


