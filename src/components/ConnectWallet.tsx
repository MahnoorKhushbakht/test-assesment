import React, {useState} from "react";
import { useWallet } from "../contexts/WalletContext";
import WalletModel from "./WalletModel";

export default function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useWallet();
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}  
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Connect Wallet"}   
      </button>
      <WalletModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}