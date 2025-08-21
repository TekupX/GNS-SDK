import { Options } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteDomain } from "@bonfida/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";
import { toKey } from "../../utils/pubkey";

type FavoriteDomainResult = {
  pubkey: PublicKey;
  domain: string;
  stale: boolean;
} | null;

/**
 * Retrieves the primary (formerly known as favorite) domain associated with a given owner.
 *
 * This hook returns both the primary domain's public key and its reverse mapping (i.e., the
 * human-readable domain name). The result also includes a `stale` flag indicating whether the
 * domain record may be outdated or no longer valid.
 *
 * If no primary domain is found for the given owner, the hook returns `null`.
 *
 * @param connection - The Solana RPC connection object.
 * @param owner - The owner's public key, either base58 encoded or as a `PublicKey` object.
 * @param options - Optional configuration for the query, including a custom query key.
 * @returns An object containing the domain's public key, reverse name, and staleness flag, or `null` if not found.
 */
export const useFavoriteDomain = (
  connection: Connection,
  owner: string | PublicKey | null | undefined,
  options: Options<FavoriteDomainResult> = {
    queryKey: ["useFavoriteDomain", owner],
  },
) => {
  const key = toKey(owner);

  const fn = async (): Promise<FavoriteDomainResult> => {
    if (!key) return null;
    try {
      const res = await getFavoriteDomain(connection, key);
      return { pubkey: res.domain, domain: res.reverse, stale: res.stale };
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return useQuery({
    ...options,
    queryFn: fn,
  });
};

export { useFavoriteDomain as usePrimaryDomain };
