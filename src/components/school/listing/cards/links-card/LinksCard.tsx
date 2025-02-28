// BioLink.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface StatDotProps {
  value: string;
  type: "clicks" | "upvotes" | "ctr";
  tooltip: string;
}

const StatDot: React.FC<StatDotProps> = ({ value, type, tooltip }) => {
  return (
    <div className={`relative flex items-center gap-1.5 cursor-help group`}>
      <span
        className={`w-2 h-2 rounded-full ${
          type === "clicks"
            ? "bg-[#02C5AF]"
            : type === "upvotes"
            ? "bg-[#346DC2]"
            : "bg-[#FF6B6B]"
        }`}
      ></span>
      {value}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#333] text-white py-1.5 px-3 rounded-md text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 pointer-events-none transition-all duration-200 mb-2">
        {tooltip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-5 border-r-5 border-t-5 border-l-transparent border-r-transparent border-t-[#333]"></span>
      </div>
    </div>
  );
};

interface LinkItemProps {
  icon: string;
  iconBg: string;
  title: string;
  clicks: string;
  upvotes: string;
  ctr: string;
  href: string;
  alt: string;
}

const LinkItem: React.FC<LinkItemProps> = ({
  icon,
  iconBg,
  title,
  clicks,
  upvotes,
  ctr,
  href,
  alt,
}) => {
  return (
    <Link
      href={href}
      className="flex items-center p-4 px-5 bg-[#F8FCFF] rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${iconBg}`}
      >
        <Image
          src={icon}
          alt={alt}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-base font-semibold text-[#262B3D]">{title}</span>
        <div className="flex items-center gap-4 text-[#5F5F5F] text-sm">
          <StatDot value={clicks} type="clicks" tooltip={`${clicks} Clicks`} />
          <StatDot
            value={upvotes}
            type="upvotes"
            tooltip={`${upvotes} Upvotes`}
          />
          <StatDot value={ctr} type="ctr" tooltip={`${ctr} CTR`} />
        </div>
      </div>
      <div className="text-[#5F5F5F] ml-4 group">
        <svg
          className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M13.5371 8.26367C13.5371 8.44727 13.4688 8.60742 13.332 8.74414L9.46484 12.5996C9.32812 12.7324 9.17383 12.7988 9.00195 12.7988C8.82227 12.7988 8.67188 12.7402 8.55078 12.623C8.43359 12.5059 8.375 12.3594 8.375 12.1836C8.375 12.0938 8.39062 12.0098 8.42188 11.9316C8.45703 11.8535 8.50391 11.7852 8.5625 11.7266L9.875 10.4023L12.0605 8.41016L12.2656 8.78516L10.2324 8.90234H3.11328C2.91797 8.90234 2.75977 8.84375 2.63867 8.72656C2.52148 8.60547 2.46289 8.45117 2.46289 8.26367C2.46289 8.07227 2.52148 7.91797 2.63867 7.80078C2.75977 7.67969 2.91797 7.61914 3.11328 7.61914H10.2324L12.2656 7.74219L12.0605 8.12305L9.875 6.125L8.5625 4.79492C8.50391 4.73633 8.45703 4.66992 8.42188 4.5957C8.39062 4.51758 8.375 4.43164 8.375 4.33789C8.375 4.16211 8.43359 4.01562 8.55078 3.89844C8.67188 3.78125 8.82227 3.72266 9.00195 3.72266C9.08789 3.72266 9.16992 3.74023 9.24805 3.77539C9.32617 3.81055 9.40039 3.86328 9.4707 3.93359L13.332 7.7832C13.4688 7.91992 13.5371 8.08008 13.5371 8.26367Z"
          ></path>
        </svg>
      </div>
    </Link>
  );
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-lg font-semibold text-[#016853]">{value}</div>
      <div className="text-sm text-[#5F5F5F]">{label}</div>
    </div>
  );
};

const LinksCard = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="flex justify-center my-cardPadding rounded-cardBorderRadius shadow-cardShadow"
    >
      <div className="w-[875px] bg-cardBackground overflow-hidden rounded-cardBorderRadius">
        <div className="relative h-[200px] bg-[url('https://i.ibb.co/ds23z4nL/banner-background.png')] bg-center bg-cover overflow-visible">
          <div className="absolute -bottom-[60px] left-10 w-[120px] h-[120px] rounded-full border-[6px] border-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] bg-white overflow-hidden z-[2]">
            <Image
              src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
              alt="Profile"
              width={120}
              height={120}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="pt-20 pb-10 px-10">
          <div className="flex gap-8 mb-10">
            <StatItem value="128" label="Clicks" />
            <StatItem value="166" label="Upvotes" />
            <StatItem value="64.67%" label="Avg. CTR" />
          </div>

          <div className="grid gap-4 m-0 auto">
            <LinkItem
              icon="https://i.ibb.co/Qvxq27v5/favicon1.png"
              iconBg="bg-[#EA4C89]"
              title="My Dribbble"
              clicks="155"
              upvotes="32"
              ctr="32.4%"
              href="#"
              alt="Dribbble"
            />

            <LinkItem
              icon="https://i.ibb.co/hRQP0ccJ/favicon2.png"
              iconBg="bg-[#02C5AF]"
              title="Freebies UI Kit"
              clicks="128"
              upvotes="45"
              ctr="38.2%"
              href="#"
              alt="Freebies"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksCard;
