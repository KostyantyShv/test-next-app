import { TeamMember } from "../types";

// Mock data based on codepen example
// These will be merged with real data from database
export const mockTeamMembers: TeamMember[] = [
  {
    id: 1001,
    firstName: "William",
    lastName: "Kulp",
    email: "william@example.com",
    avatar: "https://i.ibb.co/Df7nqk1/AVATAR-laurentfa.png",
    status: "accepted",
    lastActive: "October 30, 2024",
    isAdmin: true,
    listings: [],
  },
  {
    id: 1002,
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah@example.com",
    avatar: "https://i.ibb.co/WHB164X/AVATAR-midtone-ux-instrgram.jpg",
    status: "pending",
    lastActive: "October 29, 2024",
    isAdmin: false,
    listings: [
      {
        id: 1,
        name: "Harvard University",
        image: "https://i.ibb.co/fGKH7fDq/product2.png",
      },
    ],
  },
  {
    id: 1003,
    firstName: "Michael",
    lastName: "Park",
    email: "michael@example.com",
    avatar: "https://i.ibb.co/JHttgv9/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    status: "rejected",
    lastActive: "October 28, 2024",
    isAdmin: false,
    listings: [
      {
        id: 1,
        name: "Harvard University",
        image: "https://i.ibb.co/fGKH7fDq/product2.png",
      },
      {
        id: 2,
        name: "Stanford University",
        image: "https://i.ibb.co/fGKH7fDq/product2.png",
      },
      {
        id: 3,
        name: "Massachusetts Institute of Technology",
        image: "https://i.ibb.co/63Y8x85/product3.jpg",
      },
    ],
  },
];

// Generate additional mock members for pagination demonstration (up to 120 total)
const additionalAvatars = [
  "https://i.ibb.co/GFhHTqZ/c2.jpg",
  "https://i.ibb.co/Y24j8fH/AVATAR-Hannah-Seligson.png",
  "https://i.ibb.co/NKp6WsG/AVATAR-Kostis-Kapelonis.png",
  "https://i.ibb.co/Df7nqk1/AVATAR-laurentfa.png",
  "https://i.ibb.co/WHB164X/AVATAR-midtone-ux-instrgram.jpg",
  "https://i.ibb.co/JHttgv9/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
];

const listingNames = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology",
];

const listingImages = [
  "https://i.ibb.co/fGKH7fDq/product2.png",
  "https://i.ibb.co/fGKH7fDq/product2.png",
  "https://i.ibb.co/63Y8x85/product3.jpg",
];

// Generate additional members
for (let i = 4; i <= 120; i++) {
  const statuses: TeamMember["status"][] = ["accepted", "pending", "rejected"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const day = 30 - Math.floor(Math.random() * 10);
  const isAdmin = Math.random() > 0.9;

  const listingCount = Math.floor(Math.random() * 4);
  const listings: TeamMember["listings"] = [];
  for (let j = 0; j < listingCount; j++) {
    const listingIndex = j % 3;
    listings.push({
      id: listingIndex + 1,
      name: listingNames[listingIndex],
      image: listingImages[listingIndex],
    });
  }

  mockTeamMembers.push({
    id: 1000 + i,
    firstName: `User${i}`,
    lastName: `Last${i}`,
    email: `user${i}@example.com`,
    avatar: additionalAvatars[i % additionalAvatars.length],
    status,
    lastActive: `October ${day}, 2024`,
    isAdmin,
    listings,
  });
}

