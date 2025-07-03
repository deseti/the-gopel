🔮 The Gøpel - Monad Ecosystem Hub & Hodl Spinner
A submission for the Monad Mission 5 event. "The Gøpel" is a user-friendly tooling platform designed to be the central hub for discovering projects and creators within the Monad ecosystem, featuring a unique and gamified NFT minting experience.

🚀 Live Demo
Access the deployed application here:

https://the-gopel.vercel.app

(Note: Please replace this with your actual Vercel URL after deployment)

✨ Key Features
Project Hub: Fetches and displays a live list of NFT collections from the Monad testnet, providing a comprehensive directory for the ecosystem.

Interactive Search: Instantly filter projects by name to easily find what you're looking for.

Seamless Wallet Integration: Connect your Web3 wallet using the modern and robust stack of RainbowKit, Wagmi, and Viem.

Gamified Minting ("Hodl Spinner"): A novel minting mechanism where the outcome is determined by a random spin, making the experience engaging and unpredictable.

🎲 The "Hodl Spinner" Mechanism
The "Hodl Spinner" is our implementation of the event's "Novel Mechanics" criteria. Instead of a standard mint, users get to play a game of chance:

Pay to Play: A user pays a fixed fee of 0.1 MON to initiate one spin.

Spin the Machine: A dynamic animation of a spinning wheel is displayed on the frontend.

Random Outcome: The smart contract securely generates a random number, resulting in 1, 2, or 3.

Claim Your Reward: The user receives the "Hodl Golem" NFT, minted directly to their wallet in the quantity determined by the spin.

The NFT: Hodl Golem
Forged in the volatile fires of the testnet, the Monad Golems are unbreakable. They carry a simple, powerful message for every builder and user: HODL. Minting a Golem signifies your unwavering belief in the long-term vision of parallelized execution.

🛠️ Tech Stack
Frontend
Framework: React (with Vite)

Wallet Connection: RainbowKit, Wagmi, Viem

API Calls: Axios

Deployment: Vercel

Backend (Smart Contract)
Language: Solidity

Framework: Foundry

Token Standard: ERC-1155

Blockchain: Monad Testnet

⚙️ Running Locally
To run this project on your local machine:

Clone this repository:

git clone https://github.com/deseti/the-gopel.git

Navigate into the project directory:

cd the-gopel

Install all required packages:

npm install

Run the development server:

npm run dev

Open http://localhost:5173 in your browser.

📄 Smart Contract Information
Network: Monad Testnet

Contract Address: 0xC9F7a743bCDBC418C2A3B93d841Afb25b1Fa603b

View on Explorer: https://testnet.monadexplorer.com/address/0xC9F7a743bCDBC418C2A3B93d841Afb25b1Fa603b