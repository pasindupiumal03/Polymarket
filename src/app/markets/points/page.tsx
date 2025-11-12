'use client';

import { useState } from 'react';
import MarketsNavbar from '../../../components/MarketsNavbar';

export default function PointsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-black">
      <MarketsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search points history..."
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
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Total Points</h3>
            <p className="text-2xl font-bold text-yellow-500">0</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">This Week</h3>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-2">Ranking</h3>
            <p className="text-2xl font-bold text-white">-</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No Points Yet</h2>
          <p className="text-gray-400 mb-6">Start participating in markets to earn points and climb the leaderboard.</p>
          <button className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors">
            Explore Markets
          </button>
        </div>
      </div>
    </div>
  );
}
