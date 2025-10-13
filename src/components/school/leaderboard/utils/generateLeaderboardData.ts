import { LeaderboardItemData } from '../types';
import { listingImages, schoolNames } from '../mock';

const getRandomSchoolName = () => {
  return schoolNames[Math.floor(Math.random() * schoolNames.length)];
};

const getRandomPoints = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateLeaderboardData = (
  count: number,
  min: number,
  max: number
): LeaderboardItemData[] => {
  return Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    imageUrl: listingImages[i % listingImages.length],
    schoolName: getRandomSchoolName(),
    points: getRandomPoints(min, max),
  }));
};

export const getInitialLeaderboardData = () => ({
  rank: generateLeaderboardData(10, 50, 200),
  followers: generateLeaderboardData(10, 100, 400),
  events: generateLeaderboardData(10, 10, 50),
});

