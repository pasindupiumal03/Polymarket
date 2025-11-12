'use client';

import { useState } from 'react';
import MarketsNavbar from '../../../components/MarketsNavbar';

export default function UserMarketsPage() {
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
              placeholder="Search user markets..."
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

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No User Markets</h2>
          <p className="text-gray-400 mb-6">User-created markets will appear here once they are available.</p>
          <button className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors">
            Create Market
          </button>
        </div>
      </div>
    </div>
  );
}
