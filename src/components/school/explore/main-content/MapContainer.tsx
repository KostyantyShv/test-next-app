import React from "react";

interface MapContainerProps {
  isMapActive: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ isMapActive }) => {
  return (
    <div
      className={`min-h-[600px] bg-white rounded-xl overflow-hidden transition-all duration-300 ${
        isMapActive ? "w-[400px] ml-6 border border-[rgba(0,0,0,0.1)]" : "w-0"
      }`}
    >
      <div className="h-full relative">
        <div id="map" className="w-full h-full bg-[#f5f5f7]"></div>
        <button className="absolute top-2.5 left-2.5 bg-white border-none rounded w-8 h-8 flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <svg
            className="text-[#333121]"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              fill="currentColor"
              d="M16.7161 20.704C16.3259 21.0948 15.6927 21.0953 15.3019 20.705L7.2934 12.7076C7.10562 12.5201 7.00008 12.2656 7.00002 12.0002C6.99996 11.7349 7.10539 11.4803 7.29308 11.2927L15.2943 3.2953C15.6849 2.90487 16.3181 2.90502 16.7085 3.29564C17.0989 3.68625 17.0988 4.31942 16.7082 4.70985L9.41489 11.9997L16.7151 19.2898C17.1059 19.6801 17.1064 20.3132 16.7161 20.704Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button className="absolute top-2.5 right-2.5 bg-white border-none rounded h-8 px-3 flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M11.9897 18.9994L5.02891 13.5876C4.6678 13.3068 4.16223 13.3069 3.80118 13.5877L3.76488 13.6159C3.25014 14.0163 3.25014 14.7943 3.76488 15.1946L11.3861 21.1222C11.7472 21.4031 12.2528 21.4031 12.6139 21.1222L20.236 15.1939C20.7505 14.7938 20.7508 14.0163 20.2367 13.6158L20.1888 13.5784C19.8277 13.2971 19.3216 13.2969 18.9602 13.5779L11.9897 18.9994ZM11.3858 15.9114C11.747 16.1922 12.2528 16.192 12.6139 15.911L19.5644 10.4997L20.2312 9.98337C20.7475 9.58356 20.7483 8.80426 20.2329 8.40337L12.6139 2.47751C12.2528 2.19665 11.7472 2.19665 11.3861 2.47751L3.76399 8.40578C3.24952 8.80593 3.24919 9.58339 3.76332 9.98397L4.42528 10.4997L11.3858 15.9114ZM12 4.60028L17.8994 9.19444L12 13.7886L6.10056 9.19444L12 4.60028Z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="text-sm font-semibold ml-1 text-[#464646]">Map</span>
        </button>
        <div className="absolute right-2.5 top-[50px] flex flex-col gap-2">
          <button className="w-8 h-8 bg-white border-none rounded flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="w-8 h-8 bg-white border-none rounded flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <button className="absolute bottom-2.5 right-2.5 w-6 h-6 flex items-center justify-center text-[#0093B0] opacity-80 hover:opacity-100">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
            <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
          </svg>
        </button>
        <button className="absolute top-2.5 left-2.5 bg-white border-none rounded w-8 h-8 flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] hidden">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M7.2839 20.704C7.6741 21.0948 8.3073 21.0953 8.6981 20.705L16.7066 12.7076C16.8944 12.5201 16.9999 12.2656 17 12.0002C17.0001 11.7349 16.8946 11.4803 16.7069 11.2927L8.7057 3.2953C8.3151 2.90487 7.6819 2.90502 7.2915 3.29564C6.9011 3.68625 6.9012 4.31942 7.2918 4.70985L14.5851 11.9997L7.2849 19.2898C6.8941 19.6801 6.8936 20.3132 7.2839 20.704Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapContainer;
