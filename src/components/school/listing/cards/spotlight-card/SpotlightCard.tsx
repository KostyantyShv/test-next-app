import React, { useEffect, useState } from "react";
import FeaturedProject from "./FeaturedProject";
import Thumbnails from "./Thumbnails";
import CardWrapper from "../../card-wrapper/CardWrapper";

const projects = [
  {
    id: 1,
    title: "Digital Consulting Firm Website",
    description:
      "The website belongs to Inspire Workforce, a consulting firm specializing in digital transformation and workforce development solutions.",
    date: "March 2023",
    coverImage: "https://i.ibb.co/J8QjpbD/school1.webp",
    authorName: "Sarah Anderson",
    authorAvatar: "https://i.ibb.co/ccsFWF1c/AVATAR-midtone-ux-instrgram.jpg",
    tags: ["Business consulting", "Web Design"],
    tagCount: 10,
    cost: "$1000-$2500",
    duration: "7-30 days",
    imageCount: 2,
  },
  {
    id: 2,
    title: "Educational Platform Redesign",
    description:
      "A comprehensive redesign of an educational technology platform focusing on improving user experience and accessibility.",
    date: "April 2023",
    coverImage: "https://i.ibb.co/fVRCnNZY/school2.webp",
    authorName: "Michael Chen",
    authorAvatar: "https://i.ibb.co/HfFsXY8C/AVATAR-playright.png",
    tags: ["Education", "UX Design"],
    tagCount: 8,
    cost: "$2000-$3500",
    duration: "14-45 days",
    imageCount: 3,
  },
  {
    id: 3,
    title: "Corporate Training Portal",
    description:
      "Development of an interactive corporate training portal with integrated learning management system and progress tracking.",
    date: "May 2023",
    coverImage: "https://i.ibb.co/fzzhd5tf/school4.webp",
    authorName: "Emily Rodriguez",
    authorAvatar: "https://i.ibb.co/ksVGZWz8/avatr1.jpg",
    tags: ["Corporate", "E-learning"],
    tagCount: 12,
    cost: "$3000-$5000",
    duration: "21-60 days",
    imageCount: 4,
  },
  {
    id: 4,
    title: "Student Success Dashboard",
    description:
      "An analytics dashboard designed to track and visualize student performance metrics and learning outcomes.",
    date: "June 2023",
    coverImage: "https://i.ibb.co/B5pFBbB2/school5.webp",
    authorName: "David Park",
    authorAvatar: "https://i.ibb.co/ccsFWF1c/AVATAR-midtone-ux-instrgram.jpg",
    tags: ["Analytics", "Education"],
    tagCount: 6,
    cost: "$1500-$3000",
    duration: "10-40 days",
    imageCount: 2,
  },
  {
    id: 5,
    title: "Learning Management System",
    description:
      "A modern learning management system with focus on mobile-first design and seamless content delivery.",
    date: "July 2023",
    coverImage: "https://i.ibb.co/dJDHGnDz/student1.webp",
    authorName: "Lisa Thompson",
    authorAvatar: "https://i.ibb.co/HfFsXY8C/AVATAR-playright.png",
    tags: ["Education", "Mobile"],
    tagCount: 9,
    cost: "$2500-$4500",
    duration: "15-50 days",
    imageCount: 3,
  },
];

const SpotlightCard: React.FC<{ id: string }> = ({ id }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(() => {
    setSelectedProject(projects[0]);
  }, []);

  return (
    <CardWrapper id={id}>
      <h2 className="text-[#1B1B1B] text-2xl md:text-[24px] font-semibold mb-6">
        Spotlight
      </h2>
      <div className="flex flex-col md:gap-6">
        <FeaturedProject project={selectedProject} />
        <Thumbnails projects={projects} onSelectProject={setSelectedProject} />
      </div>
    </CardWrapper>
  );
};

export default SpotlightCard;
