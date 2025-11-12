import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity" href="/">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight text-foreground">PolyMarket</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-gray-400">Prediction Markets</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold tracking-tight text-foreground">PolyMarket</h1>
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
      <main className="pt-16 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-16">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%/0.6)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_50%,transparent_110%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(0_0%_30%/0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,hsl(0_0%_30%/0.1)_0%,transparent_50%)]" />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center animate-fade-in">
            <div className="mb-8 inline-block">
              <span className="px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold tracking-wide uppercase">Beta now live</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 text-foreground">
              Trade the Future.
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Own the Outcome.</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              The world&apos;s first decentralized prediction market platform powered by BNB Chain. Create markets, place bets, and earn from your insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-hero text-primary-foreground text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-glow text-base sm:text-lg text-center" href="/markets">
                View Markets
              </Link>
              <Link className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-900! text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400! transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2" href="/docs">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                How Does it Work
              </Link>
            </div>
            
            {/* Analytics Section */}
            <div className="mb-8 sm:mb-12">
              <p className="text-sm text-green-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Platform Analytics
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
                <div className="bg-black/70 border border-gray-700 rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 group-hover:text-yellow-500 transition-colors text-white">1.70 BNB</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Total Volume</div>
                </div>
                
                <div className="bg-black/70 border border-gray-700 rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 group-hover:text-yellow-500 transition-colors text-white">6</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Active Markets</div>
                </div>
                
                <div className="bg-black/70 border border-gray-700 rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 group-hover:text-yellow-500 transition-colors text-white">16</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Online Traders</div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-8 sm:mt-12">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
                <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-card border border-border rounded-lg hover:border-yellow-600! transition-all duration-300 group">
                  <span className="text-primary text-yellow-500 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-secondary-foreground">Non-Custodial</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-card border border-border rounded-lg hover:border-yellow-600! transition-all duration-300 group">
                  <span className="text-primary text-yellow-500 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-secondary-foreground">Fully Decentralized</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-card border border-border rounded-lg hover:border-yellow-600! transition-all duration-300 group">
                  <span className="group-hover:scale-110 transition-transform">
                    <Image src="/BNB_logo-t74kHAI.svg" alt="BNB Chain" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-secondary-foreground">BNB Chain Powered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-card border border-border rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group animate-fade-in">
                <div className="mb-4 text-primary text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors text-white text-card-foreground">Instant Settlements</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-gray-400">Automated payouts when markets resolve</p>
              </div>
              
              <div className="bg-gradient-card border border-border rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group animate-fade-in">
                <div className="mb-4 text-primary text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors text-white text-card-foreground">Create Your Markets</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-gray-400">Launch prediction markets on any topic</p>
              </div>
              
              <div className="bg-gradient-card border border-border rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group animate-fade-in">
                <div className="mb-4 text-primary text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors text-white text-card-foreground">Community Driven</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-gray-400">Built by traders, for traders</p>
              </div>
              
              <div className="bg-gradient-card border border-border rounded-xl p-6 hover:border-yellow-600! transition-all duration-300 group animate-fade-in">
                <div className="mb-4 text-primary text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                    <path d="M7 6h1v4" />
                    <path d="m16.71 13.88.7.71-2.82 2.82" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors text-white text-card-foreground">BNB Chain Powered</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-gray-400">Fast transactions, minimal fees</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <h2 className="text-sm font-bold text-foreground">PolyMarket</h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-gray-400">Prediction Markets</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground text-gray-400">
              <Link className="hover:text-yellow-500" href="/docs">Docs</Link>
              <Link href="/contract" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">Contract</Link>
              <Link href="/twitter" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">Twitter</Link>
              <Link href="/telegram" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">Telegram</Link>
            </div>
            <p className="text-sm text-muted-foreground text-gray-400">© 2025 PolyMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
