'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdTrendingUp } from "react-icons/io";
import MarketsNavbar from '../../../components/MarketsNavbar';
import { getTotalMarketCount } from '../../../data/markets';
import { getUserPositions, hasUserPositions, UserPosition } from '../../../data/positions';

export default function LivePositionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
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
          
          // Load user positions
          const positions = getUserPositions(parsedWalletData.fullAddress);
          setUserPositions(positions);
        } catch (error) {
          console.error('Error parsing wallet data:', error);
          localStorage.removeItem('wallet_connection');
          setIsWalletConnected(false);
          setWalletAddress(null);
          setUserPositions([]);
        }
      } else {
        setIsWalletConnected(false);
        setWalletAddress(null);
        setUserPositions([]);
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

  // Format date for position display
  const formatPositionDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

        {/* Conditional Content Based on Wallet Status and Positions */}
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
                Connect your wallet to view your active positions
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
        ) : userPositions.length === 0 ? (
          /* No Positions Section - when wallet connected but no positions */
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md mx-auto">
              {/* Chart Icon */}
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
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" 
                  />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-4">No Positions Found</h1>
              <p className="text-gray-400 mb-8 leading-relaxed">
                You don't have any active positions yet.
              </p>
              
              {/* Browse Markets Button */}
              <button 
                onClick={handleBrowseMarkets}
                className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Browse Markets
              </button>
            </div>
          </div>
        ) : (
          /* User Positions Display */
          <div className="space-y-4">
            {userPositions.map((position) => (
              <div key={`${position.marketId}-${position.timestamp}`} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-lg mb-2">{position.market.title}</h3>
                    <p className="text-gray-400 text-sm">{position.market.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      position.status === 'Active' ? 'bg-yellow-500/20 text-yellow-500' :
                      position.status === 'Won' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {position.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Your Choice</p>
                    <p className={`font-medium ${
                      position.userChoice === 'YES' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.userChoice}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Amount Bet</p>
                    <p className="text-white font-medium">{position.amount} BNB</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Potential Winning</p>
                    <p className="text-green-400 font-medium">{position.potentialWinning} BNB</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Current Value</p>
                    <p className="text-white font-medium">{position.currentValue} BNB</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm">
                        Position taken: {formatPositionDate(position.timestamp)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        Volume: {position.market.volume}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {position.market.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <span className={`text-sm ${
                            option.color === 'green' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {option.name} {option.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                <p className="text-xs text-gray-400">PREDICTION MARKETS</p>
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
