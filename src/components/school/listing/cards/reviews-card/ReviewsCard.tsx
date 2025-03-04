import Image from "next/image";
import ReviewsModal from "./ReviewsModal";

export default function Reviews({ id }: { id: string }) {
  return (
    <div id={id} className="flex justify-center min-h-screen my-cardMargin">
      <div className="w-[875px] flex justify-center">
        <div className="w-full bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center tracking-tight">
            School Reviews
          </h2>
          <p className="text-center text-[#5F5F5F] text-base mb-10">
            Read what other users think about{" "}
            <strong className="font-semibold text-[#464646]">
              Lincoln Academy
            </strong>
          </p>

          <div className="bg-[#EBFCF4] rounded-xl p-7 mb-10 flex justify-between items-start border border-[#0B6333] border-opacity-10">
            <div className="flex flex-col items-start">
              <div className="text-[42px] font-extrabold text-gray-800 mb-2 tracking-tight leading-none">
                4.3
              </div>
              <div className="text-[#089E68] mb-2 font-semibold text-lg">
                ★★★★☆
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium mb-4">
                73 Reviews
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-[#346DC2] no-underline text-sm flex items-center gap-1 font-medium hover:text-[#1D77BD] hover:underline transition-colors"
                >
                  Write a review →
                </a>
                <a
                  href="#"
                  className="text-[#346DC2] no-underline text-sm flex items-center gap-1 font-medium hover:text-[#1D77BD] hover:underline transition-colors"
                >
                  See all reviews →
                </a>
              </div>
            </div>

            <div className="flex-1 max-w-[400px] pl-10">
              {[
                { stars: "★★★★★", label: "Excellent", width: "30%", count: 22 },
                { stars: "★★★★☆", label: "Very Good", width: "51%", count: 37 },
                { stars: "★★★☆☆", label: "Average", width: "14%", count: 10 },
                { stars: "★★☆☆☆", label: "Poor", width: "0%", count: 0 },
                { stars: "★☆☆☆☆", label: "Terrible", width: "5%", count: 4 },
              ].map((rating, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <span className="min-w-[80px] text-[#089E68] text-sm">
                    {rating.stars}
                  </span>
                  <span className="min-w-[70px] text-[#464646] text-sm font-medium">
                    {rating.label}
                  </span>
                  <div className="flex-1 h-2 bg-[#E1E7EE] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#00DF8B] rounded"
                      style={{ width: rating.width }}
                    ></div>
                  </div>
                  <span className="min-w-[32px] text-[#5F5F5F] text-sm text-right font-medium">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              {
                avatar:
                  "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
                author: "Shuwang Y.",
                rating: 4.9,
                date: "Jun 22, 2022",
                title: "Learning Python for Data Analysis and Visualization",
                content:
                  "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen.",
                published: "Published 3 weeks ago",
                helpful: 24,
                hasReply: true,
                replyAvatar:
                  "https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg",
                replyAuthor: "Lincoln Academy",
                replyDate: "Replied on Jun 23, 2022",
                replyContent:
                  "Thank you for your detailed feedback! We're glad to hear that you found the course material helpful and comprehensive. Your input helps us continue to improve our programs and provide the best possible learning experience for our students.",
              },
              {
                avatar: "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
                author: "Kiking A.",
                rating: 5.0,
                date: "Jun 22, 2022",
                title: "Learning Python for Data Analysis and Visualization",
                content:
                  "Ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal ansatzweiseurdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt, solltest du aufpassen.",
                published: "Published 3 weeks ago",
                helpful: 24,
                hasReply: false,
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-black border-opacity-5"
              >
                <div className="flex gap-4 mb-4">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1">
                    <div className="text-[#016853] font-semibold mb-1 tracking-wide">
                      {review.author}
                    </div>
                    <div className="flex items-center gap-2 text-[#089E68] text-sm font-medium">
                      <span className="font-bold text-[#00DF8B]">★</span>
                      <span>{review.rating}</span>
                      <span className="text-[#5F5F5F]">{review.date}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-[#464646] mb-2 text-base">
                  {review.title}
                </h3>
                <p className="text-[#5F5F5F] text-sm leading-6 mb-4">
                  {review.content}
                </p>
                <div className="text-gray-400 text-sm mb-4">
                  {review.published}
                </div>
                <div className="flex gap-6">
                  <button className="flex items-center gap-1.5 cursor-pointer transition-all duration-200 py-1.5 px-2.5 rounded-md text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-3.5 h-3.5 stroke-2"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span className="font-medium text-sm">
                      Helpful ({review.helpful})
                    </span>
                  </button>
                  <button className="flex items-center gap-1.5 cursor-pointer transition-all duration-200 py-1.5 px-2.5 rounded-md text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#016853]">
                    <svg viewBox="0 0 512 512" className="w-3.5 h-3.5">
                      <path
                        d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="font-medium text-sm">Report</span>
                  </button>
                </div>

                {review.hasReply && (
                  <div className="mt-4 p-4 bg-[#F8F9FA] rounded-lg border border-[#E1E7EE]">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={review.replyAvatar!}
                        alt={review.replyAuthor!}
                        className="w-8 h-8 rounded-full object-cover"
                        width={32}
                        height={32}
                      />
                      <div className="flex-1">
                        <div className="text-[#016853] font-semibold text-sm mb-1">
                          {review.replyAuthor}
                        </div>
                        <div className="text-[#5F5F5F] text-xs">
                          {review.replyDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-[#5F5F5F] text-sm leading-6">
                      {review.replyContent}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <ReviewsModal />
          </div>
        </div>
      </div>
    </div>
  );
}
