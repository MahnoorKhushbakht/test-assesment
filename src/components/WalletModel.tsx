import React, {useState} from "react";
import { useWallet } from "../contexts/WalletContext";

interface WalletModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModel({ isOpen, onClose }: WalletModelProps) {
  const {account,setAccount} = useWallet();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    setLoading(true);
    setMessage("");

    if(typeof window.ethereum === "undefined") {
      setMessage("MetaMask is not installed. Please install it to connect your wallet.");
      setLoading(false);
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setMessage("Wallet connected successfully!");
    } catch (error) {
      setMessage("Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  if (!isOpen) return null;
  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>
        <button
          onClick={onClose} 
          className="w-full mt-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>

  )

}