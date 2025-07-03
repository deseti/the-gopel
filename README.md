# <img src="public/icon.png" alt="Hodl Golem" width="60" style="vertical-align:middle; margin-right:10px;"/> The Gøpel - Monad Ecosystem Hub & Hodl Spinner

---

> **A submission for Monad Mission 5**

**The Gøpel** is a user-friendly platform and gamified NFT minting dApp for the Monad ecosystem. Discover projects, connect your wallet, and play the unique "Hodl Spinner" game to mint exclusive NFTs!

---

## 🚀 [Live Demo](https://the-gopel.vercel.app)

*(Replace with your actual Vercel URL after deployment)*

---

## ✨ Key Features

- **Project Hub:** Live directory of NFT collections on Monad testnet.
- **Instant Search:** Filter projects by name in real time.
- **Seamless Wallet Integration:** Connect with RainbowKit, Wagmi, and Viem.
- **Gamified Minting:** Play the "Hodl Spinner" for a chance to mint 1, 2, or 3 NFTs per spin.
- **Modern UI:** Beautiful, responsive, and dark-themed interface.

---

## 🎲 The "Hodl Spinner" Experience

1. **Pay to Play:** Pay 0.1 MON to spin the wheel.
2. **Spin the Wheel:** Enjoy a dynamic, animated spin game.
3. **Random Outcome:** The smart contract determines if you win 1, 2, or 3 NFTs.
4. **Claim Your Golems:** NFTs are minted directly to your wallet.

<p align="center">
  <img src="public/icon.png" alt="NFT Preview" width="160"/>
</p>

> *Forged in the volatile fires of the testnet, the Monad Golems are unbreakable. They carry a simple, powerful message for every builder and user: HODL.*

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- RainbowKit, Wagmi, Viem
- Axios
- Vercel (Deployment)

**Smart Contract:**
- Solidity (ERC-1155, Foundry)
- Monad Testnet

---

## ⚙️ Getting Started

```bash
# Clone the repository
$ git clone https://github.com/deseti/the-gopel.git
$ cd the-gopel

# Install dependencies
$ npm install

# Start the development server
$ npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 Smart Contract

- **Network:** Monad Testnet
- **Contract Address:** [`0xC9F7a743bCDBC418C2A3B93d841Afb25b1Fa603b`](https://testnet.monadexplorer.com/address/0xC9F7a743bCDBC418C2A3B93d841Afb25b1Fa603b)
- **Function:** `spinAndMint()` (payable, 0.1 MON)
- **Event:** `GolemSpin(address indexed player, uint256 quantityMinted)`

---

## 🗂️ Project Structure

```
public/
  icon.png           # NFT preview image
src/
  abis/HodlGolem.json
  components/
  pages/
    MintPage.jsx     # Main minting UI
  App.jsx
  main.jsx
  index.css
package.json
vite.config.js
README.md
```

---

## 👤 Author

- [deseti](https://github.com/deseti)

---

## 📝 License

MIT