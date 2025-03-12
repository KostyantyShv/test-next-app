import Image from "next/image";

export function VideoSection() {
  return (
    <div className="md:flex-[0_0_43%] relative aspect-[16/9] md:aspect-[4/3] pr-0 md:pr-5">
      <div className="w-full h-full relative">
        <Image
          src="https://i.ibb.co/vcJmbRn/japan.webp"
          alt="Steve's Video"
          fill
          className="rounded-xl object-cover"
        />
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-2 bg-white py-1.5 px-2.5 md:py-2 md:px-3 rounded-lg flex items-center gap-1.5 md:gap-2 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-0.5">
          <span className="text-[#346DC2] font-semibold text-xs md:text-sm whitespace-nowrap">
            Watch Steve`s story
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 33 33"
            height={28}
            width={28}
            className="w-7 h-7 md:w-[33px] md:h-[33px]"
          >
            <circle fill="#0B6333" r="14" cy="16.5" cx="16.5" />
            <path
              fill="white"
              d="M23.433 15.4168L13.9332 9.93204C13.0998 9.45088 12.058 10.0523 12.058 11.0146V21.9841C12.058 22.9464 13.0998 23.5479 13.9332 23.0667L23.433 17.582C24.2664 17.1008 24.2664 15.8979 23.433 15.4168Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
