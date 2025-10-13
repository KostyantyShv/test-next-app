export interface LeaderboardItemData {
  rank: number;
  imageUrl: string;
  schoolName: string;
  points: number;
}

export interface MetricCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  tooltip: string;
}

export interface LeaderboardCardProps {
  title: string;
  items: LeaderboardItemData[];
  type: 'rank' | 'followers' | 'events';
}

export interface CommunityStatData {
  label: string;
  value: string;
}

export type LeaderboardData = {
  rank: LeaderboardItemData[];
  followers: LeaderboardItemData[];
  events: LeaderboardItemData[];
};

export interface TopPerformerData {
  position: 'first' | 'second' | 'third';
  title: string;
  schoolName: string;
  imageUrl: string;
  achievementText: string;
  totalAmount: string;
  totalLabel: string;
  color: string;
}

export interface PodiumCardProps {
  performer: TopPerformerData;
}

