import React, {useState} from "react";
import { useMetaMask } from "../hooks/useMetaMask";

interface WalletModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModel({ isOpen, onClose }: WalletModelProps) {
    const { connect } = useMetaMask();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleConnect = async () => {
    setLoading(true);
    setMessage("");
    try {
      await connect();
      setMessage("Connected!");
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage("Connection failed");
    }
    setLoading(false);
  };

  if (!isOpen) return null;
  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full bg-slate-500 text-white py-2 px-4 rounded hover:bg-slate-600 disabled:opacity-50"
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