'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import MarketsNavbar from "../../components/MarketsNavbar";

interface Market {
  id: string;
  title: string;
  description: string;
  volume: string;
  endDate: string;
  options: Array<{
    name: string;
    odds: string;
    percentage: number;
    color: 'green' | 'red';
    winner?: boolean;
  }>;
  category: string;
  status: 'Pending Resolution' | 'Waiting' | 'Resolved';
  participants: number;
  userVote?: 'YES' | 'NO' | null;
}

const curatedMarkets: Market[] = [
  {
    id: "1",
    title: "Will BNB's spot price be above $1200 at 23:59:59 UTC on Thursday Oct 16?",
    description: "Will BNB's spot price be above $1500 at 23:59:59 UTC on Thursday Oct 16?",
    volume: "0.940 BNB",
    endDate: "2025-10-16T23:59:59+00Z",
    options: [
      { name: "YES", odds: "0.01", percentage: 0, color: 'green' },
      { name: "NO", odds: "0.99", percentage: 100, color: 'red' }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Pending Resolution',
    participants: 342
  },
  {
    id: "2", 
    title: "Will BNB's spot price be above $1200 at 16:30 UTC on Wednesday Oct 15?",
    description: "Will BNB's spot price be above $1700 at 16:30 UTC on Wednesday Oct 15?",
    volume: "0.021 BNB",
    endDate: "2025-10-15T16:30:00+00Z",
    options: [
      { name: "YES", odds: "0.09", percentage: 9, color: 'green' },
      { name: "NO", odds: "0.91", percentage: 91, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Resolved',
    participants: 1247
  },
  {
    id: "3",
    title: "Will BNB's spot price be above $1200 at 16:30 UTC on Wednesday Oct 15?",
    description: "Will BNB's spot price be strictly above $1200.00 at 16:30 UTC on October 15 2024? Price based on median across Binance - OKX - Bybit and KuCoin",
    volume: "0.264 BNB",
    endDate: "2025-10-15T16:30:00+00Z",
    options: [
      { name: "YES", odds: "0.34", percentage: 34, color: 'green' },
      { name: "NO", odds: "0.66", percentage: 66, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Resolved',
    participants: 189
  },
  {
    id: "4",
    title: "Will BNB's spot price be above $1250 at 09:00 UTC on Wednesday Oct 15?", 
    description: "Will BNB's spot price be strictly above $1250.00 at 09:00 UTC on October 15 2024? Price based on median across Binance - OKX - Bybit and KuCoin",
    volume: "0.276 BNB",
    endDate: "2025-10-15T09:00:00+00Z", 
    options: [
      { name: "YES", odds: "0.35", percentage: 35, color: 'green' },
      { name: "NO", odds: "0.65", percentage: 65, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES", 
    status: 'Resolved',
    participants: 98
  }
];

// New active markets for page 2
const activeMarkets: Market[] = [
  {
    id: "5",
    title: "Will BNB's spot price be above $800 at 18:00 UTC on Friday Nov 15?",
    description: "Will BNB's spot price be strictly above $800.00 at 18:00 UTC on November 15 2025? Price based on median across Binance - OKX - Bybit and KuCoin",
    volume: "1.245 BNB",
    endDate: "2025-11-15T18:00:00+00Z",
    options: [
      { name: "YES", odds: "0.45", percentage: 45, color: 'green' },
      { name: "NO", odds: "0.55", percentage: 55, color: 'red' }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Waiting',
    participants: 89
  },
  {
    id: "6",
    title: "Will BNB's spot price be above $900 at 12:00 UTC on Saturday Nov 16?",
    description: "Will BNB's spot price be strictly above $900.00 at 12:00 UTC on November 16 2025? Price based on median across major exchanges",
    volume: "0.892 BNB",
    endDate: "2025-11-16T12:00:00+00Z",
    options: [
      { name: "YES", odds: "0.62", percentage: 62, color: 'green' },
      { name: "NO", odds: "0.38", percentage: 38, color: 'red' }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Waiting',
    participants: 156
  },
  {
    id: "7",
    title: "Will BNB's spot price be above $750 at 20:30 UTC on Sunday Nov 17?",
    description: "Will BNB's spot price be strictly above $750.00 at 20:30 UTC on November 17 2025? Price based on median across Binance - OKX - Bybit and KuCoin",
    volume: "2.156 BNB",
    endDate: "2025-11-17T20:30:00+00Z",
    options: [
      { name: "YES", odds: "0.78", percentage: 78, color: 'green' },
      { name: "NO", odds: "0.22", percentage: 22, color: 'red' }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Waiting',
    participants: 234
  },
  {
    id: "8",
    title: "Will BNB's spot price be above $850 at 14:00 UTC on Monday Nov 18?",
    description: "Will BNB's spot price be strictly above $850.00 at 14:00 UTC on November 18 2025? Price based on median across Binance - OKX - Bybit and KuCoin",
    volume: "3.421 BNB",
    endDate: "2025-11-18T14:00:00+00Z",
    options: [
      { name: "YES", odds: "0.52", percentage: 52, color: 'green' },
      { name: "NO", odds: "0.48", percentage: 48, color: 'red' }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Waiting',
    participants: 312
  }
];

export default function CuratedMarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [markets, setMarkets] = useState<Market[]>([]);
  const marketsPerPage = 4;

  // Combine all markets and sort: open markets first, then by date
  const allMarkets = [...curatedMarkets, ...activeMarkets];
  
  // Initialize markets with user votes
  useEffect(() => {
    const marketsWithVotes = allMarkets.map(market => ({
      ...market,
      userVote: null as 'YES' | 'NO' | null
    }));
    setMarkets(marketsWithVotes);
  }, []);

  // Filter markets based on search query
  const filteredMarkets = markets.filter(market => 
    market.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered markets: open markets first, then by date (newest first)
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    // First priority: open markets (Waiting status)
    if (a.status === 'Waiting' && b.status !== 'Waiting') return -1;
    if (a.status !== 'Waiting' && b.status === 'Waiting') return 1;
    
    // Second priority: sort by date (newest first)
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  const totalPages = Math.ceil(sortedMarkets.length / marketsPerPage);
  
  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  // Get current page markets
  const startIndex = (currentPage - 1) * marketsPerPage;
  const currentMarkets = sortedMarkets.slice(startIndex, startIndex + marketsPerPage);

  // Handle voting
  const handleVote = (marketId: string, vote: 'YES' | 'NO') => {
    setMarkets(prevMarkets => 
      prevMarkets.map(market => {
        if (market.id === marketId) {
          const updatedMarket = { ...market };
          
          // Remove previous vote if any
          if (market.userVote) {
            const prevVoteIndex = market.options.findIndex(opt => opt.name === market.userVote);
            if (prevVoteIndex !== -1) {
              updatedMarket.options[prevVoteIndex].percentage = Math.max(0, 
                updatedMarket.options[prevVoteIndex].percentage - 1
              );
            }
          }
          
          // Add new vote
          const voteIndex = market.options.findIndex(opt => opt.name === vote);
          if (voteIndex !== -1) {
            updatedMarket.options[voteIndex].percentage += 1;
          }
          
          // Update odds based on new percentages
          const yesPercentage = updatedMarket.options[0].percentage;
          const noPercentage = updatedMarket.options[1].percentage;
          const total = yesPercentage + noPercentage;
          
          if (total > 0) {
            updatedMarket.options[0].percentage = Math.round((yesPercentage / total) * 100);
            updatedMarket.options[1].percentage = Math.round((noPercentage / total) * 100);
            updatedMarket.options[0].odds = (updatedMarket.options[0].percentage / 100).toFixed(2);
            updatedMarket.options[1].odds = (updatedMarket.options[1].percentage / 100).toFixed(2);
          }
          
          updatedMarket.userVote = vote;
          updatedMarket.participants += market.userVote ? 0 : 1; // Only increment if first vote
          
          return updatedMarket;
        }
        return market;
      })
    );
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS GMT+5:30 (IST)
  const formatTime = (date: Date) => {
    const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // GMT+5:30
    const hours = istTime.getUTCHours().toString().padStart(2, '0');
    const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = istTime.getUTCSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds} GMT+5:30`;
  };

  const MarketCard = ({ market }: { market: Market }) => (
    <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all duration-300">
      {/* Market Title */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-medium leading-tight mb-2">
          {market.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed">
          {market.description}
        </p>
      </div>

      {/* Category and Volume */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs rounded">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            {market.category}
          </span>
          <span className="text-gray-500 text-xs">Vol. {market.volume}</span>
        </div>
        <span className="text-gray-400 text-xs">{market.endDate}</span>
      </div>

      {/* Betting Options */}
      <div className="space-y-2 mb-4">
        {market.options.map((option, index) => {
          const isUserVote = market.userVote === option.name;
          return (
            <div key={index} className={`relative p-3 rounded border transition-all duration-300 ${
              option.color === 'green' 
                ? `bg-green-900/10 border-green-800/30 hover:border-green-700 ${isUserVote ? 'ring-2 ring-green-500' : ''}` 
                : `bg-red-900/10 border-red-800/30 hover:border-red-700 ${isUserVote ? 'ring-2 ring-red-500' : ''}`
            }`}>
              {/* Progress Bar Background */}
              <div 
                className={`absolute inset-0 rounded transition-all duration-500 ${
                  option.color === 'green' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
                style={{ 
                  width: `${option.percentage}%`,
                  opacity: 0.3
                }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    isUserVote ? 'text-white' : 'text-gray-200'
                  }`}>{option.name}</span>
                  <span className={`text-sm ${
                    isUserVote ? 'text-white' : 'text-gray-300'
                  }`}>{option.percentage}%</span>
                </div>
                <span className={`text-lg font-semibold ${
                  isUserVote ? 'text-white' : 'text-gray-300'
                }`}>{option.odds}</span>
              </div>
              
              {/* User Vote Indicator */}
              {isUserVote && (
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-white text-xs rounded font-medium ${
                    option.color === 'green' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    ✓ YOUR VOTE
                  </span>
                </div>
              )}
              
              {/* Winner Badge */}
              {option.winner && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs rounded font-medium">
                    ✓ WINNER
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Market Status */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            market.status === 'Resolved' ? 'bg-green-500' :
            market.status === 'Pending Resolution' ? 'bg-orange-500' :
            'bg-blue-500'
          }`} />
          <span className="text-gray-400 text-xs">{market.status}</span>
        </div>
        <div className="flex items-center gap-2">
          {market.status === 'Resolved' ? (
            <button className="px-4 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors font-medium">
              $ Claim
            </button>
          ) : market.status === 'Waiting' ? (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleVote(market.id, 'YES')}
                className={`px-3 py-1 border rounded text-xs font-medium transition-all duration-200 ${
                  market.userVote === 'YES' 
                    ? 'bg-green-600 border-green-500 text-white shadow-lg' 
                    : 'bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-600/30'
                }`}
              >
                YES
              </button>
              <button 
                onClick={() => handleVote(market.id, 'NO')}
                className={`px-3 py-1 border rounded text-xs font-medium transition-all duration-200 ${
                  market.userVote === 'NO' 
                    ? 'bg-red-600 border-red-500 text-white shadow-lg' 
                    : 'bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30'
                }`}
              >
                NO
              </button>
            </div>
          ) : (
            <span className="px-4 py-1 bg-blue-500 text-white rounded text-xs font-medium">
              ⏱ Waiting
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Markets Navbar */}
      <MarketsNavbar />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              {sortedMarkets.length} markets
              {searchQuery && (
                <span className="text-gray-400 text-xs ml-2">
                  ({markets.length - sortedMarkets.length} filtered out)
                </span>
              )}
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

        {/* Markets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {currentMarkets.length > 0 ? (
            currentMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-400 mb-2">No markets found</h3>
              <p className="text-gray-500 max-w-md">
                {searchQuery 
                  ? `No markets match "${searchQuery}". Try different keywords or clear the search.`
                  : "No markets available at the moment."
                }
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedMarkets.length > 0 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded font-medium transition-colors ${
                    currentPage === index + 1
                      ? 'bg-yellow-500 text-black'
                      : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/Logo-CwQcjEIc.svg" alt="BNBets" width={24} height={24} className="w-6 h-6" />
              <div>
                <h3 className="text-white font-medium">BNBets</h3>
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
            <p className="text-gray-400 text-sm">© 2025 BNBets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}