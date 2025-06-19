import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

interface ProfileHeaderProps {
    name: string;
    avatar: string;
    rating: string;
    reviews: number;
    followers: number;
    following: number;
    isFollowing?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    avatar,
    rating,
    reviews,
    followers,
    following,
    isFollowing = false,
}) => {
    return (
        <div className={`${inter.className} bg-white`}>
            <div className="max-w-[1200px] mx-auto px-4 py-6">
                {/* Mobile Profile Header */}
                <div className="md:hidden">
                    <div className="flex flex-col items-center text-center mb-6">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-[120px] h-[120px] rounded-xl object-cover mb-4"
                        />
                        <h1 className="text-2xl font-semibold text-[#464646] mb-2">{name}</h1>
                        <div className="flex flex-col gap-1 text-[#6F767E] text-sm mb-4">
                            <div className="flex items-center justify-center gap-1">
                                <strong className="text-[#464646]">{rating}</strong>
                                <span>•</span>
                                <span>{reviews} reviews</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full bg-[#F8F9FA] p-3 rounded-xl mb-4">
                            <div className="flex flex-col items-center">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Rating</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{rating}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Followers</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{followers}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Following</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{following}</span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <button className="w-full bg-[#016853] text-white rounded-lg py-3 font-medium hover:bg-[#015745] transition-colors">
                                {isFollowing ? "Following" : "Follow"}
                            </button>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-[#EBFCF4] text-[#016853] rounded-lg py-3 font-medium hover:bg-[#E0F9ED] transition-colors">
                                    Contact
                                </button>
                                <button className="w-11 h-11 bg-[#F5F5F7] text-[#4A4A4A] rounded-lg flex items-center justify-center hover:bg-[#E8E8EA] transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99999C10.8334 9.53975 10.4603 9.16666 10 9.16666C9.53978 9.16666 9.16669 9.53975 9.16669 9.99999C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.8334 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 9.99999C16.6667 9.53975 16.2936 9.16666 15.8334 9.16666C15.3731 9.16666 15 9.53975 15 9.99999C15 10.4602 15.3731 10.8333 15.8334 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.16665 10.8333C4.62688 10.8333 4.99998 10.4602 4.99998 9.99999C4.99998 9.53975 4.62688 9.16666 4.16665 9.16666C3.70641 9.16666 3.33331 9.53975 3.33331 9.99999C3.33331 10.4602 3.70641 10.8333 4.16665 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Profile Header */}
                <div className="hidden md:flex items-center gap-8">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-[160px] h-[160px] rounded-xl object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-[#464646] mb-2">{name}</h1>
                                <div className="flex items-center gap-2 text-[#6F767E]">
                                    <strong className="text-[#464646]">{rating}</strong>
                                    <span>•</span>
                                    <span>{reviews} reviews</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-[#016853] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#015745] transition-colors">
                                    {isFollowing ? "Following" : "Follow"}
                                </button>
                                <button className="bg-[#EBFCF4] text-[#016853] rounded-lg px-6 py-3 font-medium hover:bg-[#E0F9ED] transition-colors">
                                    Contact
                                </button>
                                <button className="w-11 h-11 bg-[#F5F5F7] text-[#4A4A4A] rounded-lg flex items-center justify-center hover:bg-[#E8E8EA] transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99999C10.8334 9.53975 10.4603 9.16666 10 9.16666C9.53978 9.16666 9.16669 9.53975 9.16669 9.99999C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.8334 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 9.99999C16.6667 9.53975 16.2936 9.16666 15.8334 9.16666C15.3731 9.16666 15 9.53975 15 9.99999C15 10.4602 15.3731 10.8333 15.8334 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.16665 10.8333C4.62688 10.8333 4.99998 10.4602 4.99998 9.99999C4.99998 9.53975 4.62688 9.16666 4.16665 9.16666C3.70641 9.16666 3.33331 9.53975 3.33331 9.99999C3.33331 10.4602 3.70641 10.8333 4.16665 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-8 bg-[#F8F9FA] p-4 rounded-xl">
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Rating</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{rating}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Followers</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{followers}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-[#6F767E] uppercase tracking-wider">Following</span>
                                <span className="text-xl font-semibold text-[#1B1B1B]">{following}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
