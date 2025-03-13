import React from "react";
import SchoolCard from "./SchoolCard";

interface SchoolsGridProps {
  schools: Array<{
    imageSrc: string;
    alt: string;
    name: string;
    location: string;
    reviews: number;
  }>;
  className?: string;
}

const SchoolsGrid: React.FC<SchoolsGridProps> = ({
  schools,
  className = "",
}) => {
  return (
    <div
      className={`md:grid md:grid-cols-2 gap-6 mb-6 ${className} flex flex-col`}
    >
      {schools.map((school, index) => (
        <SchoolCard
          key={index}
          imageSrc={school.imageSrc}
          alt={school.alt}
          name={school.name}
          location={school.location}
          reviews={school.reviews}
        />
      ))}
    </div>
  );
};

export default SchoolsGrid;
