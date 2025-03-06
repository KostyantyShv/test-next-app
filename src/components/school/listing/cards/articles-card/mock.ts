import { AVATARS, COVER_IMAGES } from "./images";
import { Article } from "./types";

export const articlesMock: Article[] = [
  {
    title:
      "Having Recently Started at New Companies, These TA Leaders Have Ambitious Goals",
    category: "Business",
    excerpt:
      "Five talent acquisition leaders discuss what caught their eye during their onboarding, and their goals for the next 12 months.",
    author: "Sarah Anderson",
    date: "July 09, 2021",
    likes: 248,
    coverImage: COVER_IMAGES[0],
    avatar: AVATARS[0],
  },
  {
    title: "Before New York Auto Show, Cars Take Their Own Star Turns",
    category: "Business",
    excerpt:
      "Automakers are increasingly unveiling new cars at separate events from the traditional auto shows.",
    author: "Miracle Septimus",
    date: "1 min ago",
    likes: 185,
    coverImage: COVER_IMAGES[1],
    avatar: AVATARS[1],
  },
  // Politics Articles
  {
    title: "U.S. Risks Roiling Oil Markets in Trying to Tighten Sanctions",
    category: "Politics",
    excerpt:
      "The Biden administration faces a difficult choice as it tries to balance competing priorities in the oil market.",
    author: "Zain Dorwart",
    date: "5 min ago",
    likes: 142,
    coverImage: COVER_IMAGES[2],
    avatar: AVATARS[2],
  },
  {
    title: "New Climate Policy Faces Opposition in Congress",
    category: "Politics",
    excerpt:
      "Lawmakers debate the implications of sweeping environmental regulations on economic growth.",
    author: "Elena Martinez",
    date: "2 hours ago",
    likes: 198,
    coverImage: COVER_IMAGES[0],
    avatar: AVATARS[0],
  },
  // Travel Articles
  {
    title: "Duna de Bolonia: The Spanish sand dune hiding ancient Roman ruins",
    category: "Travel",
    excerpt:
      "Near the southern tip of Spain's Cádiz province lies one of the most remarkable archaeological sites.",
    author: "Sophia Williams",
    date: "6 hours ago",
    likes: 219,
    coverImage: COVER_IMAGES[1],
    avatar: AVATARS[1],
  },
  {
    title: "Exploring Hidden Gems of Southeast Asia",
    category: "Travel",
    excerpt:
      "From secret beaches to ancient temples, discover the lesser-known wonders of this vibrant region.",
    author: "Marcus Chen",
    date: "Yesterday",
    likes: 173,
    coverImage: COVER_IMAGES[2],
    avatar: AVATARS[2],
  },
];
