import { useWallet } from "../contexts/WalletContext";
export const useMetaMask = () => {
  const { setAccount } = useWallet();

  const connect = async (): Promise<string> => {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const accounts = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    setAccount(accounts[0]);
    return accounts[0];
  };

  const autoConnect = async () => {
    if (!window.ethereum) return;
    const accounts = (await window.ethereum.request({
      method: "eth_accounts",
    })) as string[];
    if (accounts.length) setAccount(accounts[0]);
  };

  return { connect, autoConnect };
};