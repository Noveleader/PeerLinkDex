# PeerLinkDex

Peerlinkdex backend smart contracts is build in Solidity and deployed on `base-sepolia`. The frontend is built using React and TS. 

Contract Address of Escrow Contract: `0x06BEeD7f4c292661Ae6c464D1581f7f2F3ecDAe1`

Subgraph is deployed on GoldSky in order to index on-chain data and show it in the frontend. 

Additionaly, `viem` library is used to facilitate on-chain interactions

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

