'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
}

const curatedMarkets: Market[] = [
  {
    id: "1",
    title: "Will BNB's spot price be above $1000 at 23:59:59 UTC on Thursday Oct 16?",
    description: "Will BNB's spot price be above $1700 at 23:59:59 UTC on Thursday Oct 16?",
    volume: "1,250 BNB",
    endDate: "Oct 16",
    options: [
      { name: "Yes", odds: "0.01", percentage: 0, color: 'green' },
      { name: "No", odds: "0.99", percentage: 100, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Pending Resolution',
    participants: 342
  },
  {
    id: "2",
    title: "Will BNB's spot price be above $1700 at 16:30 UTC on Wednesday Oct 15?",
    description: "Will BNB's spot price be above $1700 at 16:30 UTC on Wednesday Oct 15?",
    volume: "3,890 BNB",
    endDate: "Oct 15",
    options: [
      { name: "Yes", odds: "0.09", percentage: 9, color: 'green' },
      { name: "No", odds: "0.91", percentage: 91, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Resolved',
    participants: 1247
  },
  {
    id: "3",
    title: "Will BNB's spot price be above $1200 at 16:30 UTC on Wednesday Oct 15?",
    description: "Will BNB's spot price be above $1200 at 16:30 UTC on Wednesday Oct 15?",
    volume: "567 BNB",
    endDate: "Oct 15",
    options: [
      { name: "Yes", odds: "0.34", percentage: 34, color: 'green' },
      { name: "No", odds: "0.66", percentage: 66, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Resolved',
    participants: 189
  },
  {
    id: "4",
    title: "Will BNB's spot price be above $1250 at 09:00 UTC on Wednesday Oct 15?",
    description: "Will BNB's spot price be above $1250 at 09:00 UTC on Wednesday Oct 15?",
    volume: "423 BNB",
    endDate: "Oct 15",
    options: [
      { name: "Yes", odds: "0.35", percentage: 35, color: 'green' },
      { name: "No", odds: "0.65", percentage: 65, color: 'red', winner: true }
    ],
    category: "CRYPTOCURRENCIES",
    status: 'Resolved',
    participants: 98
  }
];

export default function CuratedMarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const MarketCard = ({ market }: { market: Market }) => (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-300">
      {/* Market Title */}
      <div className="mb-3">
        <h3 className="text-white text-sm font-medium leading-tight mb-1">
          {market.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {market.description}
        </p>
      </div>

      {/* Category Tag */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          {market.category}
        </span>
      </div>

      {/* Betting Options */}
      <div className="space-y-2 mb-4">
        {market.options.map((option, index) => (
          <div key={index} className={`p-3 rounded border transition-colors cursor-pointer relative ${
            option.color === 'green' 
              ? 'bg-green-900/20 border-green-800' 
              : 'bg-red-900/20 border-red-800'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">{option.percentage}%</span>
              <span className="text-gray-300 text-sm">{option.odds}</span>
            </div>
            
            {/* Progress Bar Background */}
            <div className="w-full bg-gray-800 rounded-full h-1 mb-1">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  option.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${option.percentage}%` }}
              />
            </div>

            {/* Winner Badge */}
            {option.winner && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded font-medium">
                  ✓ WINNER
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Market Status and Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            market.status === 'Resolved' ? 'bg-green-500' :
            market.status === 'Pending Resolution' ? 'bg-yellow-500' :
            'bg-gray-500'
          }`} />
          <span className="text-gray-400 text-xs">{market.status}</span>
        </div>
        <div className="flex items-center gap-2">
          {market.status === 'Resolved' ? (
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors">
              Claim
            </button>
          ) : (
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors">
              Waiting
            </button>
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
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">📊 4 markets</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 text-sm">Live: 1</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 text-sm">16:35:13 14 OCT UTC+6:00</span>
          </div>
          
          <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {curatedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-8">
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-400 hover:text-white transition-colors">
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 bg-yellow-500 text-black rounded font-medium">
              1
            </button>
            <button className="w-8 h-8 bg-gray-800 text-gray-400 rounded hover:text-white transition-colors">
              2
            </button>
            <button className="w-8 h-8 bg-gray-800 text-gray-400 rounded hover:text-white transition-colors">
              3
            </button>
          </div>
          
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-400 hover:text-white transition-colors">
            Next
          </button>
        </div>
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
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
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