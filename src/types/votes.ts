export interface Votes {
  good: number;
  neutral: number;
  bad: number;
}

export type VoteType = 'good' | 'neutral' | 'bad';

// notes: interface Votes describes the shape of vote-count object; VoteType is a union of string literals (which handleVote parameter should only accept)
