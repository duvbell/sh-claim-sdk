import { Keypair } from "@solana/web3.js";

export const getWallet = () => {
  return Keypair.fromSecretKey(
    Uint8Array.from(require(`/root/.config/solana/id.json`))
  );
};

export const getTestWallet = () => {
  return Keypair.fromSecretKey(
    Uint8Array.from(require(`/root/.config/solana/test1.json`))
  );
};


