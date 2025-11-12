'use client';

import { useState, useEffect } from 'react';
import { IoMdTrendingUp } from "react-icons/io";
import MarketsNavbar from '../../../components/MarketsNavbar';
import { getTotalMarketCount } from '../../../data/markets';

export default function UserMarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalMarkets, setTotalMarkets] = useState(0);

  // Update time every second and get market count
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get total market count
    setTotalMarkets(getTotalMarketCount());

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

        {/* Coming Soon Section */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Coming Soon</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Users will soon be able to propose and open a market, earning 1% of the trading volume of that market.
            </p>
            
            {/* Info Card */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6 mb-8">
              <div className="text-yellow-400 text-lg font-medium mb-2">
                Keep in touch on social media for updates on user-created markets.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">B</span>
              </div>
              <div>
                <h3 className="text-white font-medium">BNBets</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">PREDICTION MARKETS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
                Docs
              </a>
              <a href="/contract" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contract
              </a>
              <a href="/twitter" className="text-gray-400 hover:text-white text-sm transition-colors">
                Twitter
              </a>
              <a href="/telegram" className="text-gray-400 hover:text-white text-sm transition-colors">
                Telegram
              </a>
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
