// User votes management utility
export interface UserVote {
  marketId: string;
  choice: 'YES' | 'NO';
  timestamp: string;
  walletAddress: string;
  amount?: string; // Optional: amount bet
}

// Get all user votes for a specific wallet
export const getUserVotes = (walletAddress: string): UserVote[] => {
  if (!walletAddress) return [];
  
  try {
    const storedVotes = localStorage.getItem('user_votes');
    if (!storedVotes) return [];
    
    const allVotes: UserVote[] = JSON.parse(storedVotes);
    return allVotes.filter(vote => vote.walletAddress.toLowerCase() === walletAddress.toLowerCase());
  } catch (error) {
    console.error('Error reading user votes from localStorage:', error);
    return [];
  }
};

// Save a new user vote
export const saveUserVote = (marketId: string, choice: 'YES' | 'NO', walletAddress: string, amount: string = '0.5'): boolean => {
  if (!walletAddress || !marketId) return false;
  
  try {
    // Check if user already voted on this market
    const existingVotes = getUserVotes(walletAddress);
    const existingVote = existingVotes.find(vote => vote.marketId === marketId);
    
    if (existingVote) {
      console.warn('User already voted on this market');
      return false; // Don't allow changing votes
    }
    
    // Get all votes from localStorage
    const storedVotes = localStorage.getItem('user_votes');
    const allVotes: UserVote[] = storedVotes ? JSON.parse(storedVotes) : [];
    
    // Create new vote
    const newVote: UserVote = {
      marketId,
      choice,
      timestamp: new Date().toISOString(),
      walletAddress: walletAddress.toLowerCase(),
      amount
    };
    
    // Add to all votes
    allVotes.push(newVote);
    
    // Save back to localStorage
    localStorage.setItem('user_votes', JSON.stringify(allVotes));
    
    return true;
  } catch (error) {
    console.error('Error saving user vote to localStorage:', error);
    return false;
  }
};

// Check if user has voted on a specific market
export const hasUserVoted = (marketId: string, walletAddress: string): boolean => {
  if (!walletAddress) return false;
  
  const userVotes = getUserVotes(walletAddress);
  return userVotes.some(vote => vote.marketId === marketId);
};

// Get user's choice for a specific market
export const getUserChoice = (marketId: string, walletAddress: string): 'YES' | 'NO' | null => {
  if (!walletAddress) return null;
  
  const userVotes = getUserVotes(walletAddress);
  const vote = userVotes.find(vote => vote.marketId === marketId);
  return vote ? vote.choice : null;
};

// Clear all votes for a wallet (useful for testing or wallet disconnect)
export const clearUserVotes = (walletAddress: string): void => {
  if (!walletAddress) return;
  
  try {
    const storedVotes = localStorage.getItem('user_votes');
    if (!storedVotes) return;
    
    const allVotes: UserVote[] = JSON.parse(storedVotes);
    const filteredVotes = allVotes.filter(vote => vote.walletAddress.toLowerCase() !== walletAddress.toLowerCase());
    
    localStorage.setItem('user_votes', JSON.stringify(filteredVotes));
  } catch (error) {
    console.error('Error clearing user votes:', error);
  }
};

// Get vote statistics
export const getUserVoteStats = (walletAddress: string): { totalVotes: number, yesVotes: number, noVotes: number } => {
  const votes = getUserVotes(walletAddress);
  const totalVotes = votes.length;
  const yesVotes = votes.filter(vote => vote.choice === 'YES').length;
  const noVotes = votes.filter(vote => vote.choice === 'NO').length;
  
  return { totalVotes, yesVotes, noVotes };
};