import { Market } from './markets';

export interface UserPosition {
  marketId: string;
  market: Market;
  userChoice: 'YES' | 'NO';
  amount: string; // Amount bet in BNB
  potentialWinning: string; // Potential winning amount
  currentValue: string; // Current position value
  status: 'Active' | 'Won' | 'Lost';
  timestamp: string; // When the position was taken
}

// Mock user positions - in real app this would come from backend/blockchain
export const getUserPositions = (walletAddress: string): UserPosition[] => {
  // For demo purposes, return positions for any connected wallet 
  // You can change this condition to test with specific addresses
  if (walletAddress && walletAddress.length > 0) {
    return [
      {
        marketId: "5",
        market: {
          id: "5",
          title: "Will BNB's spot price be above $800 at 18:00 UTC on Friday Nov 15?",
          description: "Will BNB's spot price be strictly above $800.00 at 18:00 UTC on November 15 2025?",
          volume: "1.245 BNB",
          endDate: "2025-11-15T18:00:00+00Z",
          options: [
            { name: "YES", odds: "0.45", percentage: 45, color: 'green' },
            { name: "NO", odds: "0.55", percentage: 55, color: 'red' }
          ],
          category: "CRYPTOCURRENCIES",
          status: 'Waiting',
          participants: 89,
          userVote: 'YES'
        },
        userChoice: 'YES',
        amount: "0.5",
        potentialWinning: "1.11",
        currentValue: "0.45",
        status: 'Active',
        timestamp: "2025-11-10T14:30:00Z"
      },
      {
        marketId: "6", 
        market: {
          id: "6",
          title: "Will BNB's spot price be above $900 at 12:00 UTC on Saturday Nov 16?",
          description: "Will BNB's spot price be strictly above $900.00 at 12:00 UTC on November 16 2025?",
          volume: "0.892 BNB",
          endDate: "2025-11-16T12:00:00+00Z",
          options: [
            { name: "YES", odds: "0.62", percentage: 62, color: 'green' },
            { name: "NO", odds: "0.38", percentage: 38, color: 'red' }
          ],
          category: "CRYPTOCURRENCIES",
          status: 'Waiting',
          participants: 156,
          userVote: 'NO'
        },
        userChoice: 'NO',
        amount: "0.25",
        potentialWinning: "0.66",
        currentValue: "0.38",
        status: 'Active',
        timestamp: "2025-11-11T09:15:00Z"
      }
    ];
  }

  // Return empty array for no wallet (no positions)
  return [];
};

export const hasUserPositions = (walletAddress: string): boolean => {
  return getUserPositions(walletAddress).length > 0;
};