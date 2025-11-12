import Image from "next/image";
import Link from "next/link";
import { LuCoins } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import { SiHiveBlockchain } from "react-icons/si";




export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity" href="/">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight text-white">PolyMarket</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Prediction Markets</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold tracking-tight text-white">PolyMarket</h1>
              </div>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-6">
              <Link className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-500 transition-colors" href="/docs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 7v14" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
                Platform Documentation
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">How does PolyMarket work?</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The world's first and only community-owned prediction market platform on SOL Chain.
            </p>
          </div>

          {/* Platform Overview */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                <TbWorld className="text-yellow-400 w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8 mb-8">
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                PolyMarket is a decentralized prediction market platform built on SOL Chain, enabling users to 
                create markets, place bets, and earn from their insights. As a community-owned platform, 
                PolyMarket puts power back in the hands of its users.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Decentralized</h3>
                  <p className="text-sm text-gray-400">
                    Fully decentralized and 
                    non-custodial
                  </p>
                </div>
                
                <div className="text-center p-6 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Community-Owned</h3>
                  <p className="text-sm text-gray-400">
                    By the community, for the 
                    community
                  </p>
                </div>
                
                <div className="text-center p-6 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                      <SiHiveBlockchain className="text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">SOL Chain</h3>
                  <p className="text-sm text-gray-400">
                    Fast, cheap, and secure 
                    transactions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                  <LuCoins className="text-yellow-400 w-5 h-5" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Fee Structure</h2>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">3% Total Trading Fee</h3>
                <p className="text-gray-400">All trades on PolyMarket incur a 3% fee, which is distributed as follows:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-500 mb-2">2%</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Stickers Buyback</h4>
                  <p className="text-sm text-gray-400">
                    Sent to buyback address for 
                    stickers buyback and burn to 
                    reduce all time
                  </p>
                </div>
                
                <div className="text-center p-6 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="text-3xl font-bold text-orange-500 mb-2">1%</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Team & Development</h4>
                  <p className="text-sm text-gray-400">
                    Funds platform development 
                    and supports our core 
                    operations
                  </p>
                </div>
                
                <div className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Points</h4>
                  <h5 className="text-sm font-semibold text-blue-400 mb-2">Community Rewards</h5>
                  <p className="text-sm text-gray-400">
                    Additional rewards are 
                    distributed to our most loyal 
                    participants
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Markets */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">User Markets</h2>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Create Your Own Markets</h3>
                <p className="text-gray-400 mb-6">
                  Want to create new data about your prediction markets on any topic? Market creators earn 3% of fees 
                  that require minimal promotional funds for their markets.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shrink-0">
                    <span className="text-black font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Propose Market</h4>
                    <p className="text-gray-400 text-sm">Launch your markets with clear resolution criteria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shrink-0">
                    <span className="text-black font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Community Review</h4>
                    <p className="text-gray-400 text-sm">Community reviews and approves new proposals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-black/30 border border-gray-700 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shrink-0">
                    <span className="text-black font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Launch & Earn</h4>
                    <p className="text-gray-400 text-sm">Start your casino with 3% trading volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Getting Started</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Traders */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">For Traders</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Connect your SOL Chain wallet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Browse markets and view outcomes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Place bets on outcomes you believe in</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Earn from correct predictions</p>
                  </div>
                </div>
              </div>
              
              {/* For Market Creators */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">For Market Creators</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Propose new market topics</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Set clear resolution criteria</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Earn 3% of trading volume</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Build your reputation in the community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-400 mb-8">
              Join our community for support, updates, and discussions.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/telegram" className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300">
                Follow us
              </Link>
              <Link href="/community" className="px-8 py-3 border border-yellow-400/30 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400/10 transition-all duration-300">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <h2 className="text-sm font-bold text-white">PolyMarket</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Prediction Markets</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link className="hover:text-yellow-400 transition-colors" href="/docs">Docs</Link>
              <Link href="/contract" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Contract</Link>
              <Link href="/twitter" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Twitter</Link>
              <Link href="/telegram" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Telegram</Link>
            </div>
            <p className="text-sm text-gray-500">© 2025 PolyMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}