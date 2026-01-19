# ERC-4907 Rentable NFT

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Standard](https://img.shields.io/badge/ERC-4907-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**ERC-4907 Rentable NFT** separates the concept of "Owner" (who holds the asset) from "User" (who can use it). The User role has an automatic expiration timestamp, removing the need for a second transaction to reclaim the asset.

## Features

-   **Set User**: Owner can assign a wallet as the temporary user.
-   **Auto-Expiry**: The `userOf(tokenId)` function automatically returns the zero address if the rental period has passed.
-   **Zero-Gas Reclamation**: Owners don't need to pay gas to kick a user out; the blockchain "forgets" them when time runs out.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy
npx hardhat run deploy.js --network localhost

# 3. Mint a Game Item
node mint_nft.js

# 4. Rent it to someone (Set User)
node set_user.js

# 5. Check active user
node check_user.js
