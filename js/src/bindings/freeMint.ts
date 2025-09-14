import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  NAME_PROGRAM_ID,
  ROOT_DOMAIN_ACCOUNT,
  REGISTER_PROGRAM_ID,
  CENTRAL_STATE,
  OPERATOR,
} from "../constants";
import { getHashedNameSync } from "../utils/getHashedNameSync";
import { getNameAccountKeySync } from "../utils/getNameAccountKeySync";
import { InvalidDomainError } from "../error";
import { freeMintInstruction } from "../instructions/freeMintInstruction";

/**
 * This function can be used to free mint a .sol domain
 * @param name The domain name to register e.g bonfida if you want to register bonfida.sol
 * @param space The domain name account size (max 10kB)
 * @param buyer The public key of the buyer
 * @returns
 */
export const freeMint = async (
  name: string,
  space: number,
  buyer: PublicKey,
) => {
  // Basic validation
  if (name.includes(".") || name.trim().toLowerCase() !== name) {
    throw new InvalidDomainError("The domain name is malformed");
  }

  const hashed = getHashedNameSync(name);
  const nameAccount = getNameAccountKeySync(
    hashed,
    undefined,
    ROOT_DOMAIN_ACCOUNT,
  );

  const hashedReverseLookup = getHashedNameSync(nameAccount.toBase58());
  const reverseLookupAccount = getNameAccountKeySync(
    hashedReverseLookup,
    CENTRAL_STATE,
  );

  const [derived_state] = PublicKey.findProgramAddressSync(
    [nameAccount.toBuffer()],
    REGISTER_PROGRAM_ID,
  );

  const ixs: TransactionInstruction[] = [];

  const ix = new freeMintInstruction({
    name,
    space,
    referrerIdxOpt: null,
  }).getInstruction(
    REGISTER_PROGRAM_ID,
    NAME_PROGRAM_ID,
    ROOT_DOMAIN_ACCOUNT,
    nameAccount,
    reverseLookupAccount,
    SystemProgram.programId,
    CENTRAL_STATE,
    buyer,
    buyer,
    buyer,
    SYSVAR_RENT_PUBKEY,
    derived_state,
    OPERATOR,
  );
  ixs.push(ix);

  return ixs;
};
