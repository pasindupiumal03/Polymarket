export interface Market {
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

export const curatedMarkets: Market[] = [
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

export const activeMarkets: Market[] = [
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

// Get all markets combined
export const getAllMarkets = (): Market[] => {
  return [...curatedMarkets, ...activeMarkets];
};

// Get total market count
export const getTotalMarketCount = (): number => {
  return getAllMarkets().length;
};

// Get active markets count (status: 'Waiting')
export const getActiveMarketCount = (): number => {
  return getAllMarkets().filter(market => market.status === 'Waiting').length;
};