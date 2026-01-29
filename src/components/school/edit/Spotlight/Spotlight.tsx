"use client";

import { useState } from "react";
import SpotlightContainer from "./SpotlightContainer";
import { Spotlight, SpotlightFormData } from "./types";
import SpotlightModal from "./SpotlightModal";

export default function SpotlightSection() {
  const initialSpotlights: Spotlight[] = [
    {
      id: 1,
      author: {
        name: "Dr. Sarah Anderson",
        avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
      },
      projectDate: "March 2023",
      title: "Campus Learning Management System Redesign",
      description:
        "<p>Our team undertook a comprehensive redesign of the university's learning management system to enhance student engagement and improve the overall learning experience. The project focused on creating an intuitive interface that seamlessly integrates various educational tools and resources.</p><p>The redesigned platform features a modern, accessibility-compliant interface that prioritizes user experience while maintaining robust functionality. We implemented advanced analytics capabilities to help instructors track student progress and identify areas where additional support might be needed.</p>",
      stats: [
        { label: "Active Users", value: "25,000+" },
        { label: "Course Completion Rate", value: "94.2%" },
        { label: "Student Satisfaction", value: "4.8/5.0" },
      ],
      images: [
        "https://i.ibb.co/jJ4GHXP/img1.jpg",
        "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      ],
      ctaRows: [
        { text: "Schedule a Demo Session", buttonText: "Book Now" },
        { text: "Download Technical Documentation", buttonText: "Download" },
        { text: "View Implementation Guide", buttonText: "View Guide" },
      ],
      tags: [
        "Education Technology",
        "UX Design",
        "Learning Management",
        "Higher Education",
        "Mobile Learning",
      ],
      contact: {
        logo: "https://i.ibb.co/Z1RrcHzB/dribble.png",
        title: "Contact EduTech Solutions",
        description:
          "Ready to transform your educational institution? Let's discuss how our LMS can meet your specific needs.",
        buttonText: "Send Message",
      },
      sidebar: {
        banner: "https://i.ibb.co/jJ4GHXP/img1.jpg",
        title: "EduTech Solutions",
        description:
          "Leading provider of innovative educational technology solutions, specializing in learning management systems and digital learning environments for higher education.",
        links: [
          { text: "📚 View Course Catalog", url: "#" },
          { text: "🎓 Student Success Stories", url: "#" },
          { text: "📊 Analytics Dashboard", url: "#" },
        ],
        socialButtons: [
          { type: "twitter", url: "#" },
          { type: "facebook", url: "#" },
          { type: "linkedin", url: "#" },
        ],
      },
      pinned: true,
    },
    {
      id: 2,
      author: {
        name: "Prof. James Wilson",
        avatar:
          "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
      },
      projectDate: "November 2022",
      title: "Artificial Intelligence Research Initiative",
      description:
        "<p>The AI Research Initiative is an interdisciplinary project aimed at exploring the applications of artificial intelligence in various academic fields. Our research teams are working on developing innovative AI solutions for real-world problems in healthcare, education, and environmental science.</p><p>The initiative has already produced several breakthrough algorithms that promise to revolutionize how we approach complex challenges in these domains.</p>",
      stats: [
        { label: "Research Papers", value: "17" },
        { label: "Research Teams", value: "5" },
        { label: "Funding Secured", value: "$2.4M" },
      ],
      images: ["https://i.ibb.co/LJwrLdW/coaching-image.webp"],
      ctaRows: [
        { text: "Join Research Team", buttonText: "Apply Now" },
        { text: "Access Research Papers", buttonText: "View Papers" },
      ],
      tags: [
        "Artificial Intelligence",
        "Research",
        "Machine Learning",
        "Computer Science",
        "Data Science",
      ],
      contact: {
        logo: "https://i.ibb.co/Z1RrcHzB/dribble.png",
        title: "Contact Research Office",
        description:
          "Interested in collaborating on AI research? We're always looking for new partners and contributors.",
        buttonText: "Contact Us",
      },
      sidebar: {
        banner: "https://i.ibb.co/LJwrLdW/coaching-image.webp",
        title: "AI Research Hub",
        description:
          "Cutting-edge artificial intelligence research focused on solving real-world problems through innovative approaches and interdisciplinary collaboration.",
        links: [
          { text: "🔬 Research Publications", url: "#" },
          { text: "👥 Meet Our Team", url: "#" },
          { text: "🏆 Awards & Recognition", url: "#" },
        ],
        socialButtons: [
          { type: "twitter", url: "#" },
          { type: "linkedin", url: "#" },
          { type: "youtube", url: "#" },
        ],
      },
      pinned: false,
    },
  ];

  const [spotlights, setSpotlights] = useState<Spotlight[]>(initialSpotlights);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const MAX_SPOTLIGHTS = 10;

  const handleAddSpotlight = () => {
    if (spotlights.length >= MAX_SPOTLIGHTS) {
      alert(
        `Maximum number of spotlights (${MAX_SPOTLIGHTS}) reached. Please delete an existing spotlight first.`
      );
      return;
    }
    setCurrentEditId(null);
    setIsModalOpen(true);
  };

  const handleEditSpotlight = (id: number) => {
    setCurrentEditId(id);
    setIsModalOpen(true);
  };

  const handleDeleteSpotlight = () => {
    if (currentEditId) {
      setSpotlights(spotlights.filter((s) => s.id !== currentEditId));
      setIsModalOpen(false);
      setCurrentEditId(null);
    }
  };

  const handleTogglePin = (id: number) => {
    setSpotlights((prev) =>
      prev.map((s) => ({
        ...s,
        pinned: s.id === id ? !s.pinned : false,
      }))
    );
  };

  const handleSaveSpotlight = (formData: SpotlightFormData) => {
    if (currentEditId) {
      setSpotlights((prev) =>
        prev.map((s) =>
          s.id === currentEditId
            ? { ...formData, id: currentEditId, pinned: s.pinned }
            : s
        )
      );
    } else {
      const newId = Date.now();
      setSpotlights((prev) => [
        ...prev,
        { ...formData, id: newId, pinned: false },
      ]);
    }
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  return (
    <>
      <SpotlightContainer
        spotlights={spotlights}
        onAddSpotlight={handleAddSpotlight}
        onEditSpotlight={handleEditSpotlight}
        onTogglePin={handleTogglePin}
        maxSpotlights={MAX_SPOTLIGHTS}
      />
      <SpotlightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSpotlight}
        onDelete={handleDeleteSpotlight}
        spotlight={
          currentEditId
            ? spotlights.find((s) => s.id === currentEditId)
            : undefined
        }
      />
    </>
  );
}
