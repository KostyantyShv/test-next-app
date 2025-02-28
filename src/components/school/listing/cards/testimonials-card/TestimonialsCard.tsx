import { useState } from "react";
import Image from "next/image";

export default function TestimonialsCard({ id }: { id: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateDots = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 5) % 5);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);
  };

  return (
    <div
      id={id}
      className="min-h-fit flex flex-col items-center my-cardMargin rounded-cardBorderRadius"
    >
      <div className="max-w-[875px] w-full mx-auto rounded-cardBorderRadius shadow-cardShadow bg-cardBackground p-cardPadding">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-3 text-[#1A1A1A]">
            Decipher Political Realities
          </h1>
          <p className="text-lg font-medium text-[#4A4A4A]">
            Don&apos;t take our word for it. See what some of our students have
            to say.
          </p>
        </div>

        <div className="bg-cardBackground rounded-cardBorderRadius p-cardPadding flex gap-10 shadow-cardShadow md:flex-row flex-col">
          <div className="flex flex-col md:flex-[0_0_57%]">
            <svg
              className="mb-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 33 28"
              height="28"
              width="33"
            >
              <path
                fill="#016853"
                d="M17.883 17.3311C17.883 11.9311 19.1453 7.79346 21.67 4.91816C24.2648 1.97272 27.7362 0.5 32.0842 0.5V5.75971C29.9803 5.75971 28.2972 6.35581 27.0349 7.54801C25.8427 8.67008 25.2466 10.1779 25.2466 12.0714V13.1233C25.2466 13.2636 25.2817 13.3688 25.3518 13.4389C25.5622 13.4389 25.7726 13.4038 25.983 13.3337C26.544 13.1934 26.9998 13.1233 27.3505 13.1233C28.7531 13.1233 29.9803 13.7545 31.0323 15.0168C32.0842 16.2791 32.6102 17.9272 32.6102 19.9609C32.6102 22.0648 31.9089 23.818 30.5063 25.2206C29.1739 26.6232 27.4908 27.3245 25.457 27.3245C23.1427 27.3245 21.2843 26.483 19.8817 24.7999C18.5492 23.1168 17.883 20.6272 17.883 17.3311ZM0 17.3311C0 11.9311 1.26233 7.79346 3.78699 4.91816C6.38178 1.97272 9.85319 0.5 14.2012 0.5V5.75971C12.0973 5.75971 10.4142 6.35581 9.1519 7.54801C7.95969 8.67008 7.36359 10.1779 7.36359 12.0714V13.1233C7.36359 13.2636 7.39866 13.3688 7.46879 13.4389C7.67918 13.4389 7.88956 13.4038 8.09995 13.3337C8.66099 13.1934 9.11683 13.1233 9.46748 13.1233C10.8701 13.1233 12.0973 13.7545 13.1493 15.0168C14.2012 16.2791 14.7272 17.9272 14.7272 19.9609C14.7272 22.0648 14.0259 23.818 12.6233 25.2206C11.2908 26.6232 9.60774 27.3245 7.57398 27.3245C5.25971 27.3245 3.40128 26.483 1.99869 24.7999C0.66623 23.1168 0 20.6272 0 17.3311Z"
              ></path>
            </svg>

            <div className="text-2xl font-semibold leading-relaxed text-[#464646] mb-6 overflow-hidden relative line-clamp-3">
              I love the tracking part, that you can see how recipients engaged
              with certificates. Certifier saves me tons of work&quot;
            </div>

            <div className="flex items-center gap-4 mb-5">
              <Image
                src="https://i.ibb.co/NKp6WsG/AVATAR-Kostis-Kapelonis.png"
                alt="Steve Roberts"
                width={48}
                height={48}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-grow">
                <div className="text-lg font-semibold text-[#464646] mb-1">
                  Steve Roberts
                </div>
                <div className="text-sm font-medium text-[#5F5F5F]">
                  Head of Impact Academy
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    onClick={() => updateDots(index)}
                    className={`w-2 h-2 rounded-full border-2 border-[#0B6333] cursor-pointer transition-all duration-300 ${
                      currentSlide === index ? "bg-[#0B6333] scale-110" : ""
                    }`}
                  ></div>
                ))}
              </div>

              <div className="flex gap-3">
                <div
                  onClick={handlePrev}
                  className="w-8 h-8 border border-[#0B6333] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0B6333] group"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="#0B6333"
                      className="group-hover:stroke-white transition-all duration-300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  onClick={handleNext}
                  className="w-8 h-8 border border-[#0B6333] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0B6333] group"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#0B6333"
                      className="group-hover:stroke-white transition-all duration-300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex-[0_0_43%] relative pr-5 aspect-[4/3]">
            <div className="w-full h-full relative">
              <Image
                src="https://i.ibb.co/vcJmbRn/japan.webp"
                alt="Steve's Video"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute bottom-4 left-2 bg-white py-2 px-3 rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:translate-y-[-2px]">
                <span className="text-[#346DC2] font-semibold text-sm whitespace-nowrap">
                  Watch Steve&apos;s story
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 33 33"
                  height="33"
                  width="33"
                >
                  <circle
                    fill="#0B6333"
                    r="16"
                    cy="16.499"
                    cx="16.8027"
                  ></circle>
                  <path
                    fill="white"
                    d="M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
