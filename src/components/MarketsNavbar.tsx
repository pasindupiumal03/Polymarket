'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdOutlineStarRate } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

// BNB Chain configuration
const BNB_CHAIN_CONFIG = {
  chainId: '0x38', // 56 in hex
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

// Supported wallet types
interface WalletProvider {
  name: string;
  icon: string;
  isInstalled: () => boolean;
  connector: any;
}

declare global {
  interface Window {
    ethereum?: any;
    BinanceChain?: any;
    phantom?: {
      ethereum?: any;
    };
    trustWallet?: any;
  }
}

export default function MarketsNavbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [fullWalletAddress, setFullWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.0000');
  const [points] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [connectedWalletType, setConnectedWalletType] = useState<string | null>(null);
  
  const pathname = usePathname();
  const [walletProviders, setWalletProviders] = useState<WalletProvider[]>([]);

  // Get available wallets
  const getWalletProviders = (): WalletProvider[] => {
    const wallets: WalletProvider[] = [];

    // Check if we're in browser environment
    if (typeof window === 'undefined') return wallets;

    // MetaMask - Use specific MetaMask provider if available
    if (window.ethereum?.isMetaMask && !window.phantom?.ethereum) {
      wallets.push({
        name: 'MetaMask',
        icon: '/metamask.jpg',
        isInstalled: () => Boolean(window.ethereum?.isMetaMask),
        connector: window.ethereum,
      });
    } else if (window.ethereum?.providers) {
      // Handle multiple providers (EIP-5749)
      const metaMaskProvider = window.ethereum.providers.find((provider: any) => provider.isMetaMask);
      if (metaMaskProvider) {
        wallets.push({
          name: 'MetaMask',
          icon: '/metamask.jpg',
          isInstalled: () => Boolean(metaMaskProvider),
          connector: metaMaskProvider,
        });
      }
    }

    // Trust Wallet
    if (window.ethereum?.isTrust || window.trustWallet) {
      const trustProvider = window.trustWallet || 
        (window.ethereum?.providers?.find((provider: any) => provider.isTrust)) || 
        (window.ethereum?.isTrust ? window.ethereum : null);
      
      if (trustProvider) {
        wallets.push({
          name: 'Trust Wallet',
          icon: '/trustwallet.png',
          isInstalled: () => Boolean(trustProvider),
          connector: trustProvider,
        });
      }
    }

    // Binance Chain Wallet
    if (window.BinanceChain) {
      wallets.push({
        name: 'Binance Chain Wallet',
        icon: '/BinanceChainWallet.svg',
        isInstalled: () => Boolean(window.BinanceChain),
        connector: window.BinanceChain,
      });
    }

    // Fallback: Generic Ethereum wallet (only if no specific wallet detected and ethereum exists)
    // Exclude phantom from fallback
    if (window.ethereum && wallets.length === 0 && !window.phantom?.ethereum) {
      wallets.push({
        name: 'Browser Wallet',
        icon: '/GenericEthereumwallet.webp',
        isInstalled: () => Boolean(window.ethereum),
        connector: window.ethereum,
      });
    }

    return wallets;
  };

  // Detect wallets on mount and poll briefly (some extensions inject after page load)
  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      for (let i = 0; i < 6; i++) {
        const list = getWalletProviders();
        if (!mounted) return;
        setWalletProviders(list);
        if (list.length > 0) return;
        // wait 500ms before trying again
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => setTimeout(res, 500));
      }
    };

    poll();

    return () => {
      mounted = false;
    };
  }, []);

  // Restore wallet connection from localStorage on mount
  useEffect(() => {
    const storedWalletData = localStorage.getItem('wallet_connection');
    if (storedWalletData) {
      try {
        const { address, fullAddress, balance, walletType, chainId } = JSON.parse(storedWalletData);
        setWalletAddress(address);
        setFullWalletAddress(fullAddress);
        setBalance(balance);
        setConnectedWalletType(walletType);
        setCurrentChainId(chainId);
        setIsConnected(true);
        
        // Try to reconnect to the same wallet
        setTimeout(() => {
          const wallets = getWalletProviders();
          const savedWallet = wallets.find(w => w.name === walletType);
          if (savedWallet) {
            // Update balance
            getBalance(savedWallet.connector, fullAddress).then(setBalance);
          }
        }, 1000);
      } catch (error) {
        console.error('Error restoring wallet connection:', error);
        localStorage.removeItem('wallet_connection');
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showWalletDropdown && !target.closest('.wallet-dropdown-container')) {
        setShowWalletDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWalletDropdown]);

  const detectWallets = () => setWalletProviders(getWalletProviders());

  // Check current network
  const checkNetwork = async (provider: any) => {
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      setCurrentChainId(chainId);
      return chainId === BNB_CHAIN_CONFIG.chainId;
    } catch (error) {
      console.error('Error checking network:', error);
      return false;
    }
  };

  // Switch to BNB Chain
  const switchToBNBChain = async (provider: any) => {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BNB_CHAIN_CONFIG.chainId }],
      });
      setCurrentChainId(BNB_CHAIN_CONFIG.chainId);
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [BNB_CHAIN_CONFIG],
          });
          setCurrentChainId(BNB_CHAIN_CONFIG.chainId);
          return true;
        } catch (addError) {
          console.error('Error adding BNB Chain:', addError);
          return false;
        }
      } else {
        console.error('Error switching to BNB Chain:', switchError);
        return false;
      }
    }
  };

  // Get balance
  const getBalance = async (provider: any, address: string) => {
    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      return balanceInEth.toFixed(4);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0.0000';
    }
  };

  // Connect to wallet
  const connectWallet = async (walletProvider: WalletProvider) => {
    setIsConnecting(true);
    try {
      const provider = walletProvider.connector;
      
      // Standard Ethereum wallet connection
      const accounts = await provider.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      
      // Check if we're on BNB Chain
      const isOnBNBChain = await checkNetwork(provider);
      
      if (!isOnBNBChain) {
        setShowWalletModal(false);
        setShowNetworkModal(true);
        
        // Wait for user to switch network
        const networkSwitched = await new Promise((resolve) => {
          const handleNetworkSwitch = async () => {
            const switched = await switchToBNBChain(provider);
            resolve(switched);
          };
          
          // Auto-attempt to switch
          setTimeout(handleNetworkSwitch, 1000);
        });
        
        if (!networkSwitched) {
          setIsConnecting(false);
          return;
        }
        
        setShowNetworkModal(false);
      }

      // Get balance
      const userBalance = await getBalance(provider, address);
      
      // Format address for display
      const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      
      setWalletAddress(shortAddress);
      setFullWalletAddress(address);
      setBalance(userBalance);
      setConnectedWalletType(walletProvider.name);
      setIsConnected(true);
      setShowWalletModal(false);
      
      // Store wallet connection in localStorage
      const walletData = {
        address: shortAddress,
        fullAddress: address,
        balance: userBalance,
        walletType: walletProvider.name,
        chainId: BNB_CHAIN_CONFIG.chainId
      };
      localStorage.setItem('wallet_connection', JSON.stringify(walletData));
      
      // Listen for account changes
      if (provider.on) {
        provider.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            const newShortAddress = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
            setWalletAddress(newShortAddress);
            setFullWalletAddress(accounts[0]);
            getBalance(provider, accounts[0]).then((newBalance) => {
              setBalance(newBalance);
              // Update localStorage
              const walletData = {
                address: newShortAddress,
                fullAddress: accounts[0],
                balance: newBalance,
                walletType: walletProvider.name,
                chainId: currentChainId
              };
              localStorage.setItem('wallet_connection', JSON.stringify(walletData));
            });
          }
        });

        // Listen for chain changes
        provider.on('chainChanged', (chainId: string) => {
          setCurrentChainId(chainId);
          if (chainId !== BNB_CHAIN_CONFIG.chainId) {
            setShowNetworkModal(true);
          }
        });
      }

    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to connect wallet';
      if (error.code === 4001) {
        errorMessage = 'Connection rejected by user';
      } else if (error.code === -32002) {
        errorMessage = 'Connection request already pending';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
    setIsConnecting(false);
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setFullWalletAddress('');
    setBalance('0.0000');
    setCurrentChainId(null);
    setConnectedWalletType(null);
    setShowWalletDropdown(false);
    localStorage.removeItem('wallet_connection');
  };

  // Copy wallet address
  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullWalletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
      setShowWalletDropdown(false);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  // Change wallet
  const changeWallet = () => {
    setShowWalletDropdown(false);
    setShowWalletModal(true);
  };

  // Handle connect wallet button click
  const handleConnectWallet = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      setShowWalletModal(true);
    }
  };

  const getTabClassName = (href: string) => {
    const isActive = pathname === href || (href === '/markets/curated' && pathname === '/markets');
    return `flex items-center gap-2 py-4 px-6 text-sm font-medium transition-all duration-200 border-b-2 ${
      isActive 
        ? 'border-yellow-500' 
        : 'border-transparent hover:opacity-80'
    }`;
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-3 hover:opacity-80 transition-opacity" href="/">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold text-white">PolyMarket</h1>
                <p className="text-xs text-gray-400 uppercase tracking-wider">PREDICTION MARKETS</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Docs Link */}
              <Link href="/docs" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
                Docs
              </Link>

              {/* Wallet Connection Area */}
              {isConnected ? (
                <div className="flex items-center gap-3">
                  {/* Points Display */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-md border border-gray-700">
                    <MdOutlineStarRate className="text-yellow-500 text-lg" />
                    <span className="text-gray-400 text-sm">Points</span>
                    <span className="text-white text-sm font-medium">{points}</span>
                  </div>
                  
                  {/* BNB Balance */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-700/30 rounded-md">
                    <LuWallet className="text-green-400 text-lg" />
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-bold">{balance} BNB</span>
                    </div>
                  </div>
                  
                  
                  {/* Wallet Address with Dropdown */}
                  <div className="relative wallet-dropdown-container">
                    <button
                      onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-900/20 border border-blue-700/30 rounded-md hover:bg-blue-900/30 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-mono">
                          {copySuccess ? 'Copied!' : walletAddress}
                        </span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showWalletDropdown && (
                      <div className="absolute top-full mt-2 right-0 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
                        <div className="py-2">
                          <button
                            onClick={copyWalletAddress}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy Address
                          </button>
                          <button
                            onClick={changeWallet}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                          >
                            <LuWallet className="w-4 h-4" />
                            Change Wallet
                          </button>
                          <hr className="border-gray-700 my-2" />
                          <button
                            onClick={disconnectWallet}
                            className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors flex items-center gap-2"
                          >
                            <IoExitOutline className="w-4 h-4" />
                            Disconnect
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disconnect Button */}
                  <button 
                    onClick={handleConnectWallet}
                    className="flex items-center justify-center p-2 bg-red-900/20 border border-red-700/30 hover:bg-red-900/40 rounded-md transition-colors"
                    title="Disconnect Wallet"
                  >
                    <IoExitOutline className="text-red-400 text-lg" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleConnectWallet}
                  className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Connect Wallet</h3>
              <button 
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {walletProviders.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet)}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 bg-[#2a2a2a] hover:bg-[#333333] border border-gray-600 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image 
                      src={wallet.icon} 
                      alt={wallet.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded object-contain"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium">{wallet.name}</div>
                    <div className="text-sm text-gray-400">
                      {wallet.isInstalled() ? 'Installed' : 'Not detected'}
                    </div>
                  </div>
                  {isConnecting && (
                    <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              ))}

              {walletProviders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No wallet extensions detected</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Please install one of the following or retry detection:</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        MetaMask
                      </a>
                      <a
                        href="https://trustwallet.com/browser-extension"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Trust Wallet
                      </a>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={detectWallets}
                        className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
                      >
                        Retry detection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <FaExclamationTriangle size={16} />
                <span className="font-medium">BNB Chain Only</span>
              </div>
              <p className="text-yellow-300/80 text-xs mt-1">
                This app only supports BNB Smart Chain network. You'll be prompted to switch networks after connecting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Network Switch Modal */}
      {showNetworkModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="mb-4">
                <FaExclamationTriangle className="text-orange-500 text-4xl mx-auto" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Switch to BNB Chain</h3>
              <p className="text-gray-400 mb-6">
                This app only works on BNB Smart Chain. Please switch your wallet to the BNB network to continue.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={async () => {
                    const wallets = getWalletProviders();
                    if (wallets.length > 0) {
                      const success = await switchToBNBChain(wallets[0].connector);
                      if (success) {
                        setShowNetworkModal(false);
                      }
                    }
                  }}
                  className="w-full px-4 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Switch to BNB Chain
                </button>
                
                <button
                  onClick={() => {
                    setShowNetworkModal(false);
                    disconnectWallet();
                  }}
                  className="w-full px-4 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-left">
                <div className="text-blue-400 font-medium text-sm mb-2">Network Details:</div>
                <div className="text-xs space-y-1 text-gray-300">
                  <div>Chain ID: {BNB_CHAIN_CONFIG.chainId} (56)</div>
                  <div>Name: {BNB_CHAIN_CONFIG.chainName}</div>
                  <div>Currency: {BNB_CHAIN_CONFIG.nativeCurrency.symbol}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-0">
            <Link 
              href="/markets/curated" 
              className={getTabClassName('/markets/curated')}
              style={{
                color: pathname === '/markets/curated' || pathname === '/markets' 
                  ? '#EAB308' 
                  : '#6E6E6E'
              }}
            >
              <IoMdTrendingUp className="text-lg" />
              <span>Curated Markets</span>
            </Link>
            <Link 
              href="/markets/user" 
              className={getTabClassName('/markets/user')}
              style={{
                color: pathname === '/markets/user' 
                  ? '#EAB308' 
                  : '#6E6E6E'
              }}
            >
              <FaRegUser className="text-lg" />
              <span>User Markets</span>
            </Link>
            <Link 
              href="/markets/positions" 
              className={getTabClassName('/markets/positions')}
              style={{
                color: pathname === '/markets/positions' 
                  ? '#EAB308' 
                  : '#6E6E6E'
              }}
            >
              <FiEdit3 className="text-lg" />
              <span>Live Positions</span>
            </Link>
            <Link 
              href="/markets/points" 
              className={getTabClassName('/markets/points')}
              style={{
                color: pathname === '/markets/points' 
                  ? '#EAB308' 
                  : '#6E6E6E'
              }}
            >
              <LuSparkles className="text-lg" />
              <span>Points</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}