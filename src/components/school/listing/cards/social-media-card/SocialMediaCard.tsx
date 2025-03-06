import { FC } from "react";
import SocialCard from "./SocialCard";
import { mockSocialData } from "./mock";

const SocialMediaCard: FC<{ id: string }> = ({ id }) => {
  return (
    <div
      id={id}
      className="my-cardMargin py-10 flex justify-center items-center"
    >
      <div className="w-[1000px] max-w-full mx-auto">
        <h2 className="text-[#1B1B1B] text-2xl font-semibold mb-6">
          Social Media
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSocialData.map((post, index) => (
            <SocialCard
              key={index}
              thumbnailSrc={post.thumbnailSrc}
              avatarSrc={post.avatarSrc}
              platformIcon={post.platformIcon}
              authorName={post.authorName}
              username={post.username}
              content={post.content}
              platform={post.platform}
              date={post.date}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              likeIcon={post.likeIcon}
              commentIcon={post.commentIcon}
              shareIcon={post.shareIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
