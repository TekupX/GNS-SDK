import { Connection, PublicKey } from "@solana/web3.js";
import { NAME_PROGRAM_ID, ROOT_DOMAIN_ACCOUNT } from "../constants";
import { NameRegistryState } from "../state";
import { reverseLookup } from "./reverseLookup";

/**
 * This function can be used to retrieve all domain names and sub domains owned by `wallet`
 * @param connection The Solana RPC connection object
 * @param wallet The wallet you want to search subdomain names for
 * @returns
 */
export async function getAllSubDomains(
  connection: Connection,
  wallet: PublicKey,
): Promise<any[]> {
  const filters = [
    {
      memcmp: {
        offset: 32,
        bytes: wallet.toBase58(),
      },
    },
  ];
  const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    commitment: "confirmed",
    encoding: "base64",
    filters,
  });

  const domainKeyNames: any = {};
  const subdomains: any[] = [];
  for (const account of accounts) {
    const { registry } = await NameRegistryState.retrieve(
      connection,
      account.pubkey,
    );
    
    if (!registry.data || registry.parentName.toString() === ROOT_DOMAIN_ACCOUNT.toString()|| registry.parentName.toString() === "11111111111111111111111111111111") continue;
    if (!domainKeyNames[registry.toString()]) {
      const parentName = await reverseLookup(connection, registry.parentName);
      domainKeyNames[registry.parentName.toString()] = parentName;
    }
    const subdomain = await reverseLookup(
      connection,
      account.pubkey,
      registry.parentName,
    );
    subdomains.push({
      pubkey: account.pubkey,
      parentName: registry.parentName,
      parent: domainKeyNames[registry.parentName.toString()],
      subdomain,
    });
  }
  return subdomains;
}
