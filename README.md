# Iconoclast  Dapp

A decentralized execution and secure physical voucher-based asset transfers.

---

## 📦 Features

---

### 🔐 PhysicalTokenTransfer Contract

A password-based, redeemable voucher system for transferring ETH or ERC20 tokens securely.

#### 🎫 Voucher Features

- Each voucher consists of:
  - `voucherId`
  - `password` (stored as a hash)
- Funds are locked until the correct password is presented.

#### 🔁 Transfer Mechanism

- **Transferable**: Change the voucher password to pass it securely.
- **Redeemable**: Recipient provides correct password to withdraw.

#### 🔧 Administrative Controls

- Pause/unpause contract (`Pausable`)
- Update fee collector
- Owner-only management

#### 💸 Fee Structure

- 0.1% fee (adjustable via code constants)
- Fee goes to a designated collector address

---

## 🚀 Smart Contract Stack

- Solidity ^0.8.17
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)
  - `ERC20`, `Ownable`, `Pausable`, `SafeERC20`, `ReentrancyGuard`, etc.

---

## 📂 Project Structure (Frontend & Smart Contracts)

- `/contracts` – Solidity smart contracts
- `/frontend` – React-based front end (with wallet integration, routing, module pages)
- `/public` – Assets including mp3 tracks for on-site audio player
- `/src/components` – React components like `Sidebar`, `TokenPriceChart`, etc.

---

## 🛠️ Setup Instructions

### 🔗 Clone Repository

```bash
git clone https://github.com/your-username/iconoclast-dapp.git
cd iconoclast-dapp
📦 Install Dependencies
bash
Copy
npm install
🔨 Run Frontend
bash
Copy
npm run dev
📡 Deploy Smart Contracts
Use Hardhat or Foundry to deploy the contracts.


Deposit ETH or ERC20 tokens to generate a voucher.

Share the voucher ID and password off-chain.

New user can update password to take ownership.

Redeem the voucher securely via password + ID.

🔐 Security Notes
Passwords should be long and unique.

Never share passwords on-chain or publicly.

Smart contracts are unaudited — use at your own risk.

🧠 License
MIT License © 2025 Iconoclast AI
 
