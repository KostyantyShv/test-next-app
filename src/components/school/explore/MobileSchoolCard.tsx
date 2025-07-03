import React from "react";
import Image from "next/image";

interface MobileSchoolCardProps {
  school: {
    name: string;
    schoolType: string;
    location: string;
    duration?: string;
    ratio?: string;
    totalSchools?: string;
    rating: string;
    image: string;
    ranking?: string;
    grade: string;
    students?: string;
    sat?: string;
    price?: string;
    acceptance?: string;
    medianSalary?: string;
    grades?: string;
    specialty?: "hot" | "instant-book" | "sponsored";
    specialtyLabel?: string;
    reviews?: number;
    reviewerType?: string;
    description?: string;
  };
  establishment: string;
}

const MobileSchoolCard: React.FC<MobileSchoolCardProps> = ({ school, establishment }) => {
  // Specialty Label Component
  const SpecialtyLabel = () => {
    if (!school.specialty) return null;
    
    const getSpecialtyStyles = () => {
      switch (school.specialty) {
        case "hot":
          return "text-red-500";
        case "instant-book":
          return "text-blue-600";
        case "sponsored":
          return "text-orange-500";
        default:
          return "text-gray-500";
      }
    };

    const getSpecialtyIcon = () => {
      switch (school.specialty) {
        case "hot":
          return (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 mr-1 text-red-500">
              <path d="M8 1.5v4.5m0 4.5v4.5M4.5 8h4.5m4.5 0h-4.5"></path>
            </svg>
          );
        case "instant-book":
          return (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 mr-1 text-blue-600">
              <path d="M2 4h12M2 8h12M2 12h8"></path>
            </svg>
          );
        case "sponsored":
          return (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 mr-1 text-orange-500">
              <path d="M8 1.5v4.5m0 4.5v4.5M4.5 8h4.5m4.5 0h-4.5"></path>
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div className="absolute top-2 left-0 h-7 bg-white rounded-r-full flex items-center px-2.5 text-gray-700 text-xs font-medium shadow-sm z-10">
        {getSpecialtyIcon()}
        {school.specialtyLabel || "Special"}
      </div>
    );
  };

  // Get second stat based on establishment type
  const getSecondStat = () => {
    switch (establishment) {
      case "K-12":
        return school.ratio;
      case "Colleges":
        return school.duration;
      case "Graduates":
        return school.duration;
      case "District":
        return school.totalSchools;
      default:
        return school.duration;
    }
  };

  // Get footer stat based on establishment type
  const getFooterStat = () => {
    switch (establishment) {
      case "K-12":
      case "Graduates":
      case "District":
        return `Students: ${school.students}`;
      case "Colleges":
        return `SAT: ${school.sat}`;
      default:
        return `Students: ${school.students}`;
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <div className="relative w-full h-36 overflow-hidden">
        {/* Options Button */}
        <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer text-gray-600 shadow-sm z-10">
          <svg fill="none" viewBox="0 0 20 20" width="14" height="14">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 6V10"></path>
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 13.1094H10.0067"></path>
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"></path>
          </svg>
        </div>
        
        {/* Specialty Label */}
        <SpecialtyLabel />
        
        {/* School Image */}
        <Image 
          src={school.image} 
          alt={school.name} 
          width={400}
          height={144}
          className="w-full h-full object-cover"
        />
        
        {/* School Type Label */}
        <div className="absolute bottom-0 left-2.5 bg-white px-2 py-1 text-xs font-semibold text-gray-700 uppercase tracking-wide rounded-t shadow-sm">
          {school.schoolType}
        </div>
      </div>

      <div className="p-3">
        {/* Ranking Text */}
        {school.ranking && (
          <div className="text-green-600 text-sm font-medium mb-1">
            {school.ranking}
          </div>
        )}
        
        {/* School Name */}
        <h3 className="text-base font-semibold text-gray-700 line-clamp-2 mb-2">
          {school.name}
        </h3>
        
        {/* School Stats */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"></path>
            </svg>
            <span>{school.location}</span>
          </div>
          
          {/* Second Stat */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
            </svg>
            <span>{getSecondStat()}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-500">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.382-1.831-4.401Z" clipRule="evenodd"></path>
            </svg>
            <span><strong>{school.rating.split(' ')[0]}</strong> {school.rating.split(' ')[1]}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-2.5 border-t border-gray-200 bg-gray-50 -mx-3 -mb-3 rounded-b-xl">
          {/* Grade Circle */}
          <div className="w-7 h-7 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {school.grade}
          </div>
          
          {/* Footer Stat */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
            </svg>
            <span>{getFooterStat()}</span>
          </div>
          
          {/* Info Button */}
          <div className="w-4.5 h-4.5 text-gray-500 cursor-pointer">
            <svg fill="none" viewBox="0 0 20 20" width="18" height="18">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 6V10"></path>
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 13.1094H10.0067"></path>
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSchoolCard; 