import Image from "next/image";

export default function DataSource() {
  return (
    <div className="text-right text-[#5F5F5F] text-xs mt-4 md:mt-5 pt-2.5 md:pt-3 border-t border-[#DFDDDB] flex justify-center md:justify-end items-center gap-1">
      <span>Data provided by 16,970 SchoolScouts users</span>
      <Image
        height={12}
        width={12}
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235F5F5F'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/%3E%3C/svg%3E"
        alt="info"
        className="w-3 h-3 md:w-3.5 md:h-3.5"
      />
    </div>
  );
}
