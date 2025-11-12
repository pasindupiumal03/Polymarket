'use client';

import { useState } from 'react';
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

export default function MarketsNavbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance] = useState('0.0000');
  const [points] = useState(0);
  
  const pathname = usePathname();

  const handleConnectWallet = async () => {
    if (isConnected) {
      // Disconnect wallet
      setIsConnected(false);
      setWalletAddress('');
    } else {
      // Simulate connecting to Phantom wallet
      try {
        // In a real app, this would connect to Phantom wallet
        // For now, we'll simulate with a mock address
        const mockAddress = '0x54ae...bdc3';
        setWalletAddress(mockAddress);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
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
              <Image src="/Logo-CwQcjEIc.svg" alt="BNBets Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold text-white">BNBets</h1>
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
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-md">
                    <MdOutlineStarRate className="text-yellow-500 text-lg" />
                    <span className="text-gray-400 text-sm">Points</span>
                    <span className="text-white text-sm font-medium">{points}</span>
                  </div>
                  
                  {/* BNB Balance */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-md">
                    <LuWallet className="text-yellow-500 text-lg" />
                    <span className="text-white text-sm font-medium">{balance} BNB</span>
                  </div>
                  
                  {/* Wallet Address */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 rounded-md text-green-400 text-sm">
                    {walletAddress}
                  </div>
                  
                  {/* Disconnect Button */}
                  <button 
                    onClick={handleConnectWallet}
                    className="flex items-center justify-center p-2 bg-gray-900 hover:bg-gray-800 rounded-md transition-colors"
                    title="Disconnect Wallet"
                  >
                    <IoExitOutline className="text-red-500 text-lg" />
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