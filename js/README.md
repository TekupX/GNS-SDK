<p align="center">
<img width="250" src="https://v2.sns.id/assets/logo/brand.svg"/>
</p>

# GNS JS-KIT SDK

![npm version](https://img.shields.io/npm/v/@bonfida%2Fspl-name-service)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/bonfida/sns-sdk)

The JS-KIT SDK is a JavaScript toolkit for managing .gor domains and records. Built on `@solana/web3.js` 1.x, it simplifies development and ensures secure and efficient functionality.

User guide can be found [here](https://bonfida.github.io/solana-name-service-guide).

# Gorbagana Domain Service Guide

A guide to retrieve all domains owned by a user using the Gorbagana Name Service.

## Overview

This example demonstrates how to:
- Get all domains owned by a specific user
- Perform reverse lookup from account to domain name
- Resolve domain names to wallet addresses

## Prerequisites

Make sure you have the required dependencies installed:

```bash
npm install @solana/web3.js @gorid/spl-name-service
```

## Usage

```typescript
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAllDomains,
  resolve,
  reverseLookup,
} from "@gorid/spl-name-service";

export async function main() {
  const connection = new Connection("https://rpc.gorbagana.wtf/");

  // Get all domains owned by a specific user
  const allDomains = await getAllDomains(
    connection,
    new PublicKey("55M2GxZ55saab85Qcd4NTet6TYqVni1tM3SvUQQiNG6H")
  );
  console.log("List domain that user owns", allDomains.map(d => d.toString()))

  // Reverse lookup: Get domain name from account address
  const resolveDomain = await reverseLookup(
    connection,
    new PublicKey("GSjr7i3U6xPQMHQN2sWJNhahCJRqQPv23e1HJ4ZtpeWc")
  );
  console.log("Resolve domain from account name: ", resolveDomain.toString())
  
  // Resolve domain name to wallet address
  const owner = await resolve(connection, "jade"); 
  console.log("Owner :", owner.toString()); // 55M2GxZ55saab85Qcd4NTet6TYqVni1tM3SvUQQiNG6H
}
```

## Functions

### `getAllDomains(connection, publicKey)`
Retrieves all domains owned by the specified public key.

**Parameters:**
- `connection`: Solana RPC connection
- `publicKey`: The owner's public key

**Returns:** Array of domain names

### `reverseLookup(connection, publicKey)`
Performs reverse lookup to get the domain name associated with an account.

**Parameters:**
- `connection`: Solana RPC connection  
- `publicKey`: The account's public key

**Returns:** Domain name string

### `resolve(connection, domainName)`
Resolves a domain name to its associated wallet address.

**Parameters:**
- `connection`: Solana RPC connection
- `domainName`: The domain name to resolve

**Returns:** Public key of the domain owner



## Dependencies

- `@solana/web3.js` - Solana JavaScript SDK
- `@gorid/spl-name-service` - SPL Name Service utilities