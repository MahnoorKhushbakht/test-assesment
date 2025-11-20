// To let typescript know about global types
export {};

interface EthereumProvider{
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;    
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}