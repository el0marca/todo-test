import { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

const BSC_PARAMS = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com'],
};

const ContractABI = [
  {
    inputs: [],
    name: 'currentEpoch',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const contractAddress = '0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA';

export const Web3 = () => {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0n);
  const [epoch, setEpoch] = useState(0n);

  const MMConnect = async () => {
    if (window?.ethereum) {
      const ethersProvider = new BrowserProvider(window.ethereum);
      setProvider(ethersProvider);
    } else {
      console.error('MetaMask not installed!');
    }
    try {
      if (provider instanceof BrowserProvider) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BSC_PARAMS.chainId }],
        });
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const balance = await provider.getBalance(address);
        setBalance(balance);
        const contract = new Contract(contractAddress, ContractABI, provider);
        const currentEpoch = await contract.currentEpoch();
        setEpoch(currentEpoch);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const closeHandler = () => {
    setProvider(undefined);
    setAccount('');
    setBalance(0n);
    setEpoch(0n);
  };

  return (
    <div className="fixed top-16 left-4 flex flex-col items-start rounded-md shadow-lg bg-emerald-200">
      <button
        className="bg-teal-700 text-white px-2 py-0.5 rounded-md hover:bg-teal-800 justify-end transition-colors duration-200 ease-in-out w-24"
        onClick={MMConnect}>
        Wallet connect
      </button>
      {account && <div>Address: {account}</div>}
      {!!balance && (
        <div>
          Balance:{' '}
          {(
            Number(balance) /
            10 ** BSC_PARAMS.nativeCurrency.decimals
          ).toString()}{' '}
          BNB
        </div>
      )}
      {!!epoch && <div>Epoch: {epoch.toString()}</div>}
      {!!epoch && (
        <button
          className="bg-red-700 text-white px-2 py-0.5 rounded-md hover:bg-red-800 justify-end transition-colors duration-200 ease-in-out w-24"
          onClick={closeHandler}>
          Close
        </button>
      )}
    </div>
  );
};
