import React, { useEffect, useState } from "react";
import {
  CollectionsSchool,
  ConfirmModal,
  NoteModal,
  schools,
} from "../components/Card/Card";
import MapContainer from "../../explore/main-content/MapContainer";
import { School } from "../../explore/types";
import { CardList } from "../components/Card/card-layouts/CardList";
import { CardGrid } from "../components/Card/card-layouts/CardGrid";
import { CardHybrid } from "../components/Card/card-layouts/CardHybrid";
import { CardTable } from "../components/Card/card-layouts/CardTable";
import { CardCard } from "../components/Card/card-layouts/CardCard";
import { CardClassic } from "../components/Card/card-layouts/CardClassic";

interface ContentAreaProps {
  isMapActive: boolean;
  layout: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ isMapActive, layout }) => {
  const [schoolData, setSchoolData] = useState<CollectionsSchool[]>(schools);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Keep behavior identical to Explore: if the map panel is closed, ensure we exit expanded mode.
  useEffect(() => {
    if (!isMapActive) setIsMapExpanded(false);
  }, [isMapActive]);

  const handleRatingChange = (index: number, rating: number) => {
    setSchoolData((prev) => {
      const newData = [...prev];
      newData[index].myRating = rating;
      return newData;
    });
  };

  const handleStatusChange = (index: number, status: string) => {
    setSchoolData((prev) => {
      const newData = [...prev];
      newData[index].status = status;
      return newData;
    });
  };

  const handleCreateNote = (index: number) => {
    setCurrentSchoolId(index);
    setIsEditing(false);
    setNoteText("");
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (index: number, noteId: number) => {
    const note = schoolData[index].notes.find((note) => note.id === noteId);
    if (note) {
      setCurrentSchoolId(index);
      setCurrentNoteId(noteId);
      setIsEditing(true);
      setNoteText(note.content);
      setIsNoteModalOpen(true);
    }
  };

  const handleDeleteNote = (index: number, noteId: number) => {
    setCurrentSchoolId(index);
    setCurrentNoteId(noteId);
    setIsConfirmModalOpen(true);
  };

  const handleSaveNote = (text: string) => {
    if (text.trim() !== "" && currentSchoolId !== null) {
      setSchoolData((prev) => {
        const newData = [...prev];
        if (isEditing && currentNoteId !== null) {
          const noteIndex = newData[currentSchoolId].notes.findIndex(
            (note) => note.id === currentNoteId
          );
          if (noteIndex !== -1) {
            newData[currentSchoolId].notes[noteIndex] = {
              ...newData[currentSchoolId].notes[noteIndex],
              content: text.trim(),
              timestamp: "Just now",
            };
          }
        } else {
          const newId =
            newData[currentSchoolId].notes.length > 0
              ? Math.max(
                  ...newData[currentSchoolId].notes.map((note) => note.id)
                ) + 1
              : 1;
          newData[currentSchoolId].notes.push({
            id: newId,
            author: "You",
            content: text.trim(),
            timestamp: "Just now",
            time: "0:00",
          });
        }
        return newData;
      });
      closeNoteModal();
    }
  };

  const handleConfirmDelete = () => {
    if (currentSchoolId !== null && currentNoteId !== null) {
      setSchoolData((prev) => {
        const newData = [...prev];
        newData[currentSchoolId].notes = newData[currentSchoolId].notes.filter(
          (note) => note.id !== currentNoteId
        );
        return newData;
      });
      closeConfirmModal();
    }
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setNoteText("");
    setCurrentSchoolId(null);
    setCurrentNoteId(null);
    setIsEditing(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setCurrentSchoolId(null);
    setCurrentNoteId(null);
  };

  const cardCounts = {
    grid: 6,
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  // Match Explore behavior: grid columns change when map is open (and "card" behaves like grid for sizing).
  const effectiveLayoutForMap = layout === "card" ? "grid" : layout;

  const getExploreLikeGridCols = (variant: "grid" | "hybrid" | "classic") => {
    if (variant === "grid") {
      // Keep cards readable on narrower viewports (avoid overlap).
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (variant === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2 max-[900px]:grid-cols-1";
    }
    // classic
    return isMapActive
      ? "grid-cols-2 max-[900px]:grid-cols-1"
      : "grid-cols-4 max-[1200px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-1";
  };

  // Keep map prop shape identical to Explore map component (even though we render collections cards).
  const mapSchools: School[] = schoolData.map((school) => ({
    name: school.name,
    schoolType: school.schoolType,
    location: school.location,
    ratio: "",
    rating: school.rating,
    image: school.image,
    avatar: school.avatar,
    ranking: school.ranking || "",
    grade: school.grade,
    students: school.students,
    price: "",
    grades: school.grades,
    specialty: school.specialty as "hot" | "instant-book" | "sponsored" | undefined,
    specialtyLabel: school.specialty,
    description: school.description,
    reviews: school.reviews,
  }));

  return (
    <div className="flex flex-col md:flex-row items-start min-h-[400px] min-w-0">
      <div
        className={`flex-1 min-w-0 p-6 transition-all duration-300 ${
          isMapExpanded ? "hidden" : ""
        }`}
        aria-hidden={isMapExpanded}
      >
        <div
          className={`grid gap-6 min-w-0 ${
            layout === "card" ? getExploreLikeGridCols("grid") : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.grid)
            .map((school: CollectionsSchool, i: number) => (
              <CardGrid
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`flex flex-col gap-4 min-w-0 ${
            layout === "list" ? "block" : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.list)
            .map((school: CollectionsSchool, i: number) => (
              <CardList
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-6 min-w-0 ${
            layout === "hybrid" ? getExploreLikeGridCols("hybrid") : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.hybrid)
            .map((school: CollectionsSchool, i: number) => (
              <CardHybrid
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-6 min-w-0 ${
            layout === "table" ? "grid-cols-1" : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardTable
                key={i}
                school={school}
                index={i}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-6 min-w-0 ${
            layout === "classic" ? getExploreLikeGridCols("classic") : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardClassic
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-6 min-w-0 ${
            layout === "grid" ? getExploreLikeGridCols("grid") : "hidden"
          }`}
        >
          {schoolData
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardCard
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
      </div>
      {/* Use the same MapContainer behavior as Explore (expand/collapse, sizing by layout, reset on close). */}
      <MapContainer
        isMapActive={isMapActive}
        layout={effectiveLayoutForMap}
        onExpandedChange={setIsMapExpanded}
        schools={mapSchools}
      />
      <NoteModal
        isOpen={isNoteModalOpen}
        title={isEditing ? "Edit Note" : "Create Note"}
        noteText={noteText}
        onClose={closeNoteModal}
        onSave={handleSaveNote}
        onChange={setNoteText}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ContentArea;
