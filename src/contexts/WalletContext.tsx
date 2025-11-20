import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  account: string | null;
  setAccount: (account: string | null) => void;
}
const WalletContext = createContext<WalletContextType>({
  account: null,
  setAccount: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      {children}
    </WalletContext.Provider>
  );
}


export const useWallet = () => useContext(WalletContext);