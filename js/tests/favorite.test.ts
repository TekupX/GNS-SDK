require("dotenv").config();
import { test, jest } from "@jest/globals";
import {
  getFavoriteDomain,
} from "../src/favorite-domain";
import { PublicKey, Connection } from "@solana/web3.js";


jest.setTimeout(10_000);

const connection = new Connection("https://rpc.gorbagana.wtf/");

test("Favorite domain", async () => {
 
    const fav = await getFavoriteDomain(connection, new PublicKey("FzdN2zE7QUmwKL2T4Y3LTcBUYGtMZP5qsgUjBxsdedNx"));
    console.log("🚀 ~ file: favorite.test.ts:23 ~ test ~ fav:", fav)

  
});

// test("Multiple favorite domains", async () => {
//   const items = [
//     // Non tokenized
//     {
//       wallet: new PublicKey("Fw1ETanDZafof7xEULsnq9UY6o71Tpds89tNwPkWLb1v"),
//       domain: "couponvault",
//     },
//     // Stale non tokenized
//     {
//       wallet: new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ"),
//       domain: undefined,
//     },
//     // Random pubkey
//     { wallet: Keypair.generate().publicKey, domain: undefined },
//     // Tokenized
//     {
//       wallet: new PublicKey("36Dn3RWhB8x4c83W6ebQ2C2eH9sh5bQX2nMdkP2cWaA4"),
//       domain: "fav-tokenized",
//     },
//   ];
//   const result = await getMultipleFavoriteDomains(
//     connection,
//     items.map((e) => e.wallet),
//   );
//   result.forEach((x, idx) => expect(x).toBe(items[idx].domain));
// });

// test("Register fav", async () => {
//   const owner = new PublicKey("Fxuoy3gFjfJALhwkRcuKjRdechcgffUApeYAfMWck6w8");
//   const tx = new Transaction();
//   const ix = await registerFavorite(
//     connection,
//     getDomainKeySync("wallet-guide-3").pubkey,
//     owner,
//   );
//   tx.add(ix);
//   const { blockhash } = await connection.getLatestBlockhash();
//   tx.recentBlockhash = blockhash;
//   tx.feePayer = owner;
//   const res = await connection.simulateTransaction(tx);
//   expect(res.value.err).toBe(null);
// });
