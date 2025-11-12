import { Market, getAllMarkets } from './markets';
import { getUserVotes } from '../utils/userVotes';

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

// Get user positions - only from markets where user has given answers (stored in localStorage)
export const getUserPositions = (walletAddress: string): UserPosition[] => {
  if (!walletAddress || walletAddress.length === 0) {
    return [];
  }

  // Get real user votes from localStorage
  const userVotes = getUserVotes(walletAddress);
  if (userVotes.length === 0) {
    return [];
  }

  const allMarkets = getAllMarkets();
  const userPositions: UserPosition[] = [];
  
  // Create positions from actual user votes
  userVotes.forEach(vote => {
    const market = allMarkets.find(m => m.id === vote.marketId);
    if (market) {
      // Calculate position details based on user's choice and market odds
      const chosenOption = market.options.find(opt => opt.name === vote.choice);
      const betAmount = vote.amount || "0.5";
      const odds = parseFloat(chosenOption?.odds || "0.5");
      const potentialWinning = (parseFloat(betAmount) / odds).toFixed(3);
      const currentValue = (parseFloat(betAmount) * odds).toFixed(3);
      
      // Determine status based on market status
      let status: 'Active' | 'Won' | 'Lost' = 'Active';
      if (market.status === 'Resolved') {
        const winningOption = market.options.find(opt => opt.winner === true);
        if (winningOption && winningOption.name === vote.choice) {
          status = 'Won';
        } else if (winningOption) {
          status = 'Lost';
        }
      }
      
      userPositions.push({
        marketId: vote.marketId,
        market: {
          ...market,
          userVote: vote.choice
        },
        userChoice: vote.choice,
        amount: betAmount,
        potentialWinning: potentialWinning,
        currentValue: currentValue,
        status: status,
        timestamp: vote.timestamp
      });
    }
  });

  return userPositions;
};

export const hasUserPositions = (walletAddress: string): boolean => {
  return getUserPositions(walletAddress).length > 0;
};