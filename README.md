# PeerLinkDex

Peerlinkdex backend smart contracts is build in Solidity and we are deploying it on EVM based chains. The frontend is built using React and TS. We will be deploying our subgraph using GoldSky in order to index on-chain data and show it in the frontend. On top of this, the required APIs are deployed on some hosted service.
For the hosted service, we are using AWS Lambda functions to handle the required APIs. These functions are written in Node.js and are responsible for interacting with the smart contracts deployed on the EVM based chains. Additionally, we have integrated Web3.js library to facilitate communication with the blockchain network.

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Noveleader/PeerLinkDex-Superhack.git
    ```

2. Install the dependencies:
    ```bash
    cd peerlinkdex
    yarn
    ```

3. Start the frontend development server:
    ```bash
    yarn start
    ```

