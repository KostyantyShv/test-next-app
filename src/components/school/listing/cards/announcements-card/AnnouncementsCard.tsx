import Image from "next/image";
import CardWrapper from "../../card-wrapper/CardWrapper";

export default function AnnouncementsCard({ id }: { id: string }) {
  return (
    <CardWrapper id={id}>
      <div className="flex items-start  mb-6">
        <Image
          src="https://i.ibb.co/4nYXBCkZ/megaphone.webp"
          alt="Megaphone"
          width={40}
          height={40}
          className="mr-4"
        />
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold text-gray-700">
            Monthly Update
          </h1>
          <p className="text-sm text-gray-500 mt-1">1.6.2025</p>
        </div>
      </div>

      {/* Author Section */}
      <div className="flex items-center relative mb-5">
        <Image
          src="https://i.ibb.co/0yKzNSpq/AVATAR-Kostis-Kapelonis.png"
          alt="Author Avatar"
          width={54}
          height={54}
          className="rounded-full mr-4"
        />
        <div className="flex-grow pt-1">
          <h2 className="text-lg font-semibold text-gray-700">Mufti Hidayat</h2>
          <p className="text-sm text-gray-500 mt-1">
            Project Manager{" "}
            <span className="mx-2 inline-block w-1 h-1 bg-gray-500 rounded-full"></span>{" "}
            Mar 16, 09:00 pm
          </p>
        </div>
        <div className="absolute top-2 right-0 flex gap-4">
          <button className="text-gray-500 hover:text-gray-700 transition">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path
                d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 12.5L3.75 16.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.084 3.33398L16.6673 7.91732"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition">
            <svg fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <p className="text-gray-700 text-[15px] leading-relaxed">
        Take a tour of BASIS Flagstaff - the #1 Flagstaff, AZ Metro Area High
        School per U.S. News & World Report!&nbsp;
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline transition"
        >
          Learn More
        </a>
      </p>
    </CardWrapper>
  );
}
