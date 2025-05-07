import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {  Config, Fixture } from "./fixture";

import { getFixture } from "./fixture";
import { BN } from "@coral-xyz/anchor";



export type ClaimInfo = {
  user: PublicKey;
  phaseInfoPubkey: PublicKey;
  amount: BN;
  isClaimed: boolean;
}

export type PhaseInfo = {
  phaseInfoPubkey: PublicKey;
  owner: PublicKey;
  phase: number;
  totalAmount: BN;
  claimedAmount: BN;
  vault: PublicKey;
}



export class ClaimClient {
  private fixture: Fixture;
  constructor(config: Config) {
    this.fixture = getFixture(config);
  }

  getPhasePDA(owner: PublicKey, phase_id: number) : PublicKey {
    const phaseIdBn = new BN(phase_id);
    let phase_id_bytes = phaseIdBn.toArrayLike(Buffer, "le", 8);
    const [phase] = PublicKey.findProgramAddressSync(
        [Buffer.from("phase_info"), owner.toBuffer(), phase_id_bytes],
        this.fixture.program.programId
    );
    return phase;
  }

  getVaultPDA(owner: PublicKey, phaseId: number) : PublicKey {
    const phaseIdBn = new BN(phaseId);
    let phase_id_bytes = phaseIdBn.toArrayLike(Buffer, "le", 8);
    const [vault] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), owner.toBuffer(), phase_id_bytes],
        this.fixture.program.programId
    );
    return vault;
  }

  getClaimInfoPDA(phaseInfo: PublicKey, recipient: PublicKey) : PublicKey {
    const [claimInfo] = PublicKey.findProgramAddressSync(
        [Buffer.from("claim_info"), phaseInfo.toBuffer(), recipient.toBuffer()],
        this.fixture.program.programId
    );
    return claimInfo;
  }

  async getPhase(phaseInfoPubkey: PublicKey) : Promise<PhaseInfo> {
    const phase = await this.fixture.program.account.phaseInfo.fetch(phaseInfoPubkey);
    return {
      phaseInfoPubkey: phaseInfoPubkey,
      owner: phase.owner,
      phase: phase.phase,
      totalAmount: phase.totalAmount,
      claimedAmount: phase.claimedAmount,
      vault: phase.vaultPubkey,
    };
  }

  async getVaultBalance(phaseInfoPubkey: PublicKey) : Promise<BN> {
    const phase = await this.getPhase(phaseInfoPubkey);
    const vaultPDA = this.getVaultPDA(phase.owner, phase.phase);

    // Get account rent fee 
    const rent = await this.fixture.provider.connection.getMinimumBalanceForRentExemption(0);
    const rentBN = new BN(rent);
    const vaultBalance = await this.fixture.provider.connection.getBalance(vaultPDA);
    return new BN(vaultBalance).sub(rentBN);
  }

  async getClaimInfo(phaseInfoPubkey: PublicKey, recipient: PublicKey) : Promise<ClaimInfo> {
    const claimInfo = await this.fixture.program.account.claimInfo.fetch(this.getClaimInfoPDA(phaseInfoPubkey, recipient));
    return {
      user: claimInfo.user,
      phaseInfoPubkey: claimInfo.phaseInfoPubkey,
      amount: claimInfo.amount,
      isClaimed: claimInfo.isClaimed,
    };
  }

  async initPhase(phaseId: number) : Promise<string> {
    const txHash = await (this.fixture.program.methods as any).initPhase(new BN(phaseId)).accounts({
        owner: this.fixture.provider.wallet.publicKey,
        phase: this.getPhasePDA(this.fixture.provider.wallet.publicKey, phaseId),
        vault: this.getVaultPDA(this.fixture.provider.wallet.publicKey, phaseId),
        systemProgram: SystemProgram.programId,
    }).rpc();
    return txHash;
  }

  async setClaimInfo(recipient: PublicKey, phaseId: number, amount: BN) : Promise<string> {
    const phasePDA = this.getPhasePDA(this.fixture.provider.wallet.publicKey, phaseId);
    const claimInfoPDA = this.getClaimInfoPDA(phasePDA, recipient);

    const txHash = await (this.fixture.program.methods as any).setClaimInfo(amount).accounts({
        owner: this.fixture.provider.wallet.publicKey,
        phaseInfo: phasePDA,
        recipient: recipient,
        claimInfo: claimInfoPDA,
        vault: this.getVaultPDA(this.fixture.provider.wallet.publicKey, phaseId),
        systemProgram: SystemProgram.programId,
    }).rpc();
    return txHash;
  }

  async claim(phaseInfo: PublicKey) : Promise<string> {
    // Get phase info 
    const phase = await this.fixture.program.account.phaseInfo.fetch(phaseInfo);

    const vaultPDA = this.getVaultPDA(phase.owner, phase.phase);
    const txHash = await (this.fixture.program.methods as any).claim().accounts({
        user: this.fixture.provider.wallet.publicKey,
        phaseInfo: phaseInfo,
        recipient: this.fixture.provider.wallet.publicKey,
        claimInfo: this.getClaimInfoPDA(phaseInfo, this.fixture.provider.wallet.publicKey),
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
    }).rpc();
    return txHash;
  }
} 