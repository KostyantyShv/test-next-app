// components/SocialCard.tsx
import Image from "next/image";
import { FC, ReactNode } from "react";

interface SocialCardProps {
  thumbnailSrc: string;
  avatarSrc: string;
  platformIcon: ReactNode;
  authorName: string;
  username: string;
  content: string;
  platform: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  likeIcon: ReactNode;
  commentIcon: ReactNode;
  shareIcon: ReactNode;
}

const SocialCard: FC<SocialCardProps> = ({
  thumbnailSrc,
  avatarSrc,
  platformIcon,
  authorName,
  username,
  content,
  platform,
  date,
  likes,
  comments,
  shares,
  likeIcon,
  commentIcon,
  shareIcon,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-[5px] transition-all duration-300">
      <div className="relative w-full h-[200px] rounded-t-xl overflow-hidden">
        <Image
          src={thumbnailSrc}
          alt={`${platform} post image`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="relative p-4 pt-8 z-0">
        <div className="absolute top-[-26px] left-4 w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[220]">
          <Image
            src={avatarSrc}
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-[-20px] right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-[#4A4A4A] z-[202]">
          {platformIcon}
        </div>
        <div className="text-[#464646] text-base font-semibold mb-2">
          {authorName}
        </div>
        <div className="text-[#5F5F5F] text-sm mb-4">{username}</div>
        <p className="text-[#4A4A4A] text-[15px] leading-6 mb-4 line-clamp-3">
          {content}
        </p>
        <div className="mt-4 flex flex-col">
          <div className="text-[#346DC2] text-[15px] font-semibold mb-1">
            {platform}
          </div>
          <div className="text-[#5F5F5F] text-sm mb-2">{date}</div>
          <a
            href="#"
            className="text-[#346DC2] text-sm hover:text-[#016853] hover:underline transition-colors duration-300"
          >
            Full post here
          </a>
        </div>
      </div>
      <div className="flex justify-between items-center p-3 border-t border-[#f0f0f0]">
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-[#5F5F5F] text-sm">
            {likeIcon}
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1 text-[#5F5F5F] text-sm">
            {commentIcon}
            <span>{comments}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#5F5F5F] text-sm">
          {shareIcon}
          <span>{shares}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
