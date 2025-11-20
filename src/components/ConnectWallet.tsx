import React, {useState} from "react";
import { useWallet } from "../contexts/WalletContext";
import WalletModel from "./WalletModel";
import { Wallet } from "lucide-react";

export default function ConnectWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account } = useWallet();

  
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}  
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50 text-lg px-2 py-1 rounded-full"
                    >
                      <Wallet className="mr-2 h-5 w-5" />
      
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Connect Wallet"}   
      </button>
      <WalletModel isOpen={isModalOpen} />
    </div>
  );
}