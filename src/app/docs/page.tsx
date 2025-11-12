import Image from "next/image";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity" href="/">
              <Image src="/Logo-CwQcjEIc.svg" alt="PolyMarket Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight text-foreground">PolyMarket</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Prediction Markets</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold tracking-tight text-foreground">PolyMarket</h1>
              </div>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-6">
              <Link className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity" href="/docs">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground">Everything you need to know about PolyMarket prediction markets</p>
          </div>

          {/* Quick Start */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">Connect Wallet</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Connect your SOL Chain compatible wallet to start trading on prediction markets.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">Browse Markets</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Explore curated and user-created prediction markets across various categories.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">Place Bets</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Predict outcomes and place bets using SOL tokens with transparent odds.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">Earn Rewards</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Win rewards for correct predictions and earn points for platform participation.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Decentralized & Non-Custodial</h3>
                <p className="text-muted-foreground leading-relaxed">
                  PolyMarket operates entirely on SOL Chain with smart contracts. Your funds remain in your wallet until you choose to participate in markets.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Transparent Market Resolution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All markets are resolved transparently using verifiable data sources and community consensus mechanisms.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">Create Custom Markets</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Users can create their own prediction markets on any topic, subject to community moderation and validation.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">What is a prediction market?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A prediction market allows users to bet on the outcome of future events. Market prices reflect the collective wisdom of participants about the likelihood of different outcomes.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">How are markets resolved?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Markets are resolved using reliable data sources and oracle services. For subjective markets, we use community governance and dispute resolution mechanisms.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">What fees does PolyMarket charge?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  PolyMarket charges a small platform fee on winning trades. The exact fee structure is transparent and displayed before each trade.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Join our community channels for support and updates
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/telegram" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-300">
                Telegram
              </Link>
              <Link href="/twitter" className="px-6 py-3 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}