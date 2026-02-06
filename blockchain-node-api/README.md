# Getting Started

This is the backend of the project.

## Option A: Truffle's built-in blockchain (no Ganache)

1. Run `yarn` or `pnpm install` to install dependencies.
2. Start the local chain: **`npx truffle develop`** (starts a blockchain on port **9545** and opens a console).
3. In the Truffle develop console, run **`migrate`** to compile and deploy the Contacts contract.
4. Keep that terminal open. In a **second terminal**, run **`nodemon server.js`** to start the API.

The server reads the contract address from the build artifact, so you don't need to edit `config.js` after migrating.

## Option B: Ganache

1. Install and run [Ganache](https://trufflesuite.com/ganache/) (default port 7545).
2. In `truffle-config.js` and `server.js`, use port **7545** instead of 9545.
3. Run `truffle migrate`, then copy the deployed contract address into `config.js` as `CONTACT_ADDRESS`.
4. Run `nodemon server.js`.

## Run the server (after a chain is running)

```
nodemon server.js
```

Server listens on port 3001. No database required — contact data comes from the blockchain.
