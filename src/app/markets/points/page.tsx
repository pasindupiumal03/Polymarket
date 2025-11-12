'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdTrendingUp } from "react-icons/io";
import MarketsNavbar from '../../../components/MarketsNavbar';
import { getTotalMarketCount } from '../../../data/markets';

export default function PointsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  // Update time every second and get market count
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get total market count
    setTotalMarkets(getTotalMarketCount());

    return () => clearInterval(timer);
  }, []);

  // Check wallet connection status
  useEffect(() => {
    const checkWalletConnection = () => {
      const storedWalletData = localStorage.getItem('wallet_connection');
      if (storedWalletData) {
        try {
          const parsedWalletData = JSON.parse(storedWalletData);
          setWalletAddress(parsedWalletData.fullAddress);
          setIsWalletConnected(true);
        } catch (error) {
          console.error('Error parsing wallet data:', error);
          localStorage.removeItem('wallet_connection');
          setIsWalletConnected(false);
          setWalletAddress(null);
        }
      } else {
        setIsWalletConnected(false);
        setWalletAddress(null);
      }
    };

    checkWalletConnection();

    // Listen for storage changes to update wallet status in real-time
    const handleStorageChange = () => {
      checkWalletConnection();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case wallet status changes within the same tab
    const interval = setInterval(checkWalletConnection, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Format time as HH:MM:SS GMT+5:30 (IST)
  const formatTime = (date: Date) => {
    const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // GMT+5:30
    const hours = istTime.getUTCHours().toString().padStart(2, '0');
    const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = istTime.getUTCSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds} GMT+5:30`;
  };

  // Handle wallet connection - trigger wallet modal from navbar
  const handleConnectWallet = () => {
    // Trigger wallet connection modal from MarketsNavbar
    const connectEvent = new CustomEvent('openWalletModal');
    window.dispatchEvent(connectEvent);
    
    // Fallback: Try to click the connect button in navbar
    setTimeout(() => {
      const connectButton = document.querySelector('[data-connect-wallet]') as HTMLButtonElement;
      if (connectButton) {
        connectButton.click();
      }
    }, 100);
  };

  // Navigate to browse markets
  const handleBrowseMarkets = () => {
    router.push('/markets');
  };

  return (
    <div className="min-h-screen bg-black">
      <MarketsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-sm flex items-center gap-1">
              <IoMdTrendingUp className="text-yellow-400 text-lg" />
              {totalMarkets} markets
            </span>
            <span className="text-gray-600">• </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-sm">
              <span className="text-white flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Live
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 font-mono">
                {formatTime(currentTime)}
              </span>
            </span>
          </div>
          
          <button className="p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Conditional Content Based on Wallet Status */}
        {!isWalletConnected ? (
          /* Connect Wallet Section - when no wallet connected */
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md mx-auto">
              {/* Wallet Icon */}
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                  />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Connect your wallet to view your points and rewards
              </p>
              
              {/* Connect Wallet Button */}
              <button 
                onClick={handleConnectWallet}
                className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          /* Points Page Content - when wallet connected */
          <div className="space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Points Card */}
              <div className="bg-linear-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-orange-400">0</p>
                  <p className="text-xs text-gray-500 mt-2">Start betting to earn points!</p>
                </div>
              </div>

              {/* Total Lost Card */}
              <div className="bg-linear-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Lost</p>
                  <p className="text-3xl font-bold text-white">0.0000 <span className="text-lg text-gray-400">BNB</span></p>
                  <p className="text-xs text-gray-500 mt-2">Connected to 0 previous points! 🎉</p>
                </div>
              </div>

              {/* Your Rank Card */}
              <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-600 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Your Rank</p>
                  <p className="text-3xl font-bold text-white">Rookie</p>
                  <p className="text-xs text-gray-500 mt-2">0 losing bets tracked</p>
                </div>
              </div>
            </div>

            {/* How Points Work Section */}
            <div className="bg-linear-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">How Points Work</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Points are earned <span className="text-yellow-400 font-medium">ONLY</span> from losing bets on resolved markets</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Every BNB you lose is automatically converted into points</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">The more you lose, the higher your rank and the more legendary you become! 👑</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Points will be used for future rewards, airdrops and exclusive benefits</span>
                </div>
              </div>
            </div>

            {/* No Points Yet Section */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12">
              <div className="text-center max-w-md mx-auto">
                {/* Target Icon */}
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-16 h-16 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
                    />
                  </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-4">No Points Yet!</h1>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Start betting on markets to accumulate points.
                </p>
                <p className="text-gray-500 mb-8 text-sm">
                  Remember: losing bets = more points! 💔
                </p>
                
                {/* Browse Markets Button */}
                <button 
                  onClick={handleBrowseMarkets}
                  className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  👉 Browse Markets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket" width={24} height={24} className="w-6 h-6" />
              <div>
                <h3 className="text-white font-medium">PolyMarket</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">PREDICTION MARKETS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
                Docs
              </Link>
              <Link href="/contract" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contract
              </Link>
              <Link href="/twitter" className="text-gray-400 hover:text-white text-sm transition-colors">
                Twitter
              </Link>
              <Link href="/telegram" className="text-gray-400 hover:text-white text-sm transition-colors">
                Telegram
              </Link>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">© 2025 PolyMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
